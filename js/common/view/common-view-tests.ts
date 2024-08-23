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

  QUnit.test( 'pleasingMinorTickSpacing', assert => {
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 100, 10 ), 10 );
    assert.equal( TickSpacing.pleasingMinorTickSpacing( 110, 10 ), 10 );
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