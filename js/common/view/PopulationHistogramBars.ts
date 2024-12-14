/* eslint-disable copyright */

/**
 * The collection of bars that make up the population histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import BinnedPopulationPhaseOutputValues from '../model/BinnedPopulationPhaseOutputValues.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationHistogramBar from './PopulationHistogramBar.js';
import PopulationPhaseOutputValues from '../model/PopulationPhaseOutputValues.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';

type SelfOptions = {
  minValue: number;
  maxValue: number;
  maxCount: number;
  numBars: number;
  barWidthFraction: number;
  histogramWidth: number;
  histogramHeight: number;
};

export type PopulationHistogramBarsOptions = SelfOptions & NodeOptions;

export default class PopulationHistogramBars<T> extends Node {

  private minValue: number;
  private maxValue: number;
  private histogramHeight: number;

  private bars: PopulationHistogramBar[];

  public constructor( providedOptions: PopulationHistogramBarsOptions ) {

    const options = optionize<PopulationHistogramBarsOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    this.minValue = options.minValue;
    this.maxValue = options.maxValue;
    this.histogramHeight = options.histogramHeight;

    const barPaddedWidth = options.histogramWidth / options.numBars;
    const barWidth = options.barWidthFraction * barPaddedWidth;

    this.bars = [];
    for ( let i = 0; i < options.numBars; i++ ) {
      const bar = new PopulationHistogramBar( {
        x: i * barPaddedWidth,
        y: 0,
        pixelsPerCount: options.histogramHeight / options.maxCount,
        barWidth: barWidth,
        barHeight: options.histogramHeight
      } );
      this.bars.push( bar );
      this.addChild( bar );
    }
  }

  public setMaxCount( value: number ): void {
    const pixelsPerCount = this.histogramHeight / value;
    for ( const bar of this.bars ) {
      bar.setPixelsPerCount( pixelsPerCount );
    }
  }

  public update( phaseOutputs: PopulationPhaseOutputValues<T>, playingSpeed: TimeSpeed ): void {
    const binned = new BinnedPopulationPhaseOutputValues<T>( phaseOutputs, this.bars.length, this.minValue, this.maxValue );

    for ( let i = 0; i < this.bars.length; i++ ) {
      this.bars[ i ].update( binned.bin( i ), playingSpeed );
    }
  }

  public cancelAnimation(): void {
    for ( const bar of this.bars ) {
      bar.cancelAnimation();
    }
  }
}

populationEvolution.register( 'PopulationHistogramBars', PopulationHistogramBars );