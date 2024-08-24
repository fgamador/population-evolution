// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';

export default class TickSpacing {

  public static pleasingMinorTickSpacing( range: number, optimalMinorTickCount: number ): number {
    const optimalSpacing = range / optimalMinorTickCount;
    const optimalSpacingOOM = this.orderOfMagnitude( optimalSpacing );
    return optimalSpacingOOM * this.minorTickSpacingOOMMultiplier( optimalSpacing / optimalSpacingOOM );
  }

  public static orderOfMagnitude( x: number ): number {
    return Math.pow( 10, Math.floor( Math.log10( x ) ) );
  }

  private static minorTickSpacingOOMMultiplier( optimalSpacingToOOMRatio: number ): number {
    if ( optimalSpacingToOOMRatio >= 7.5 ) {
      return 10;
    }
    else if ( optimalSpacingToOOMRatio >= 3.5 ) {
      return 5;
    }
    else if ( optimalSpacingToOOMRatio >= 1.5 ) {
      return 2;
    }
    else {
      return 1;
    }
  }

  public static pleasingMajorTickSpacing( range: number, minorTickSpacing: number, optimalMajorTickCount: number ): number {
    const minorTickCount = this.tickCount( range, minorTickSpacing );
    const optimalSpacing = ( ( minorTickCount - 1 ) / optimalMajorTickCount ) * minorTickSpacing;
    // eslint-disable-next-line bad-sim-text
    return Math.round( optimalSpacing );
  }

  private static tickCount( range: number, spacing: number ): number {
    return ( range / spacing ) + 1;
  }
}

populationEvolution.register( 'TickSpacing', TickSpacing );