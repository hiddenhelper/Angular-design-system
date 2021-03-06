/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import '@clr/core/button';
import { CwcButton } from '@clr/core/button';
import {
  CommonStringsService,
  event,
  EventEmitter,
  property,
  querySlotAll,
  returnOrFallthrough,
} from '@clr/core/common';
import {
  checkCircleIcon,
  ClarityIcons,
  exclamationCircleIcon,
  exclamationTriangleIcon,
  infoCircleIcon,
  timesIcon,
} from '@clr/core/icon-shapes';
import { html, LitElement } from 'lit-element';

const iconMap = {
  info: {
    shape: ClarityIcons.getIconNameFromShape(infoCircleIcon),
    title: CommonStringsService.keys.info,
  },
  success: {
    shape: ClarityIcons.getIconNameFromShape(checkCircleIcon),
    title: CommonStringsService.keys.success,
  },
  warning: {
    shape: ClarityIcons.getIconNameFromShape(exclamationTriangleIcon),
    title: CommonStringsService.keys.warning,
  },
  danger: {
    shape: ClarityIcons.getIconNameFromShape(exclamationCircleIcon),
    title: CommonStringsService.keys.danger,
  },
};

/**
 * Base class for alerts. Contains properties and functions common to all alerts.
 */
// @dynamic
export class CwcBaseAlert extends LitElement {
  @event() private closedChange: EventEmitter<boolean>;

  /** If false, the alert will not render the close button.  */
  @property({ type: Boolean })
  closable = true;

  /** Sets the color of the alert from a predefined list of statuses */
  @property({ type: String })
  status: 'info' | 'success' | 'warning' | 'danger';

  /** Sets the icon shape to be used to override the default icon. The application must import the icon shape. */
  @property({ type: String })
  iconShape = '';

  /** Sets the title attribute for the icon. This may need to be set especially if the component is using custom icon shape.  */
  @property({ type: String })
  iconTitle = '';

  @querySlotAll('cwc-button') private buttons: NodeListOf<CwcButton>;

  get alertIconShape() {
    /* 
     * if the component's icon-shape attribute is set, that value is used.
     * otherwise, we check for status attribute and set an icon shape that matches.
     * if neither is supplied we default to info-circle icon.
     */
    return returnOrFallthrough(
      [[this.iconShape, () => this.iconShape], [this.status, () => iconMap[this.status].shape]],
      () => infoCircleIcon[0]
    );
  }

  get alertIconTitle() {
    /* 
     * if the component's icon-title attribute is set, that value is used.
     * otherwise, we check for status attribute and set an icon shape that matches.
     * if neither is supplied we default to string for "Info".
     */
    return returnOrFallthrough(
      [
        [this.iconTitle, () => this.iconTitle],
        [this.status, () => (iconMap[this.status] ? iconMap[this.status].title : '')],
      ],
      () => CommonStringsService.keys.info
    );
  }

  updateButtons() {
    // buttons inside alert (usually app-level) have the style of small inverse buttons
    this.buttons.forEach(button => {
      button.status = 'inverse';
      button.size = 'sm';
    });
  }

  render() {
    return html`
      <div class="alert-wrapper">
        <div class="alert-item">
          <div class="alert-icon-wrapper">
            <cwc-icon class="alert-icon" shape="${this.alertIconShape}" title="${this.alertIconTitle}"></cwc-icon>
          </div>
          <slot></slot>
          <slot name="actions" @slotchange="${this.updateButtons()}"></slot>
        </div>
      </div>
      ${
        this.closable
          ? html`<button @click="${() => this.closeAlert()}" aria-label="${
              CommonStringsService.keys.alertCloseButtonAriaLabel
            }"
          class="close" action="outline" icon><cwc-icon shape="times"></cwc-icon></button>`
          : html``
      }
    `;
  }

  closeAlert() {
    this.closedChange.emit(true);
  }
}

ClarityIcons.addIcons(checkCircleIcon, infoCircleIcon, exclamationCircleIcon, exclamationTriangleIcon, timesIcon);
