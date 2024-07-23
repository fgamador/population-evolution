import Bird from './Bird.js';
import Population from './Population.js';
import { TestRandomSource } from '../../common/model/RandomSource.js';

QUnit.module('TestRandomSource', function() {
  QUnit.test('nextValue', function(assert) {
    var rand = new TestRandomSource([0.25, 0.5]);
    assert.equal(rand.nextValue(), 0.25);
    assert.equal(rand.nextValue(), 0.5);
    assert.equal(rand.nextValue(), 0.25);
    assert.equal(rand.nextValue(), 0.5);
  });
});

/*
QUnit.module('Population', function() {
  QUnit.test('survival', function(assert) {
    var population = new Population([new Bird(23), new Bird(19)]);
    var rand = new TestRandomSource([TODO]);
    const [dead, alive] = population.survivalPhase(rand, bird => { TODO });
    assert.equal(JSON.stringify(dead), "TODO");
    assert.equal(JSON.stringify(alive), "TODO");
    assert.equal(JSON.stringify(population.birds), "TODO");
  });
});
*/