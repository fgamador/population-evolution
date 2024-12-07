/* eslint-disable copyright */

/**
 * Tests for the common population evolution model.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Population from '../../common/model/Population.js';
import { TestRandomSource } from './RandomSource.js';

class Individual {

  public constructor( public readonly trait: number ) {
  }
}

function matingProbability( individual1: Individual, individual2: Individual ): number {
  return 1 - Math.abs( individual1.trait - individual2.trait );
}

QUnit.module( 'Population', () => {
  QUnit.test( 'survivalPhase', assert => {
    const population = new Population( [ new Individual( 0.3 ), new Individual( 0.5 ), new Individual( 0.4 ), new Individual( 0.6 ) ] );
    const rand = new TestRandomSource( [ 0.5 ] );

    const [ alive, dead ] = population.survivalPhase( rand, bird => bird.trait );

    assert.equal( JSON.stringify( alive ), '[{"trait":0.5},{"trait":0.6}]' );
    assert.equal( JSON.stringify( dead ), '[{"trait":0.3},{"trait":0.4}]' );
    assert.equal( JSON.stringify( population.individuals ), JSON.stringify( alive ) );
  } );

  QUnit.test( 'mateFindingPhase no individuals', assert => {
    const population = new Population( [] );
    const rand = new TestRandomSource( [] );

    const matedPairs = population.mateFindingPhase( rand, 1, matingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[]' );
  } );

  QUnit.test( 'mateFindingPhase no shuffle perfect matches', assert => {
    const population = new Population( [ new Individual( 0.3 ), new Individual( 0.3 ), new Individual( 0.4 ), new Individual( 0.4 ), new Individual( 0.5 ) ] );
    const rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, matingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"trait":0.3},{"trait":0.3}],[{"trait":0.4},{"trait":0.4}]]' );
  } );

  QUnit.test( 'mateFindingPhase no shuffle single match', assert => {
    const population = new Population( [ new Individual( 0.2 ), new Individual( 0.8 ), new Individual( 0.3 ), new Individual( 0.4 ), new Individual( 0.5 ) ] );
    const rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, matingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"trait":0.3},{"trait":0.4}]]' );
  } );

  QUnit.test( 'mateFindingPhase no shuffle second-round match', assert => {
    const population = new Population( [ new Individual( 0.2 ), new Individual( 0.8 ), new Individual( 0.3 ), new Individual( 0.4 ) ] );
    const rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.5, 0.5, 0.99, 0.3 ] );

    const matedPairs = population.mateFindingPhase( rand, 2, matingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"trait":0.3},{"trait":0.4}],[{"trait":0.2},{"trait":0.8}]]' );
  } );

  QUnit.test( 'mateFindingPhase shuffle single match', assert => {
    const population = new Population( [ new Individual( 0.2 ), new Individual( 0.8 ), new Individual( 0.7 ) ] );
    const rand = new TestRandomSource( [ 0.0, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, matingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"trait":0.7},{"trait":0.8}]]' );
  } );

  QUnit.test( 'mateFindingPhase keeps odd one out for later rounds', assert => {
    const population = new Population( [ new Individual( 0.2 ), new Individual( 0.8 ), new Individual( 0.7 ) ] );
    const rand = new TestRandomSource( [ 0.99, 0.99, 0.5, 0.0, 0.99, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 2, matingProbability );

    assert.equal( JSON.stringify( matedPairs ), '[[{"trait":0.7},{"trait":0.8}]]' );
  } );
} );

QUnit.module( 'TestRandomSource', () => {
  QUnit.test( 'nextValue repeats last value', assert => {
    const rand = new TestRandomSource( [ 0.25, 0.5 ] );
    assert.equal( rand.nextValue(), 0.25 );
    assert.equal( rand.nextValue(), 0.5 );
    assert.equal( rand.nextValue(), 0.5 );
  } );
} );