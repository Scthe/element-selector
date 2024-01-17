import { h, render } from 'preact';

import { ELEMENT_ID } from '../constants';
import styles from './SelectorOverlay.module.css';

export function SelectorOverlay({ onClick }) {
  return (
    <div
      id={ELEMENT_ID.SELECTOR_OVERLAY}
      class={styles.overlay}
      onClick={onClick}
    >
      {/* Frame that moves over hovered element */}
      <div class={styles.selectedElementFrame}></div>

      {/* Frame around whole screen */}
      <div class={styles.overlayWindowFrame}>
        <div
          id={ELEMENT_ID.SELECTOR_OVERLAY_INSTRUCTIONS}
          class={styles.overlayInstructions}
        >
          Select an element on the page. Press [ESC] to cancel.
        </div>
      </div>
    </div>
  );
}
