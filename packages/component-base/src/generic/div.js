import { createComponent, extendComponent } from '@dooksa/create-component'
import {
  backgroundMixin,
  borderMixin,
  buttonMixin,
  containerMixin,
  displayMixin,
  flexMixin,
  fontMixin,
  gapMixin,
  insetMixin,
  positionMixin,
  roundedMixin,
  shadowMixin,
  spacingMixin,
  translateMixin,
  zIndexMixin
} from '@dooksa/component-mixins'

export const div = createComponent({
  id: 'div',
  tag: 'div'
}, [
  backgroundMixin,
  borderMixin,
  buttonMixin,
  containerMixin,
  displayMixin,
  flexMixin,
  fontMixin,
  gapMixin,
  insetMixin,
  positionMixin,
  roundedMixin,
  shadowMixin,
  spacingMixin,
  translateMixin,
  zIndexMixin
])

/**
 * @import {FlexMixin,
 * BackgroundMixin,
 * PositionMixin,
 * SpacingMixin,
 * ZIndexMixin,
 * InsetMixin,
 * TransformTranslateMixin,
 * ButtonMixin,
 * DisplayMixin,
 * ShadowMixin,
 * RoundedMixin,
 * FontMixin,
 * BorderMixin,
 * GapMixin,
 * ContainerMixin} from '@dooksa/component-mixins'
 * @import {ComponentExtend} from '@dooksa/create-component'
 */

/**
 * @typedef {Object} ExtendDivOptions
 * @property {FontMixin|
 * RoundedMixin|
 * ShadowMixin|
 * BackgroundMixin|
 * FlexMixin|
 * PositionMixin|
 * SpacingMixin|
 * ZIndexMixin|
 * InsetMixin|
 * TransformTranslateMixin|
 * ButtonMixin|
 * DisplayMixin|
 * BorderMixin|
 * GapMixin|
 * ContainerMixin} options
 */

/**
 * @param {ComponentExtend|ExtendDivOptions} options
 */
export const extendDiv = function (options) {
  return extendComponent(div, options)
}
