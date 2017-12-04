import { get, set, setProperties } from '@ember/object';
import autoComputed from '@ember-decorators/auto-computed';
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

test('passes dependent keys into function as arguments with getters/setters', function(assert) {
  assert.expect(3);

  let obj = {
    first: 'rob',
    last: 'jackson',

    @autoComputed('first', 'last')
    name: {
      get(first, last) { 
        assert.equal(first, 'rob');
        assert.equal(last, 'jackson');
        return `${this.first} ${this.last}`;
      },
      set(name) {
        const [first, last] = name.split(' ');
        setProperties(this, { first, last });
        // for now, this return is required with computed getters/setters
        return `${this.first} ${this.last}`;
      }
    }
  };

  get(obj, 'name');

  let expectedName = 'wierd al';
  set(obj, 'fullName', expectedName);

  assert.strictEqual(get(obj, 'fullName'), expectedName, 'return value of getter is new value of property');
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

test('works properly without params', function(assert) {
  let callCount = 0;
  let obj = {
    first: 'rob',
    last: 'jackson',

    @autoComputed
    name() {
      callCount++;
    }
  };

  get(obj, 'name');

  assert.equal(callCount, 1);
});

test('works with es6 class object getter/setter', function(assert) {
  assert.expect(3);

  class Foo {
    constructor() {
      this.first = 'rob';
      this.last = 'jackson';
    }

    @autoComputed('first', 'last')
    fullName = {
      get(first, last) {
        assert.equal(first, 'rob');
        assert.equal(last, 'jackson');
        return `${this.first} ${this.last}`;
      },
      set(name) {
        const [first, last] = name.split(' ');
        setProperties(this, { first, last });
        // for now, this return is required with computed getters/setters
        return `${this.first} ${this.last}`;
      }
    }
  }

  let obj = new Foo();
  get(obj, 'fullName');

  let expectedName = 'wierd al';
  set(obj, 'fullName', expectedName);

  assert.strictEqual(get(obj, 'fullName'), expectedName, 'return value of getter is new value of property');
});