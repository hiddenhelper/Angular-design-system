/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { baseStyles, property, registerElementSafely, StatusTypes } from '@clr/core/common';
import { html, LitElement } from 'lit-element';
import { styles } from './badge.element.css';

/**
 * Badges provide a method to highlight a count of an element either next to it
 * or inside the element itself.
 *
 * ```typescript
 * import '@clr/core/badge';
 * ```
 *
 * ```html
 * <cwc-badge status="info">2</cwc-badge>
 * ```
 *
 * @element cwc-badge
 * @slot default - Content slot for inside the badge
 * @cssprop --background
 * @cssprop --color
 */
// @dynamic
export class CwcBadge extends LitElement {
  /** Sets the color of the badge from the following predefined list of choices:
   *  'gray', 'purple', 'blue', 'orange', 'light-blue'
   */
  @property({ type: String })
  color: 'gray' | 'purple' | 'blue' | 'orange' | 'light-blue';

  /** Sets the color of the badge from the following predefined list of statuses:
   *  'info', 'success', 'warning', 'danger'
   */
  @property({ type: String })
  status: StatusTypes;

  render() {
    return html`
      <slot></slot>
    `;
  }

  static get styles() {
    return [baseStyles, styles];
  }
}

registerElementSafely('cwc-badge', CwcBadge);

declare global {
  interface HTMLElementTagNameMap {
    'cwc-badge': CwcBadge;
  }
}
