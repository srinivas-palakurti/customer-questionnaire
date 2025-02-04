import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | question-content', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:question-content');

    assert.equal(controller.get('nextButtonTitle'), 'Next', 'Next button property initialized');
    controller.send('radioButtonSelected', "list_12110962", "Meine Familie mit Kindern");
    assert.ok(controller);
  });

});
