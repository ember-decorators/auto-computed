import Ember from 'ember';
import { assert } from '@ember/debug';
import { decoratorWithParams } from './utils/decorator-wrapper';
import macroComputed from 'ember-macro-helpers/computed';
import extractValue from './utils/extract-value';

/**
 * Decorator that turns a function into a computed property. 
 * The decorators should be applied to plain functions.  If using getter and setter functions, please see https://github.com/ember-decorators/ember-decorators
 *
 * ```javascript
 * import Component from '@ember/component';
 * import autoComputed from 'auto-computed';
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
  assert(`ES6 property getters/setters only need to be decorated once, '${key}' was decorated on both the getter and the setter`, !(desc.value instanceof Ember.ComputedProperty));
  return macroComputed(...params, extractValue(desc));
});

export default computed;