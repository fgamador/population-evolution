// Copyright 2024, University of Colorado Boulder

/**
 * The population histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationHistogramBar from './PopulationHistogramBar.js';

type SelfOptions = {
  minValue: number;
  maxValue: number;
  maxCount: number;
  numBars: number;
  barGap: number;
};

export type PopulationHistogramOptions = SelfOptions & NodeOptions &
  PickRequired<NodeOptions, 'maxWidth' | 'maxHeight'>;

export default class PopulationHistogram extends Node {

  private bars: PopulationHistogramBar[];

  // private pixelsPerValue: number;

  public constructor( providedOptions: PopulationHistogramOptions ) {

    const options = optionize<PopulationHistogramOptions, SelfOptions, NodeOptions>()( {

      // add default values for optional SelfOptions here

      // add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    // this.pixelsPerCount = ( options.maxHeight || 1000 ) / options.maxCount;

    const width = options.maxWidth || 1000;
    const barWidth = ( width - ( options.numBars - 1 ) * options.barGap ) / options.numBars;

    this.bars = [];
    for ( let i = 0; i < options.numBars; i++ ) {
      const bar = new PopulationHistogramBar( 0, {
        maxCount: options.maxCount,
        maxHeight: options.maxHeight,
        barWidth: barWidth,

        left: i * ( barWidth + options.barGap ),
        top: 0
      } );
      this.addChild( bar );
      this.bars.push( bar );
    }

    // Scale this Node, so that it matches the model width and height.
    // const scaleX = modelViewTransform.modelToViewDeltaX( barMagnet.size.width ) / this.width;
    // const scaleY = modelViewTransform.modelToViewDeltaY( barMagnet.size.height ) / this.height;
    // this.scale( scaleX, scaleY );
  }

  // public updateFromSurvivalPhase( alive: number[], dead: number[] ): void {
  public updateFromSurvivalPhase( alive: number, dead: number ): void {
      // code goes here
  }
}

populationEvolution.register( 'PopulationHistogram', PopulationHistogram );