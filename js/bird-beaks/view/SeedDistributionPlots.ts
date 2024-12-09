/* eslint-disable copyright */

/**
 * Rectangle with plots of the seed size distributions.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import { Image, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import LinePlot from '../../../../bamboo/js/LinePlot.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import populationEvolution from '../../populationEvolution.js';
import Range from '../../../../dot/js/Range.js';
import SeedDistribution from '../model/SeedDistribution.js';
import Seeds from '../model/Seeds.js';
import seedsBig_png from '../../../images/seedsBig_png.js';
import seedsTiny_png from '../../../images/seedsTiny_png.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = {
  minValue: number;
  maxValue: number;
  diagramWidth: number;
  diagramHeight: number;
};

// todo move these
const minSeedSize = 0;
const maxSeedSize = 20;

export type SeedDistributionsOptions = SelfOptions & NodeOptions;

export default class SeedDistributionPlots extends Node {

  private clipAreaNode: Node;

  public constructor( private readonly seeds: Seeds, providedOptions: SeedDistributionsOptions ) {

    const options = optionize<SeedDistributionsOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    // todo calculate these
    const majorXTickSpacing = 2;
    const minorYTickSpacing = 100;
    const majorYTickSpacing = 200;

    const chartTransform = new ChartTransform( {
      viewWidth: options.diagramWidth,
      viewHeight: options.diagramHeight,
      modelXRange: new Range( options.minValue, options.maxValue ),
      modelYRange: new Range( 0, 1000 ) // todo max height
    } );

    const chartRectangle = new ChartRectangle( chartTransform, {
      fill: 'white',
      stroke: 'black',
      cornerXRadius: 6,
      cornerYRadius: 6
    } );

    const seedsTiny = new Image( seedsTiny_png, {
      left: chartRectangle.left + 10,
      bottom: chartRectangle.bottom - 10
    } );

    const seedsBig = new Image( seedsBig_png, {
      right: chartRectangle.right - 10,
      bottom: chartRectangle.bottom - 10
    } );

    this.children = [
      chartRectangle,
      seedsTiny,
      seedsBig,

      // Clipped contents
      this.clipAreaNode = new Node( {
        clipArea: chartRectangle.getShape(),

        children: [
          // Major grid lines
          new GridLineSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing, { stroke: 'lightGray' } )
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
      } )
    ];

    this.addSeedDistributionPlots( chartTransform );
  }

  private addSeedDistributionPlots( chartTransform: ChartTransform ): void {
    const seedsPlot = new LinePlot( chartTransform, toSeedsPlotDataSet( this.seeds ), { stroke: 'black', lineWidth: 2 } );

    for ( let i = 0; i < this.seeds.numDistributions(); ++i ) {
      const seedDist = this.seeds.getDistribution( i );
      const stroke = seedDist.enabledProperty.value ? 'gray' : 'lightgray';
      const seedPlot = new LinePlot( chartTransform, [], { stroke: stroke, lineWidth: 2 } );
      seedDist.onChange( () => {
        seedPlot.setDataSet( toSeedDistributionPlotDataSet( seedDist ) );
        seedsPlot.setDataSet( toSeedsPlotDataSet( this.seeds ) );
      } );
      this.clipAreaNode.addChild( seedPlot );
    }

    this.clipAreaNode.addChild( seedsPlot );
  }
}

function toSeedsPlotDataSet( seeds: Seeds ): Vector2[] {
  const result = [];
  for ( let x = minSeedSize; x <= maxSeedSize; x += 0.1 ) {
    result.push( new Vector2( x, seeds.abundance( x ) ) );
  }
  return result;
}

function toSeedDistributionPlotDataSet( seedDist: SeedDistribution ): Vector2[] {
  const result = [];
  for ( let x = minSeedSize; x <= maxSeedSize; x += 0.1 ) {
    result.push( new Vector2( x, seedDist.abundance( x ) ) );
  }
  return result;
}

populationEvolution.register( 'SeedDistributionPlots', SeedDistributionPlots );