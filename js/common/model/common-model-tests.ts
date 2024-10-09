/* eslint-disable copyright */

/**
 * Tests for the bird-beaks population evolution model.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import { TestRandomSource } from './RandomSource.js';

QUnit.module( 'TestRandomSource', () => {
  QUnit.test( 'nextValue repeats last value', assert => {
    const rand = new TestRandomSource( [ 0.25, 0.5 ] );
    assert.equal( rand.nextValue(), 0.25 );
    assert.equal( rand.nextValue(), 0.5 );
    assert.equal( rand.nextValue(), 0.5 );
  } );
} );