/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import populationEvolution from '../../populationEvolution.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TModel from '../../../../joist/js/TModel.js';

type SelfOptions = {
  // TODO add options that are specific to BirdBeaksModel here
};

type BirdBeaksModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class BirdBeaksModel implements TModel {

  // Whether the model is advanced on each call to step.
  public isPlayingProperty: BooleanProperty;

  public constructor( providedOptions: BirdBeaksModelOptions ) {
    // TODO
    this.isPlayingProperty = new BooleanProperty( true );
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
      this.stepOnce();
    }
  }

  /**
   * Steps the model one step. Called directly when using the step button of the time control.
   */
  public stepOnce(): void {
    // TODO
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );