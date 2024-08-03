// Copyright 2024, University of Colorado Boulder

/**
 * The population histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationHistogramBar from './PopulationHistogramBar.js';

type SelfOptions = {
  minValue: number;
  maxValue: number;
  maxCount: number;
  numBars: number;
  barGap: number;
  histogramWidth: number;
  histogramHeight: number;
};

export type PopulationHistogramOptions = SelfOptions & NodeOptions;

export default class PopulationHistogram extends Node {

  private bars: PopulationHistogramBar[];

  // private pixelsPerCount: number;

  public constructor( providedOptions: PopulationHistogramOptions ) {

    const options = optionize<PopulationHistogramOptions, SelfOptions, NodeOptions>()( {

      // add default values for optional SelfOptions here

      // add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    // this.pixelsPerCount = ( options.histogramHeight || 1000 ) / options.maxCount;

    const barWidth = Math.floor( ( options.histogramWidth - ( options.numBars - 1 ) * options.barGap ) / options.numBars );

    this.bars = [];
    for ( let i = 0; i < options.numBars; i++ ) {
      const bar = new PopulationHistogramBar( {
        maxCount: options.maxCount,
        barWidth: barWidth,
        barHeight: options.histogramHeight
      } );
      this.addChild( bar );
      bar.left = i * ( barWidth + options.barGap );
      bar.top = 0;
    this.bars.push( bar );
    }
  }

  // public updateFromSurvivalPhase( alive: number[], dead: number[] ): void {
  public updateFromSurvivalPhase( alive: number, dead: number ): void {
    for ( const bar of this.bars ) {
      bar.updateFromSurvivalPhase( alive, dead );
    }
  }
}

populationEvolution.register( 'PopulationHistogram', PopulationHistogram );