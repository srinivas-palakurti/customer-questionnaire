import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | if-condition', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    assert.expect(1);
    this.set('inputValue', 'multiple-choice');

    await render(hbs`{{if-condition inputValue "multiple-choice"}}`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
