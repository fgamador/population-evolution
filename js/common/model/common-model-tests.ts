import { TestRandomSource } from './RandomSource.js';

QUnit.module( 'TestRandomSource', function() {
  QUnit.test( 'nextValue repeats last value', function( assert ) {
    let rand = new TestRandomSource( [ 0.25, 0.5 ] );
    assert.equal( rand.nextValue(), 0.25 );
    assert.equal( rand.nextValue(), 0.5  );
    assert.equal( rand.nextValue(), 0.5 );
  } );
} );