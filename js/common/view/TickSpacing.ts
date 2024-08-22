// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';

export default class TickSpacing {

  public static pleasingMajorTickSpacing( range: number, optimalTickCount: number ): number {
    const minTickCount = Math.ceil( optimalTickCount * 0.75 );
    const maxTickCount = Math.floor( optimalTickCount * 1.25 );
    const orderOfMagnitude = Math.pow( 10, Math.floor( Math.log10( range ) ) );

    if ( this.tickCount( range, orderOfMagnitude ) < minTickCount ) {
      const halfOrderOfMagnitude = orderOfMagnitude / 2;

      if ( this.tickCount( range, halfOrderOfMagnitude ) < minTickCount ) {
        return orderOfMagnitude / 10;
      }

      return halfOrderOfMagnitude;
    }

    if ( this.tickCount( range, orderOfMagnitude ) > maxTickCount ) {
      return orderOfMagnitude * 2;
    }

    return orderOfMagnitude;
  }

  private static tickCount( range: number, spacing: number ): number {
    return ( range / spacing ) + 1;
  }
}

populationEvolution.register( 'TickSpacing', TickSpacing );