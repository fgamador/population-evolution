import Bird from './Bird.js';

QUnit.module('Bird', function() {
  QUnit.test('create', function(assert) {
    const bird = new Bird(23);
    assert.equal(bird.beakSize, 23);
  });
});