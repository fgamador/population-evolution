// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';

export default class TickSpacing {

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