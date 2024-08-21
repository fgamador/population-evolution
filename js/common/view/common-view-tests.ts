// Copyright 2024, University of Colorado Boulder

/**
 * Tests for the bird-beaks population evolution view.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import TickSpacing from './TickSpacing.js';

QUnit.module( 'TickSpacing.pleasingMajorTickSpacing', () => {
  QUnit.test( 'Perfect fit with optimal number of ticks', assert => {
    assert.equal( TickSpacing.pleasingMajorTickSpacing( 50, 6 ), 10 );
  } );
  QUnit.test( 'todo', assert => {
    assert.equal( TickSpacing.pleasingMajorTickSpacing( 50, 6 ), 10 );
  } );
} );