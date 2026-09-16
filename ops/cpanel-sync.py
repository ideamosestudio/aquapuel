#!/usr/bin/env python3
"""Run from the Aquapuel account cron; keep cPanel's deployment interface."""
import fcntl
import hashlib
import json
import logging
from logging.handlers import RotatingFileHandler
import os
from pathlib import Path
import subprocess
import tarfile
import tempfile
import time

HOME = Path('/home5/aquapuel')
REPO = HOME / 'repositories/aquapuel'
PUBLIC = HOME / 'public_html'
STATE = HOME / '.aquapuel-deploy'
GIT = '/usr/local/cpanel/3rdparty/bin/git'
UAPI = '/usr/local/cpanel/bin/uapi'


def run(args):
    return subprocess.check_output(args, cwd=str(REPO), stderr=subprocess.STDOUT,
                                   timeout=90).decode().strip()


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def backup():
    directory = STATE / 'backups'
    directory.mkdir(mode=0o700, exist_ok=True)
    target = directory / ('site-' + time.strftime('%Y%m%d-%H%M%S') + '.tar.gz')
    with tarfile.open(str(target), 'w:gz') as archive:
        archive.add(str(PUBLIC), arcname='public_html', recursive=True)
    # Restore representative HTML and executable PHP to a private temp directory.
    with tempfile.TemporaryDirectory(dir=str(STATE)) as temporary:
        with tarfile.open(str(target), 'r:gz') as archive:
            for relative in ('index.html', 'api/contact.php', '.htaccess'):
                data = archive.extractfile('public_html/' + relative).read()
                restored = Path(temporary) / Path(relative).name
                restored.write_bytes(data)
                if digest(restored) != digest(PUBLIC / relative):
                    raise RuntimeError('Backup restoration verification failed')
    for old in sorted(directory.glob('site-*.tar.gz'))[:-3]:
        if old.is_file() and not old.is_symlink() and old.parent == directory:
            old.unlink()
    return target.name


def matches(files):
    return all((PUBLIC / p).is_file() and not (PUBLIC / p).is_symlink()
               and digest(REPO / 'site' / p) == digest(PUBLIC / p) for p in files)


def main():
    os.umask(0o077)
    STATE.mkdir(mode=0o700, exist_ok=True)
    with (STATE / 'lock').open('a') as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            return
        logger = logging.getLogger('deploy')
        logger.setLevel(logging.INFO)
        handler = RotatingFileHandler(str(STATE / 'deploy.log'), maxBytes=1048576, backupCount=2)
        handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s %(message)s'))
        logger.addHandler(handler)
        try:
            if PUBLIC.resolve() != PUBLIC or REPO.resolve() != REPO:
                raise RuntimeError('Unexpected hosting paths')
            if run([GIT, 'branch', '--show-current']) != 'cpanel-deploy':
                raise RuntimeError('Unexpected checked-out branch')
            if run([GIT, 'status', '--porcelain']):
                raise RuntimeError('Repository has local changes; refusing overwrite')
            run([GIT, 'fetch', 'origin', 'cpanel-deploy'])
            run([GIT, 'merge', '--ff-only', 'origin/cpanel-deploy'])
            revision = run([GIT, 'rev-parse', 'HEAD'])
            marker = STATE / 'published'
            if marker.exists() and marker.read_text().strip() == revision:
                return
            source = REPO / 'site'
            for required in ('index.html', '.htaccess', 'api/contact.php'):
                if not (source / required).is_file():
                    raise RuntimeError('Incomplete export')
            if any(p.is_symlink() for p in source.rglob('*')):
                raise RuntimeError('Export contains symlinks')
            files = [p.relative_to(source) for p in source.rglob('*') if p.is_file()]
            logger.info('Backup verified: %s', backup())
            result = json.loads(run([UAPI, '--output=json', 'VersionControlDeployment',
                                     'create', 'repository_root=' + str(REPO)]))
            if result.get('result', {}).get('status') != 1:
                raise RuntimeError('cPanel rejected deployment')
            for attempt in range(30):
                time.sleep(2)
                if matches(files):
                    marker.write_text(revision + '\n')
                    logger.info('Published and verified %s (%d files)', revision, len(files))
                    return
            raise RuntimeError('Deployment files did not converge; marker not advanced')
        except Exception:
            logger.exception('Deployment failed; inspect before retrying')
            raise


if __name__ == '__main__':
    main()