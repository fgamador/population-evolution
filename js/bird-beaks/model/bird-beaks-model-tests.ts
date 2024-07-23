import Bird from './Bird.js';
import Population from './Population.js';
import { TestRandomSource } from '../../common/model/RandomSource.js';

QUnit.module( 'TestRandomSource', function() {
  QUnit.test( 'nextValue', function( assert ) {
    var rand = new TestRandomSource( [ 0.25, 0.5 ] );
    assert.equal( rand.nextValue(), 0.25 );
    assert.equal( rand.nextValue(), 0.5  );
    assert.equal( rand.nextValue(), 0.25 );
    assert.equal( rand.nextValue(), 0.5 );
  } );
} );

QUnit.module( 'Population', function() {
  QUnit.test( 'survival', function( assert ) {
    var population = new Population( [ new Bird( 0.1 ), new Bird( 0.7 ), new Bird( 0.2 ), new Bird( 0.8 ) ] );
    var rand = new TestRandomSource( [ 0.5 ] );
    const [ alive, dead ] = population.survivalPhase( rand, bird => bird.beakSize );
    assert.equal( JSON.stringify( alive ), '[{"beakSize":0.7},{"beakSize":0.8}]' );
    assert.equal( JSON.stringify( dead ), '[{"beakSize":0.1},{"beakSize":0.2}]' );
    assert.equal( JSON.stringify( population.birds ), JSON.stringify( alive ) );
  } );
} );