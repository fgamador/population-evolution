import Bird from './Bird.js';
import Population from './Population.js';
import { TestRandomSource } from '../../common/model/RandomSource.js';

function birdMatingProbability( bird1: Bird, bird2: Bird ): number {
  return 1 - Math.abs( bird1.beakSize - bird2.beakSize );
}

QUnit.module( 'Population', function() {
  QUnit.test( 'survivalPhase', function( assert ) {
    let population = new Population( [ new Bird( 0.3 ), new Bird( 0.5 ), new Bird( 0.4 ), new Bird( 0.6 ) ] );
    let rand = new TestRandomSource( [ 0.5 ] );

    const [ alive, dead ] = population.survivalPhase( rand, bird => bird.beakSize );

    assert.equal( JSON.stringify( alive ), '[{"beakSize":0.5},{"beakSize":0.6}]' );
    assert.equal( JSON.stringify( dead ), '[{"beakSize":0.3},{"beakSize":0.4}]' );
    assert.equal( JSON.stringify( population.birds ), JSON.stringify( alive ) );
  } );

  QUnit.test( 'mateFindingPhase no shuffle perfect matches', function( assert ) {
    let population = new Population( [ new Bird( 0.3 ), new Bird( 0.3 ), new Bird( 0.4 ), new Bird( 0.4 ), new Bird( 0.5 ) ] );
    let rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, birdMatingProbability( bird1, bird2 ) ) );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.3},{"beakSize":0.3}],[{"beakSize":0.4},{"beakSize":0.4}]]' );
  } );

  QUnit.test( 'mateFindingPhase no shuffle single match', function( assert ) {
    let population = new Population( [ new Bird( 0.2 ), new Bird( 0.8 ), new Bird( 0.3 ), new Bird( 0.4 ), new Bird( 0.5 ) ] );
    let rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, birdMatingProbability( bird1, bird2 ) );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.3},{"beakSize":0.4}]]' );
  } );

  QUnit.test( 'mateFindingPhase no shuffle second-round match', function( assert ) {
    let population = new Population( [ new Bird( 0.2 ), new Bird( 0.8 ), new Bird( 0.3 ), new Bird( 0.4 ) ] );
    let rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.5, 0.5, 0.99, 0.3 ] );

    const matedPairs = population.mateFindingPhase( rand, 2, birdMatingProbability( bird1, bird2 ) );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.3},{"beakSize":0.4}],[{"beakSize":0.2},{"beakSize":0.8}]]' );
  } );

  QUnit.test( 'mateFindingPhase shuffle single match', function( assert ) {
    let population = new Population( [ new Bird( 0.2 ), new Bird( 0.8 ), new Bird( 0.7 ) ] );
    let rand = new TestRandomSource( [ 0.0, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, birdMatingProbability( bird1, bird2 ) );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.7},{"beakSize":0.8}]]' );
  } );

  QUnit.test( 'mateFindingPhase keeps odd one out for later rounds', function( assert ) {
    let population = new Population( [ new Bird( 0.2 ), new Bird( 0.8 ), new Bird( 0.7 ) ] );
    let rand = new TestRandomSource( [ 0.99, 0.99, 0.5, 0.0, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 2, birdMatingProbability( bird1, bird2 ) );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.7},{"beakSize":0.8}]]' );
  } );
} );