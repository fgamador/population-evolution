/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador
 */

import populationEvolution from '../../populationEvolution.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TModel from '../../../../joist/js/TModel.js';

type SelfOptions = {
  //TODO add options that are specific to BirdBeaksModel here
};

type BirdBeaksModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class BirdBeaksModel implements TModel {

  public constructor( providedOptions: BirdBeaksModelOptions ) {
    //TODO
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    //TODO
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );