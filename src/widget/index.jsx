import { h, render } from 'preact';

import { Widget } from './Widget';

export function renderWidget(
  parentEl,
  selectedElement,
  onClose,
  onSelectorButtonClick
) {
  const App = (
    <Widget
      selectedElement={selectedElement}
      onClose={onClose}
      onSelectorButtonClick={onSelectorButtonClick}
    />
  );
  render(App, parentEl);
}
