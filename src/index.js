import { setVisible, isProductionBuild } from './utils';
import { ELEMENT_ID } from './constants';
import { renderWidget } from './widget';
import {
  renderSelectorOverlay,
  findHoveredElement,
  updateOverlayPosition,
  updateInstructionOpacity,
} from './selectorOverlay';
import styles from './index.module.css';

(function () {
  if (!isProductionBuild()) {
    // eslint-disable-next-line no-console
    console.log('Starting esbuild live reload');
    new EventSource('/esbuild').addEventListener('change', () =>
      location.reload()
    );
  }
})();

const getSelectorOverlayEl = () =>
  document.getElementById(ELEMENT_ID.SELECTOR_OVERLAY);

(function () {
  let hoveredElement;
  let selectedElement; // = document.getElementsByTagName('a')[0]; // predef. value for easy tests
  let widgetWrapperEl;

  setTimeout(() => {
    widgetWrapperEl = createElementInBody('widget-wrapper');
    rerenderWidget();

    const overlayWrapperEl = createElementInBody('selector-overlay-wrapper');
    renderSelectorOverlay(overlayWrapperEl, handleElementSelected);

    document.addEventListener('keydown', handleGlobalKey);
  }, 100);

  function activateSelectorOverlay(e) {
    console.log('Showing selector overlay');
    e.preventDefault();

    setVisible(ELEMENT_ID.SELECTOR_OVERLAY, true);
    setVisible(ELEMENT_ID.WIDGET, false);
    document.addEventListener('mousemove', handleMouseMoveOnSelectorOverlay);
  }

  function handleMouseMoveOnSelectorOverlay(e) {
    updateInstructionOpacity([e.clientX, e.clientY]);

    const selectorOverlayEl = getSelectorOverlayEl();
    const el = findHoveredElement(e, selectorOverlayEl);
    if (!el || hoveredElement === el) {
      return;
    }
    hoveredElement = el;

    updateOverlayPosition(selectorOverlayEl, hoveredElement);
  }

  function handleElementSelected(e) {
    console.log('Selected element:', hoveredElement);
    e && e.preventDefault();

    if (hoveredElement) {
      selectedElement = hoveredElement;
      hoveredElement = undefined;
    } else {
      selectedElement = undefined;
    }

    document.removeEventListener('mousemove', handleMouseMoveOnSelectorOverlay);

    setVisible(ELEMENT_ID.SELECTOR_OVERLAY, false);
    setVisible(ELEMENT_ID.WIDGET, true);
    rerenderWidget();
  }

  function onWidgetClose() {
    selectedElement = undefined;
    rerenderWidget();
  }

  function rerenderWidget() {
    renderWidget(
      widgetWrapperEl,
      selectedElement,
      onWidgetClose,
      activateSelectorOverlay
    );
  }

  function handleGlobalKey(e) {
    if (hoveredElement && e.key === 'Escape') {
      e.preventDefault();
      hoveredElement = undefined;
      selectedElement = undefined;
      handleElementSelected();
    }
  }
})();

function createElementInBody(id) {
  const el = document.createElement('div');
  el.id = id;
  el.classList.add(styles.sharedStyles);
  document.body.appendChild(el);
  return el;
}
