import { h, render } from 'preact';

import { SelectorOverlay } from './SelectorOverlay';
import { findHoveredElement } from './findHoveredElement';
import { updateOverlayPosition } from './updateOverlayPosition';
import { updateInstructionOpacity } from './updateInstructionOpacity';

export function renderSelectorOverlay(parentEl, onElementPicked) {
  const App = <SelectorOverlay onClick={onElementPicked} />;
  render(App, parentEl);
}

export { findHoveredElement, updateOverlayPosition, updateInstructionOpacity };
