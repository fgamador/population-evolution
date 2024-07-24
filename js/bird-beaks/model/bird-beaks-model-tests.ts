import Bird from './Bird.js';
import Population from './Population.js';
import { TestRandomSource } from '../../common/model/RandomSource.js';

QUnit.module( 'TestRandomSource', function() {
  QUnit.test( 'nextValue repeats sequence', function( assert ) {
    var rand = new TestRandomSource( [ 0.25, 0.5 ] );
    assert.equal( rand.nextValue(), 0.25 );
    assert.equal( rand.nextValue(), 0.5  );
    assert.equal( rand.nextValue(), 0.25 );
    assert.equal( rand.nextValue(), 0.5 );
  } );
} );

QUnit.module( 'Population', function() {
  QUnit.test( 'survivalPhase', function( assert ) {
    var population = new Population( [ new Bird( 0.3 ), new Bird( 0.5 ), new Bird( 0.4 ), new Bird( 0.6 ) ] );
    var rand = new TestRandomSource( [ 0.5 ] );

    const [ alive, dead ] = population.survivalPhase( rand, bird => bird.beakSize );

    assert.equal( JSON.stringify( alive ), '[{"beakSize":0.5},{"beakSize":0.6}]' );
    assert.equal( JSON.stringify( dead ), '[{"beakSize":0.3},{"beakSize":0.4}]' );
    assert.equal( JSON.stringify( population.birds ), JSON.stringify( alive ) );
  } );

  QUnit.test( 'mateFindingPhase no shuffle perfect matches', function( assert ) {
    var population = new Population( [ new Bird( 0.3 ), new Bird( 0.3 ), new Bird( 0.4 ), new Bird( 0.4 ), new Bird( 0.5 ) ] );
    var rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.99, 0.5, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, ( bird1, bird2 ) => 1 - Math.abs( bird1.beakSize - bird2.beakSize ) );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.3},{"beakSize":0.3}],[{"beakSize":0.4},{"beakSize":0.4}]]' );
  } );

  QUnit.test( 'mateFindingPhase no shuffle single match', function( assert ) {
    var population = new Population( [ new Bird( 0.2 ), new Bird( 0.8 ), new Bird( 0.3 ), new Bird( 0.4 ), new Bird( 0.5 ) ] );
    var rand = new TestRandomSource( [ 0.99, 0.99, 0.99, 0.99, 0.5, 0.5 ] );

    const matedPairs = population.mateFindingPhase( rand, 1, ( bird1, bird2 ) => 1 - Math.abs( bird1.beakSize - bird2.beakSize ) );

    assert.equal( JSON.stringify( matedPairs ), '[[{"beakSize":0.3},{"beakSize":0.4}]]' );
  } );
} );