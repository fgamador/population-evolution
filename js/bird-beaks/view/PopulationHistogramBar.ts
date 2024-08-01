// Copyright 2024, University of Colorado Boulder

/**
 * TODO
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

// import Animation from '../../../../twixt/js/Animation.js';
// import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Rectangle } from '../../../../scenery/js/imports.js';

type SelfOptions = {
  maxValue: number;
};

export type PopulationHistogramBarOptions = SelfOptions & NodeOptions & PickRequired<NodeOptions, 'maxHeight'>;

export default class PopulationHistogramBar extends Node {

  private pixelsPerValue: number;

  private valueRect: Rectangle;

  public constructor( initialValue: number, providedOptions: PopulationHistogramBarOptions ) {

    const options = optionize<PopulationHistogramBarOptions, SelfOptions, NodeOptions>()( {

      // add default values for optional SelfOptions here

      // add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    this.pixelsPerValue = ( options.maxHeight || 1000 ) / options.maxValue;

    const valueRect = new Rectangle( 500, 150,
      100, initialValue * this.pixelsPerValue,
      { fill: 'rgb( 120, 120, 120 )' } );
    this.addChild( valueRect );
    this.valueRect = valueRect;

    // const shrinkRect = new Animation( {
    //   setValue: function( value ) { rect.setRectHeightFromBottom( value ); },
    //   from: rect.height,
    //   to: 10,
    //   duration: 1.0
    // } );
    // shrinkRect.start();

    // Scale this Node, so that it matches the model width and height.
    // const scaleX = modelViewTransform.modelToViewDeltaX( barMagnet.size.width ) / this.width;
    // const scaleY = modelViewTransform.modelToViewDeltaY( barMagnet.size.height ) / this.height;
    // this.scale( scaleX, scaleY );
  }

  public showDied( count: number ): void {
    console.log( count );
  }
}

populationEvolution.register( 'PopulationHistogramBar', PopulationHistogramBar );