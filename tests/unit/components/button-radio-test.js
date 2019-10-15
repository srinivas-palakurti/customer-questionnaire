import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | button-radio', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  /* const items = {
    "label": "Ja",
    "value": "Ja",
    "selected": false
  } */

  test('it exists', function(assert) {
    let component = this.owner.factoryFor('component:button-radio').create();
    assert.ok(component);
  });
});
