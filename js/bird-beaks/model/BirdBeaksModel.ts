/**
 * Model for the bird-beaks evolution sim as a whole.
 *
 * @author Franz Amador
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import CallbackTimer, { CallbackTimerOptions } from '../../../../axon/js/CallbackTimer.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import populationEvolution from '../../populationEvolution.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import TModel from '../../../../joist/js/TModel.js';

type SelfOptions = {
  // TODO add options that are specific to BirdBeaksModel here
};

type BirdBeaksModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class BirdBeaksModel implements TModel {

  private timer: CallbackTimer;

  // Whether the model is advanced on each call to step.
  public isPlayingProperty: BooleanProperty;

  public timeSpeedProperty: EnumerationProperty<TimeSpeed>;

  public constructor( providedOptions: BirdBeaksModelOptions ) {

    this.timer = new CallbackTimer( {
      interval: 1000,
      callback: this.stepOnce.bind( this )
    } );
    // this.timer.start();

    // TODO
    this.isPlayingProperty = new BooleanProperty( true );
  
    this.timeSpeedProperty = new EnumerationProperty<TimeSpeed>( TimeSpeed.SLOW );
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    // TODO
  }

  /**
   * Steps the model.
   * dt - time step, in seconds
   */
  public step( dt: number ): void {
    if ( this.isPlayingProperty.value ) {
      // console.log( dt );
      // this.stepOnce();
    }
  }

  /**
   * Steps the model one step. Called directly when using the step button of the time control.
   */
  public stepOnce(): void {
    // TODO
    console.log( 'stepOnce' );
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );