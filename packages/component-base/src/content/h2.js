import { createComponent, extendComponent } from '@dooksa/create-component'
import {
  spacingMixin, displayMixin, flexMixin
} from '@dooksa/component-mixins'

export const h2 = createComponent({
  id: 'h2',
  tag: 'h2'
}, [spacingMixin, flexMixin, displayMixin])

/**
 * @import {ComponentExtend} from '@dooksa/create-component'
 * @import {FlexMixin, SpacingMixin, DisplayMixin} from '@dooksa/component-mixins'
 */

/**
 * @typedef {Object} ExtendH2OptionMixin
 * @property {FlexMixin|SpacingMixin|DisplayMixin} options
 */

/**
 * @typedef {ComponentExtend|ExtendH2OptionMixin} ExtendH2
 */

/**
 * @param {ExtendH2} options
 */
export const extendH2 = function (options) {
  return extendComponent(h2, options)
}
