/* eslint-disable copyright */

/**
 * Tests for the bird-beaks population evolution model.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Bird from './Bird.js';
import Population from './Population.js';
import { TestRandomSource } from '../../common/model/RandomSource.js';

function birdMatingProbability( bird1: Bird, bird2: Bird ): number {
  return 1 - Math.abs( bird1.beakSize - bird2.beakSize );
}

QUnit.module( 'Population', () => {
  QUnit.test( 'survivalPhase', assert => {
    const population = new Population( [ new Bird( 0.3 ), new Bird( 0.5 ), new Bird( 0.4 ), new Bird( 0.6 ) ] );
    const rand = new TestRandomSource( [ 0.5 ] );

    const [ alive, dead ] = population.survivalPhase( rand, bird => bird.beakSize );

    assert.equal( JSON.stringify( alive ), '[{"beakSize":0.5},{"beakSize":0.6}]' );
    assert.equal( JSON.stringify( dead ), '[{"beakSize":0.3},{"beakSize":0.4}]' );
    assert.equal( JSON.stringify( population.individuals ), JSON.stringify( alive ) );
  } );

  QUnit.test( 'mateFindingPhase no birds', assert => {
    const population = new Population( [] );
    const rand = new TestRandomSource( [] );

    const matedPairs = population.mateFindingPhase( rand, 1, birdMatingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[]' );
  } );

  QUnit.test( 'mateFindingPhase no shuffle perfect matches', assert => {
    const population = new Population( [ new Bird( 0.3 ), new Bird( 0.3 ), new Bird( 0.4 ), new Bird( 0.4 ), new Bird( 0.5 ) ] );
    const rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, birdMatingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.3},{"beakSize":0.3}],[{"beakSize":0.4},{"beakSize":0.4}]]' );
  } );

  QUnit.test( 'mateFindingPhase no shuffle single match', assert => {
    const population = new Population( [ new Bird( 0.2 ), new Bird( 0.8 ), new Bird( 0.3 ), new Bird( 0.4 ), new Bird( 0.5 ) ] );
    const rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, birdMatingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.3},{"beakSize":0.4}]]' );
  } );

  QUnit.test( 'mateFindingPhase no shuffle second-round match', assert => {
    const population = new Population( [ new Bird( 0.2 ), new Bird( 0.8 ), new Bird( 0.3 ), new Bird( 0.4 ) ] );
    const rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.5, 0.5, 0.99, 0.3 ] );

    const matedPairs = population.mateFindingPhase( rand, 2, birdMatingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.3},{"beakSize":0.4}],[{"beakSize":0.2},{"beakSize":0.8}]]' );
  } );

  QUnit.test( 'mateFindingPhase shuffle single match', assert => {
    const population = new Population( [ new Bird( 0.2 ), new Bird( 0.8 ), new Bird( 0.7 ) ] );
    const rand = new TestRandomSource( [ 0.0, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, birdMatingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.7},{"beakSize":0.8}]]' );
  } );

  QUnit.test( 'mateFindingPhase keeps odd one out for later rounds', assert => {
    const population = new Population( [ new Bird( 0.2 ), new Bird( 0.8 ), new Bird( 0.7 ) ] );
    const rand = new TestRandomSource( [ 0.99, 0.99, 0.5, 0.0, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 2, birdMatingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.7},{"beakSize":0.8}]]' );
  } );
} );