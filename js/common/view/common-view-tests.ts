// Copyright 2024, University of Colorado Boulder

/**
 * Tests for the bird-beaks population evolution view.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import TickSpacing from './TickSpacing.js';

QUnit.module( 'TickSpacing', () => {
  QUnit.test( 'orderOfMagnitude', assert => {
    assert.equal( TickSpacing.orderOfMagnitude( 99 ), 10 );
    assert.equal( TickSpacing.orderOfMagnitude( 9 ), 1 );
    assert.equal( TickSpacing.orderOfMagnitude( 0.9 ), 0.1 );
  } );

  QUnit.test( 'pleasingMinorTickSpacing with increasing range', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 1000, 100 ), 10 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 1499, 100 ), 10 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 1500, 100 ), 20 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 2000, 100 ), 20 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 3499, 100 ), 20 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 3500, 100 ), 50 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 5000, 100 ), 50 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 7499, 100 ), 50 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 7500, 100 ), 100 );
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