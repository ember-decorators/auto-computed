import { computedDecoratorWithParams } from '@ember-decorators/utils/computed';
import macroComputed from 'ember-macro-helpers/computed';

function extractValue(desc) {
  return desc.value ||
    (typeof desc.initializer === 'function' && desc.initializer());
}

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
const computed = computedDecoratorWithParams(function(_target, key, desc, params) {
  return macroComputed(...params, extractValue(desc));
});

export default computed;
