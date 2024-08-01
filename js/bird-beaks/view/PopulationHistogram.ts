// Copyright 2024, University of Colorado Boulder

/**
 * The population histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

// import Animation from '../../../../twixt/js/Animation.js';
// import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
// import { Rectangle } from '../../../../scenery/js/imports.js';

type SelfOptions = {
  minValue: number;
  maxValue: number;
  numBars: number;
  interBarGap: number;
};

export type PopulationHistogramOptions = SelfOptions & NodeOptions & PickRequired<NodeOptions, 'localBounds'>;

export default class PopulationHistogram extends Node {

  private pixelsPerValue: number;

  public constructor( initialValue: number, providedOptions: PopulationHistogramOptions ) {

    const options = optionize<PopulationHistogramOptions, SelfOptions, NodeOptions>()( {

      // add default values for optional SelfOptions here

      // add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    this.pixelsPerValue = ( options.maxHeight || 1000 ) / options.maxValue;

    // Scale this Node, so that it matches the model width and height.
    // const scaleX = modelViewTransform.modelToViewDeltaX( barMagnet.size.width ) / this.width;
    // const scaleY = modelViewTransform.modelToViewDeltaY( barMagnet.size.height ) / this.height;
    // this.scale( scaleX, scaleY );
  }

  public updateFromSurvivalPhase( alive: number, dead: number ): void {
    // code goes here
  }
}

populationEvolution.register( 'PopulationHistogram', PopulationHistogram );