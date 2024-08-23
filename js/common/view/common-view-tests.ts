// Copyright 2024, University of Colorado Boulder

/**
 * Tests for the bird-beaks population evolution view.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import TickSpacing from './TickSpacing.js';

QUnit.module( 'TickSpacing.orderOfMagnitude', () => {
  QUnit.test( 'orderOfMagnitude', assert => {
    assert.equal( TickSpacing.orderOfMagnitude( 99 ), 10 );
    assert.equal( TickSpacing.orderOfMagnitude( 9 ), 1 );
    assert.equal( TickSpacing.orderOfMagnitude( 0.9 ), 0.1 );
  } );
} );

QUnit.module( 'TickSpacing.pleasingMinorTickSpacing', () => {
  QUnit.test( 'Order-of-magnitude spacing with increasing range', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 1000, 100 ), 10 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 1499, 100 ), 10 );
  } );
  QUnit.test( 'Twice order-of-magnitude spacing', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 1500, 100 ), 20 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 2000, 100 ), 20 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 3499, 100 ), 20 );
  } );
  QUnit.test( 'Five-times order-of-magnitude spacing', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 3500, 100 ), 50 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 5000, 100 ), 50 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 7499, 100 ), 50 );
  } );
  QUnit.test( 'Ten-times order-of-magnitude spacing and up', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 7500, 100 ), 100 );
    // Next higher order of magnitude of optimal spacing; same algorithm as above.
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 10000, 100 ), 100 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 14999, 100 ), 100 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 15000, 100 ), 200 );
  } );
  QUnit.test( 'Order-of-magnitude spacing with decreasing range', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 1000, 100 ), 10 );
    // Next lower order of magnitude of optimal spacing.
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 750, 100 ), 10 );
  } );
  QUnit.test( 'Five-times lower-order-of-magnitude spacing', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 749, 100 ), 5 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 500, 100 ), 5 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 350, 100 ), 5 );
  } );
  QUnit.test( 'Two-times lower-order-of-magnitude spacing', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 349, 100 ), 2 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 200, 100 ), 2 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 150, 100 ), 2 );
  } );
  QUnit.test( 'Lower-order-of-magnitude spacing and below', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 149, 100 ), 1 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 100, 100 ), 1 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 75, 100 ), 1 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 74, 100 ), 0.5 );
  } );
} );

QUnit.module( 'TickSpacing.pleasingMajorTickSpacing', () => {
  QUnit.test( 'Use order-of-magnitude spacing if optimal', assert => {
    assert.equal( TickSpacing.pleasingMajorTickSpacing( 500, 6 ), 100 );
  } );
  QUnit.test( 'Use order-of-magnitude spacing if just below optimal', assert => {
    assert.equal( TickSpacing.pleasingMajorTickSpacing( 600, 6 ), 100 );
  } );
  QUnit.test( 'Use half order-of-magnitude spacing if well below optimal', assert => {
    assert.equal( TickSpacing.pleasingMajorTickSpacing( 200, 5 ), 50 );
  } );
  QUnit.test( 'Use twice order-of-magnitude spacing if well above optimal', assert => {
    assert.equal( TickSpacing.pleasingMajorTickSpacing( 90, 6 ), 20 );
  } );
  QUnit.test( 'Retry with tenth order-of-magnitude spacing if far below optimal', assert => {
    assert.equal( TickSpacing.pleasingMajorTickSpacing( 190, 6 ), 50 );
  } );
} );