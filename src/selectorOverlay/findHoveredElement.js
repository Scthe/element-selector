import { isTagName } from '../utils';

export function findHoveredElement(event, selectorOverlayEl) {
  // ignore overlay
  selectorOverlayEl.style.pointerEvents = 'none';
  const el = document.elementFromPoint(event.clientX, event.clientY);
  selectorOverlayEl.style.pointerEvents = 'auto';

  if (!el || !isValidHoveredElement(el)) {
    return undefined;
  }

  return el;
}

function isValidHoveredElement(el) {
  const isInvalidElement = isTagName(el, 'body') || isTagName(el, 'html');
  return !isInvalidElement;
}
