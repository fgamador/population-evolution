// Copyright 2024, University of Colorado Boulder

/**
 * Tests for the bird-beaks population evolution view.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import TickSpacing from './TickSpacing.js';

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
  QUnit.test( 'Use tenth order-of-magnitude spacing if far below optimal', assert => {
    assert.equal( TickSpacing.pleasingMajorTickSpacing( 1200, 6 ), 100 );
  } );
  QUnit.test( 'Use twice order-of-magnitude spacing if well above optimal', assert => {
    assert.equal( TickSpacing.pleasingMajorTickSpacing( 90, 6 ), 20 );
  } );
} );