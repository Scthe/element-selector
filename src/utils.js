// eslint-disable-next-line no-undef
export const isProductionBuild = () => IS_PRODUCTION;

export function isTagName(el, tagName) {
  return el !== null && el.tagName.toLowerCase() === tagName.toLowerCase();
}

/** Returns [x, y, width, height] */
export function getElementRect(el) {
  const rect = el.getBoundingClientRect();
  const x = window.scrollX + rect.left;
  const y = window.scrollY + rect.top;
  return [x, y, el.offsetWidth, el.offsetHeight];
}

/** Returns [x, y, width, height], all with 'px' suffix*/
export function getElementRectInPx(el) {
  return getElementRect(el).map((e) => `${e}px`);
}

export function setVisible(el, nextVisible) {
  el = typeof el === 'string' ? document.getElementById(el) : el;
  if (!el) return;

  el.style.display = nextVisible ? 'block' : 'none';
}

export function traverseParentEl(el, cb) {
  while (el != null && el !== document.body) {
    if (cb(el)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}

/**
 * Returns how many times has to call `.parentElement` to reach `parentEl`.
 * 0 - parentEl === el
 * 1 - parentEl === el.parentElement
 * 2 - parentEl === el.parentElement.parentElement
 * ...
 */
export function countJumpsTillParent(el, parentEl) {
  if (el === parentEl) {
    return 0;
  }

  // console.log('----');
  let count = -1; // first call will be with 'el', ignore
  const foundParent = traverseParentEl(el, (e) => {
    // console.log('TEST', count, e, parentEl);
    count += 1;
    return e === parentEl;
  });

  // fix, as `traverseParentEl` does not call `cb` with document.body
  count = parentEl === document.body ? count + 1 : count;
  return foundParent === parentEl ? count : -1;
}

export function isActivableElement(el) {
  const activableTagNames = ['a', 'button', 'form'];
  return activableTagNames.some((tagName) => isTagName(el, tagName));
}

export const clamp = (x, minVal, maxVal) =>
  Math.max(minVal, Math.min(maxVal, x));
