import { h, render } from 'preact';
import cx from 'classnames';

import { ELEMENT_ID } from '../constants';
import { PickerButton } from './PickerButton';
import { SelectedElementDetails } from './SelectedElementDetails';
import styles from './Widget.module.css';

export function Widget({ selectedElement, onClose, onSelectorButtonClick }) {
  const hasSelectedEl =
    selectedElement != null && typeof selectedElement === 'object';

  return (
    <div
      id={ELEMENT_ID.WIDGET}
      className={cx(styles.widgetContainer, {
        [styles.widgetContainerWithButton]: !hasSelectedEl,
      })}
    >
      {hasSelectedEl ? (
        <SelectedElementDetails
          selectedElement={selectedElement}
          onClose={onClose}
        />
      ) : (
        <PickerButton onSelectorButtonClick={onSelectorButtonClick} />
      )}
    </div>
  );
}
