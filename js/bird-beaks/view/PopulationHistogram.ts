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
import TickSpacing from '../../common/view/TickSpacing.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import Utils from '../../../../dot/js/Utils.js';

type SelfOptions = {
  // todo
};

export type PopulationHistogramOptions = SelfOptions & PopulationHistogramBarsOptions & NodeOptions;

export default class PopulationHistogram extends Node {

  private histogramBars: PopulationHistogramBars;

  private minorYTickMarks: TickMarkSet;

  private majorYTickMarks: TickMarkSet;

  private majorYTickLabels: TickLabelSet;

  private majorYGridLines: GridLineSet;

  public constructor( providedOptions: PopulationHistogramOptions ) {

    const options = optionize<PopulationHistogramOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    // todo calculate these
    const majorXTickSpacing = 2.0;
    const [ minorYTickSpacing, majorYTickSpacing ] = this.pleasingTickSpacing( options.maxCount );

    const chartTransform = new ChartTransform( {
      viewWidth: options.histogramWidth,
      viewHeight: options.histogramHeight,
      modelXRange: new Range( options.minValue, options.maxValue ),
      modelYRange: new Range( 0, options.maxCount )
    } );

    const chartRectangle = new ChartRectangle( chartTransform, {
      fill: 'white',
      stroke: 'black',
      cornerXRadius: 6,
      cornerYRadius: 6
    } );

    this.histogramBars = new PopulationHistogramBars( options );

      // Minor ticks on the y-axis
    this.minorYTickMarks = new TickMarkSet( chartTransform, Orientation.VERTICAL, minorYTickSpacing, {
      stroke: 'darkGray',
      edge: 'min'
    } );

    // Major ticks and grid lines for the y-axis
    this.majorYTickMarks = new TickMarkSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing, { edge: 'min' } );
    this.majorYTickLabels = new TickLabelSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing, {
      edge: 'min',
      createLabel: ( value: number ) => new Text( value, { fontSize: 12 } )
    } );
    this.majorYGridLines = new GridLineSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing, { stroke: 'lightGray' } );

    const zoomLevelProperty = new NumberProperty( Math.ceil( options.maxCount / 10 ), { range: new Range( 1, 1000 ) } );

    const zoomButtonGroup = new PlusMinusZoomButtonGroup( zoomLevelProperty, {
      orientation: 'vertical',
      left: chartRectangle.right + 10,
      bottom: chartRectangle.bottom
    } );

    zoomLevelProperty.link( zoomLevel => {
      const maxCount = zoomLevel * 10;
      this.histogramBars.setMaxCount( maxCount );
      const [ minorYTickSpacing, majorYTickSpacing ] = this.pleasingTickSpacing( maxCount );
      this.minorYTickMarks.setSpacing( minorYTickSpacing );
      this.majorYTickMarks.setSpacing( majorYTickSpacing );
      this.majorYTickLabels.setSpacing( majorYTickSpacing );
      this.majorYGridLines.setSpacing( majorYTickSpacing );
      chartTransform.setModelYRange( new Range( 0, maxCount ) );
    } );

    this.children = [
      chartRectangle,

      // Clipped contents
      new Node( {
        clipArea: chartRectangle.getShape(),

        children: [
          this.majorYGridLines,
          this.histogramBars
        ]
      } ),

      // Ticks on the y-axis
      this.minorYTickMarks,
      this.majorYTickMarks,
      this.majorYTickLabels,

      // Ticks on the x-axis
      new TickMarkSet( chartTransform, Orientation.HORIZONTAL, majorXTickSpacing, { edge: 'min' } ),
      new TickLabelSet( chartTransform, Orientation.HORIZONTAL, majorXTickSpacing, {
        edge: 'min',
        createLabel: ( value: number ) => new Text( Utils.toFixed( value, 1 ), { fontSize: 12 } )
      } ),

      zoomButtonGroup
    ];
  }

  public update( phaseOutputs: PopulationPhaseOutputBeakSizes, playingSpeed: TimeSpeed ): void {
    this.histogramBars.update( phaseOutputs, playingSpeed );
  }

  public cancelAnimation(): void {
    this.histogramBars.cancelAnimation();
  }

  private pleasingTickSpacing( maxCount: number ): [ number, number ] {
    const minorSpacing = TickSpacing.pleasingMinorTickSpacing( maxCount, 21 );
    const majorSpacing = TickSpacing.pleasingMajorTickSpacing( maxCount, minorSpacing, 6 );
    return [ minorSpacing, majorSpacing ];
  }
}

populationEvolution.register( 'PopulationHistogram', PopulationHistogram );