import { h, render, Fragment } from 'preact';
import cx from 'classnames';

import {
  countJumpsTillParent,
  traverseParentEl,
  isActivableElement,
} from '../utils';
import styles from './SelectedElementDetails.module.css';

function Line({ depth, children }) {
  return (
    <div style={{ paddingLeft: `calc(${depth} * var(--level-margin))` }}>
      {depth > 0 && <span className={styles.levelIndicator}>└</span>}
      {children}
    </div>
  );
}

const ChildrenCountLine = ({ depth, count, nextEl }) => {
  if (count === 1 && nextEl != null) {
    return <ElementLine depth={depth} el={nextEl.parentElement} />;
  }
  return (
    <Line depth={depth}>
      <span className={styles.childrenMsg}>({count} children)</span>
    </Line>
  );
};

const ElementLine = ({ depth, el }) => {
  const id = (el.id || '').length > 0 ? ` id=${el.id}` : '';
  const tagName = el.tagName.toLowerCase();
  // TODO truncate if needed
  const text = `<${tagName}${id}>`;
  return <Line depth={depth}>{text}</Line>;
};

export function SelectedElementDetails({ selectedElement, onClose }) {
  const activableParentEl = getClosestActivableElement(selectedElement);

  const [childrenCount0, childrenCount1] = getChildrenCountBetweenElements(
    activableParentEl,
    selectedElement
  );
  // console.log({ activableParentEl, childrenCount0, childrenCount1 });

  let depth = 0;

  return (
    <div className={cx(styles.container, styles.withContainerAnimation)}>
      {/* header */}
      <div className={cx(styles.header, styles.withAppearAnimation)}>
        Selected element
      </div>

      <div
        className={cx(styles.hierarchyContainer, styles.withAppearAnimation)}
      >
        {/* Body element */}
        <ElementLine depth={depth++} el={document.body} />
        {childrenCount0 > 0 && (
          <ChildrenCountLine
            depth={depth++}
            count={childrenCount0}
            nextEl={activableParentEl || selectedElement}
          />
        )}

        {/* Mid step */}
        {activableParentEl && (
          <>
            <ElementLine depth={depth++} el={activableParentEl} />
            {childrenCount1 > 0 && (
              <ChildrenCountLine
                depth={depth++}
                count={childrenCount1}
                nextEl={selectedElement}
              />
            )}
          </>
        )}

        {/* Clicked element */}
        <ElementLine depth={depth++} el={selectedElement} />
      </div>

      {/* footer */}
      <div className={cx(styles.footer, styles.withAppearAnimation)}>
        <button type="button" onClick={onClose} className={styles.closeBtn}>
          <span className={styles.closeBtnText}>Close</span>
        </button>
      </div>
    </div>
  );
}

function getClosestActivableElement(el) {
  let activableParentEl = traverseParentEl(el, isActivableElement);

  const isInvalid =
    activableParentEl === el || activableParentEl === document.body;
  return isInvalid ? undefined : activableParentEl;
}

/***
 * Children count between elements.
 *
 * * `-1` - same element
 * * ` 0` - direct descendants
 * * ` 1` - 1 node between elements etc.
 */
function getChildrenCountBetweenElements(activableEl, el) {
  // 5 jumps mean there are 4 children between `el` and `parentEl`
  if (activableEl) {
    const ch0 = countJumpsTillParent(activableEl, document.body);
    const ch1 = countJumpsTillParent(el, activableEl);
    return [ch0 - 1, ch1 - 1];
  }

  const ch0 = countJumpsTillParent(el, document.body);
  return [ch0 - 1, -1];
}
