import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | button-radio', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, args) => this.actions[actionName].apply(this, args);
  });

  test('it renders selected value', async function (assert) {

    assert.expect(4);

    this.set("name", "list_12110962");
    this.set("type", "radio");
    this.set("value", "Meine Familie mit Kindern");
    this.set("selected", false);

    const item = {
      "label": "Ja",
      "value": "Ja",
      "selected": false
    }
    this.set("item", item);
    await render(hbs `<ButtonRadio @identifier={{name}} @item={{item}}>
      {{value}}
      </ButtonRadio>
      `);

      await click(this.element);

      //lable name checking
      assert.equal(this.element.querySelector('input').getAttribute('name'), 'list_12110962', 'list_12110962');

      assert.equal(this.element.querySelector('input').getAttribute('type'), 'radio', 'radio');

      //lable value checking
      assert.equal(this.element.textContent.trim(), `Ja



      Meine Familie mit Kindern`);

      assert.ok(this.element, 'rendered radio button');

      // console.log("testing element" + this.element);

  });


  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ButtonRadio />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ButtonRadio>
        template block text
      </ButtonRadio>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
