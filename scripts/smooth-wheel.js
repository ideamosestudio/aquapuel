// Smooth only desktop wheel input; keep touch, keyboard and nested controls native.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(any-pointer: fine)');
  let frame = 0;
  let target = scrollY;
  let position = scrollY;
  let lastWritten = scrollY;
  let lastTime = 0;
  let direction = 0;
  const maximum = () =>
    Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const clamp = (value) => Math.max(0, Math.min(maximum(), value));
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    direction = 0;
    target = position = lastWritten = scrollY;
  };
  const tick = (now) => {
    if (
      Math.abs(scrollY - lastWritten) > 2 ||
      reduced.matches ||
      document.querySelector('.mobile-menu[open]')
    ) {
      stop();
      return;
    }
    target = clamp(target);
    const elapsed = Math.min(50, now - lastTime);
    lastTime = now;
    position += (target - position) * (1 - Math.exp(-elapsed / 160));
    if (Math.abs(target - position) < 0.6) position = target;
    window.scrollTo({ top: position, behavior: 'instant' });
    lastWritten = scrollY;
    if (position === target) {
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(tick);
  };
  window.addEventListener(
    'wheel',
    (event) => {
      if (
        event.defaultPrevented ||
        !event.cancelable ||
        reduced.matches ||
        !pointer.matches ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        !event.deltaY
      )
        return;
      if (
        document.querySelector('.mobile-menu[open]') ||
        ['hidden', 'clip'].includes(getComputedStyle(document.body).overflowY)
      ) {
        stop();
        return;
      }
      for (const node of event.composedPath()) {
        if (
          !(node instanceof HTMLElement) ||
          node === document.body ||
          node === document.documentElement
        )
          continue;
        if (
          node.matches(
            'input, textarea, select, [contenteditable="true"], [data-native-scroll]',
          ) ||
          (/auto|scroll/.test(getComputedStyle(node).overflowY) &&
            node.scrollHeight > node.clientHeight + 1)
        ) {
          stop();
          return;
        }
      }
      const nextDirection = Math.sign(event.deltaY);
      if (!frame || nextDirection !== direction) {
        position = target = lastWritten = scrollY;
      }
      direction = nextDirection;
      const unit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
      const distance =
        Math.min(Math.abs(event.deltaY * unit), 240) * 0.65 * direction;
      target = clamp(
        Math.max(position - 480, Math.min(position + 480, target + distance)),
      );
      if (target === scrollY && !frame) return;
      event.preventDefault();
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    },
    { passive: false },
  );
  for (const name of [
    'pointerdown',
    'touchstart',
    'keydown',
    'hashchange',
    'resize',
    'pagehide',
  ])
    window.addEventListener(name, stop, { passive: true });
  reduced.addEventListener('change', stop);
  pointer.addEventListener('change', stop);
})();
