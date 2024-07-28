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

  public isRunningProperty: BooleanProperty;

  public runSpeedProperty: EnumerationProperty<TimeSpeed>;

  private timer: CallbackTimer;

  public constructor( providedOptions: BirdBeaksModelOptions ) {

    this.isRunningProperty = new BooleanProperty( true );
  
    this.runSpeedProperty = new EnumerationProperty<TimeSpeed>( TimeSpeed.SLOW );

    this.timer = new CallbackTimer( {
      interval: 1000,
      callback: this.stepOnce.bind( this )
    } );
    if ( this.isRunningProperty.value ) {
      this.timer.start();
    }
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    // TODO
  }

  public startStop(): void {
    if ( this.isRunningProperty.value ) {
      this.timer.start();
    } else{
      this.timer.stop( false );
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