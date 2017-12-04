import { decoratorWithParams } from '@ember-decorators/utils/decorator-wrappers';
import macroComputed from 'ember-macro-helpers/computed';
import extractValue from '@ember-decorators/utils/extract-value';

/**
 * Decorator that turns a function into a computed property. 
 * The decorators should be applied to plain functions.  If using getter and setter functions, please see https://github.com/ember-decorators/ember-decorators
 *
 * ```javascript
 * import Component from '@ember/component';
 * import autoComputed from '@ember-decorators/auto-computed';
 *
 * export default class UserProfileComponent extends Component {
 *   first = 'John';
 *   last = 'Smith';
 *
 *   @autoComputed('first', 'last')
 *   name(first, last) {
 *     return `${first} ${last}`; // => 'John Smith'
 *   }
 * }
 * ```
 *
 * @function
 * @param {...String} propertyNames - List of property keys this computed is dependent on
 */
const computed = decoratorWithParams(function(_target, key, desc, params) {
  return macroComputed(...params, extractValue(desc));
});

export default computed;