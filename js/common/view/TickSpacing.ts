// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';

export default class TickSpacing {

  public static pleasingMinorTickSpacing( range: number, optimalTickCount: number ): number {
    const optimalSpacing = range / optimalTickCount;
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

  public static pleasingMajorTickSpacing( range: number, optimalTickCount: number ): number {
    const orderOfMagnitude = Math.pow( 10, Math.floor( Math.log10( range ) ) );
    return this.pleasingMajorTickSpacingInner( range, optimalTickCount, orderOfMagnitude );
  }

  private static pleasingMajorTickSpacingInner( range: number, optimalTickCount: number, orderOfMagnitude: number ): number {
    const minTickCount = Math.ceil( optimalTickCount * 0.75 );
    const maxTickCount = Math.floor( optimalTickCount * 1.25 );

    if ( this.tickCount( range, orderOfMagnitude ) < minTickCount ) {
      const halfOrderOfMagnitude = orderOfMagnitude / 2;

      if ( this.tickCount( range, halfOrderOfMagnitude ) < minTickCount ) {
        return this.pleasingMajorTickSpacingInner( range, optimalTickCount, orderOfMagnitude / 10 );
      }

      return halfOrderOfMagnitude;
    }

    if ( this.tickCount( range, orderOfMagnitude ) > maxTickCount ) {
      const twiceOrderOfMagnitude = orderOfMagnitude * 2;

      if ( this.tickCount( range, twiceOrderOfMagnitude ) > maxTickCount ) {
        return orderOfMagnitude * 5;
      }

      return twiceOrderOfMagnitude;
    }

    return orderOfMagnitude;
  }

  private static tickCount( range: number, spacing: number ): number {
    return ( range / spacing ) + 1;
  }
}

populationEvolution.register( 'TickSpacing', TickSpacing );