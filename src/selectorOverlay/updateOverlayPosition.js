import { getElementRectInPx } from '../utils';

export function updateOverlayPosition(selectorOverlayEl, highlightedEl) {
  const [x, y, width, height] = getElementRectInPx(highlightedEl);
  selectorOverlayEl.style.left = x;
  selectorOverlayEl.style.top = y;
  selectorOverlayEl.style.width = width;
  selectorOverlayEl.style.height = height;
}
