import { get, set } from '@ember/object';
import autoComputed from 'auto-computed';
import { module, test } from 'qunit';

module('auto computed properties');

test('passes dependent keys into function as arguments', function(assert) {
  let obj = {
    first: 'rob',
    last: 'jackson',

    @autoComputed('first', 'last')
    name(first, last) {
      assert.equal(first, 'rob');
      assert.equal(last, 'jackson');
    }
  };

  get(obj, 'name');
});

test('dependent key changes invalidate the computed property', function(assert) {
  let obj = {
    first: 'rob',
    last: 'jackson',

    @autoComputed('first', 'last')
    name(first, last) {
      return `${first} ${last}`;
    }
  };

  assert.equal(get(obj, 'name'), 'rob jackson');
  set(obj, 'first', 'al');
  assert.equal(get(obj, 'name'), 'al jackson');
});

test('works with es6 class', function(assert) {
  assert.expect(2);

  class Foo {
    constructor() {
      this.first = 'rob';
      this.last = 'jackson';
    }

    @autoComputed('first', 'last')
    fullName(first, last) {
      assert.equal(first, 'rob');
      assert.equal(last, 'jackson');
    }
  }

  let obj = new Foo();
  get(obj, 'fullName');
});