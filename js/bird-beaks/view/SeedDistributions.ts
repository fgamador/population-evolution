// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
// import PopulationEvolutionColors from '../../common/PopulationEvolutionColors.js';
import Range from '../../../../dot/js/Range.js';

type SelfOptions = {
  // todo
};

export type SeedDistributionsOptions = SelfOptions & NodeOptions;

export default class SeedDistributions extends Node {

  public constructor( providedOptions: SeedDistributionsOptions ) {

    const options = optionize<SeedDistributionsOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    const chartTransform = new ChartTransform( {
      viewWidth: 700,
      viewHeight: 300,
      modelXRange: new Range( -Math.PI / 8, Math.PI / 8 ),
      modelYRange: new Range( -4 / Math.PI, 4 / Math.PI )
    } );

    const chartRectangle = new ChartRectangle( chartTransform, {
      fill: 'white',
      stroke: 'black',
      cornerXRadius: 6,
      cornerYRadius: 6
    } );
    this.addChild( chartRectangle );
  }
}

populationEvolution.register( 'SeedDistributions', SeedDistributions );