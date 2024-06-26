import { createComponent, extendComponent } from '@dooksa/create-component'
import { ariaLabelMixin, formControlMixin, inputAllMixin, inputTextMixin } from '../mixins/index.js'

const inputText = createComponent({
  id: 'input-text',
  tag: 'input',
  properties: [
    {
      name: 'type',
      value: 'text'
    },
    {
      name: 'className',
      value: 'form-control'
    }
  ],
  content: [
    {
      name: 'value',
      nodePropertyName: 'value'
    }
  ],
  options: {
    id: {
      name: 'id'
    }
  }
}, [formControlMixin, inputAllMixin, inputTextMixin, ariaLabelMixin])

/**
 * @typedef {import('@dooksa/create-component').ComponentExtend} ComponentExtend
 * @typedef {import('../mixins/styles/form-control.js').FormControlMixin} FormControlMixin
 * @typedef {import('../mixins/input/input-all.js').InputAllMixin} InputAllMixin
 * @typedef {import('../mixins/input/input-text.js').InputTextMixin} InputTextMixin
 * @typedef {import('../mixins/aria/aria-label.js').AriaLabelMixin} AriaLabelMixin
 */

/**
 * @typedef {Object} ComponentExtendInputTextOptions
 * @property {string} [id]
 */

/**
 * @typedef {Object} ComponentExtendInputText
 * @property {ComponentExtendInputTextOptions|FormControlMixin|InputAllMixin|InputTextMixin|AriaLabelMixin} options
 */

/**
 * @param {ComponentExtend|ComponentExtendInputText} options
 */
function extendInputText (options) {
  return extendComponent(inputText, options)
}

export {
  inputText,
  extendInputText
}
