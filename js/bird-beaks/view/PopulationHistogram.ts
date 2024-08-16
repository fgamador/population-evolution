// Copyright 2024, University of Colorado Boulder

/**
 * Rectangle with a histogram of the population.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import { Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import PlusMinusZoomButtonGroup from '../../../../scenery-phet/js/PlusMinusZoomButtonGroup.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationHistogramBars, { PopulationHistogramBarsOptions } from './PopulationHistogramBars.js';
import PopulationPhaseOutputBeakSizes from './PopulationPhaseOutputBeakSizes.js';
import Range from '../../../../dot/js/Range.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Utils from '../../../../dot/js/Utils.js';

type SelfOptions = {
  // todo
};

export type PopulationHistogramOptions = SelfOptions & PopulationHistogramBarsOptions & NodeOptions;

export default class PopulationHistogram extends Node {

  private histogramBars: PopulationHistogramBars;

  public constructor( providedOptions: PopulationHistogramOptions ) {

    const options = optionize<PopulationHistogramOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    const valuePadding = ( options.maxValue - options.minValue ) / options.numBars / 2;
    // todo calculate these
    const majorXTickSpacing = 2;
    const minorYTickSpacing = 10;
    const majorYTickSpacing = 50;

    const chartTransform = new ChartTransform( {
      viewWidth: options.histogramWidth,
      viewHeight: options.histogramHeight,
      modelXRange: new Range( options.minValue - valuePadding, options.maxValue + valuePadding ),
      modelYRange: new Range( 0, options.maxCount )
    } );

    const chartRectangle = new ChartRectangle( chartTransform, {
      fill: 'white',
      stroke: 'black',
      cornerXRadius: 6,
      cornerYRadius: 6
    } );

    this.histogramBars = new PopulationHistogramBars( options );

    const zoomLevelProperty = new NumberProperty( Math.ceil( options.maxCount / 10 ), { range: new Range( 1, 1000 ) } );

    const zoomButtonGroup = new PlusMinusZoomButtonGroup( zoomLevelProperty, {
      orientation: 'vertical',
      left: chartRectangle.right + 10,
      bottom: chartRectangle.bottom
    } );
    zoomLevelProperty.link( zoomLevel => {
      const maxCount = zoomLevel * 10;
      this.histogramBars.setMaxCount( maxCount );
      chartTransform.setModelYRange( new Range( 0, maxCount ) );
    } );

    this.children = [
      chartRectangle,

      // Clipped contents
      new Node( {
        clipArea: chartRectangle.getShape(),

        children: [

          // Minor grid lines
          new GridLineSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing, { stroke: 'lightGray' } ),

          this.histogramBars
        ]
      } ),

      // Minor ticks on the y-axis
      new TickMarkSet( chartTransform, Orientation.VERTICAL, minorYTickSpacing, {
        stroke: 'darkGray',
        edge: 'min'
      } ),

      // Major ticks on the y-axis
      new TickMarkSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing, { edge: 'min' } ),
      new TickLabelSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing, {
        edge: 'min',
        createLabel: ( value: number ) => new Text( value, { fontSize: 12 } )
      } ),

      // Major ticks on the x-axis
      new TickMarkSet( chartTransform, Orientation.HORIZONTAL, majorXTickSpacing, { edge: 'min' } ),
      new TickLabelSet( chartTransform, Orientation.HORIZONTAL, majorXTickSpacing, {
        edge: 'min',
        createLabel: ( value: number ) => new Text( Utils.toFixed( value, 1 ), { fontSize: 12 } )
      } ),

      zoomButtonGroup
    ];
  }

  public update( phaseOutputs: PopulationPhaseOutputBeakSizes ): void {
    this.histogramBars.update( phaseOutputs );
  }
}

populationEvolution.register( 'PopulationHistogram', PopulationHistogram );