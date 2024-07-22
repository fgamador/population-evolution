// Copyright 2024, University of Colorado Boulder

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
  //TODO add options that are specific to PopulationEvolutionModel here
};

type PopulationEvolutionModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class PopulationEvolutionModel implements TModel {

  public constructor( providedOptions: PopulationEvolutionModelOptions ) {
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

populationEvolution.register( 'PopulationEvolutionModel', PopulationEvolutionModel );