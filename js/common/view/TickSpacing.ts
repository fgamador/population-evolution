// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';

export default class TickSpacing {

  public static pleasingMajorTickSpacing( range: number, optimalNumberOfTicks: number ): number {
    return range / ( optimalNumberOfTicks - 1 );
  }
}

populationEvolution.register( 'TickSpacing', TickSpacing );