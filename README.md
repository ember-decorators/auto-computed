# @ember-decorators/auto-computed

Note: If you are using getter and setter functions (the recommended way), please use the `@computed` key from [ember-decorators](https://github.com/ember-decorators/ember-decorators)

### Installation

`ember install @ember-decorators/auto-computed`

If you're using **@ember-decorators/auto-computed** in an addon, pass the `-S` option to save
this as a `dependency` as opposed to the default `devDependency`:

`ember install -S @ember-decorators/auto-computed`

### Application Usage

In your application where you would normally have:

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  bar: Ember.computed('someKey', 'otherKey', function() {
    var someKey = this.get('someKey');
    var otherKey = this.get('otherKey');

    return `${someKey} - ${otherKey}`;
  })
})

```

You replace it with this:

```javascript
import Component from '@ember/component';
import autoComputed from '@ember-decorators/auto-computed';

export default class ExampleComponent extends Component {
  @autoComputed('someKey', 'otherKey')
  bar(someKey, otherKey) {
    return `${someKey} - ${otherKey}`;
  }
}

```

Note: The `@autoComputed` decorator wraps [ember-macro-helpers](https://github.com/kellyselden/ember-macro-helpers)
which provides a lot of helpful features on top of standard computeds. It is
highly recommended that you read the documentation for that addon as well.

## Installation

* `git clone <repository-url>` this repository
* `cd @ember-decorators/auto-computed`
* `yarn install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
