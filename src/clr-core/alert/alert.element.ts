/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { baseStyles, property, registerElementSafely } from '@clr/core/common';
import {
  checkCircleIcon,
  ClarityIcons,
  exclamationCircleIcon,
  exclamationTriangleIcon,
  infoCircleIcon,
  timesIcon,
} from '@clr/core/icon-shapes';
import { CwcBaseAlert } from './alert.base';
import { styles } from './alert.element.css';

/**
 * Web component alerts.
 *
 * ```typescript
 * import '@clr/core/alert';
 * ```
 *
 * ```html
 * <cwc-alert>
 *    <cwc-alert-content>This is an alert.</cwc-alert-content>
 * </cwc-alert>
 * ```
 *
 * @noInheritDoc
 * @beta 3.0
 * @element cwc-alert
 * @slot default - Content slot for inside the alert. Usually will contain at least a <cwc-alert-content> component.
 * @cssprop --color
 * @cssprop --background
 * @cssprop --border-radius
 * @cssprop --border-color
 * @cssprop --icon-color
 * @cssprop --close-icon-color
 * @cssprop --close-icon-color-hover
 */
// @dynamic
export class CwcAlert extends CwcBaseAlert {
  /** Sets the overall height and width of the alert and icon based on value */
  @property({ type: String })
  size: 'default' | 'sm';

  static get styles() {
    return [baseStyles, styles];
  }
}

registerElementSafely('cwc-alert', CwcAlert);

ClarityIcons.addIcons(checkCircleIcon, infoCircleIcon, exclamationCircleIcon, exclamationTriangleIcon, timesIcon);

declare global {
  interface HTMLElementTagNameMap {
    'cwc-alert': CwcAlert;
  }
}
