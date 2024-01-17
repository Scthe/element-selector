import { ELEMENT_ID } from '../constants';
import { clamp } from '../utils';

/**
 * Fires a bit too often, but whatever. Simple debounce would lose 'animation',
 * more complex (throttle with `maxWait`) is too complex for this demo app
 */
export function updateInstructionOpacity(mousePos) {
  const el = document.getElementById(ELEMENT_ID.SELECTOR_OVERLAY_INSTRUCTIONS);
  if (!el) {
    return;
  }

  const rect = el.getBoundingClientRect();
  const points = generatePoints(rect);
  const distToCorners = points.map((p) => getDistanceSquared(mousePos, p));
  const distSquared = Math.min(...distToCorners);

  const fadeDistance = rect.width / 2;
  const opacity = distSquared / (fadeDistance * fadeDistance);
  el.style.opacity = clamp(opacity, 0, 1);
}

function getDistanceSquared(mousePos, point) {
  const delta = [mousePos[0] - point[0], mousePos[1] - point[1]];
  return delta[0] * delta[0] + delta[1] * delta[1];
}

function generatePoints(rect) {
  const points = [rect.left, rect.right];

  const delta = rect.width / 10;
  let x = rect.left + delta;
  while (x < rect.right) {
    points.push(x);
    x += delta;
  }

  return points.map((x) => [x, rect.bottom]);
}
