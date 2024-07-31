/**
 * Model for the bird-beaks evolution sim as a whole.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Bird from './Bird.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Population from './Population.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationPhase from './PopulationPhase.js';
import RandomSource from '../../common/model/RandomSource.js';
import TModel from '../../../../joist/js/TModel.js';

type SelfOptions = {
  // TODO add options that are specific to BirdBeaksModel here
};

type BirdBeaksModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

const nextPhase = new Map<PopulationPhase, PopulationPhase>( [
  [ PopulationPhase.SURVIVAL, PopulationPhase.MATE_FINDING ],
  [ PopulationPhase.MATE_FINDING, PopulationPhase.BREEDING ],
  [ PopulationPhase.BREEDING, PopulationPhase.SURVIVAL ]
] );

export default class BirdBeaksModel implements TModel {

  private rand: RandomSource;

  public population: Population;

  public phase: EnumerationProperty<PopulationPhase>;

  public constructor( providedOptions: BirdBeaksModelOptions ) {

    this.rand = new RandomSource();
    this.population = this.createPopulation();
    this.phase = new EnumerationProperty<PopulationPhase>( PopulationPhase.SURVIVAL );
  }

  public reset(): void {
    this.population = this.createPopulation();
    this.phase.reset();
  }

  private createPopulation(): Population {
    return new Population( Bird.normallyDistributed( this.rand, 1000, 5, 2 ) );
  }

  public update(): void {
    switch ( this.phase.value ) {
      case PopulationPhase.SURVIVAL: {
        const [ alive, dead ] = this.population.survivalPhase( this.rand, bird => bird.survivalProbability() );
        break;
      }

      case PopulationPhase.MATE_FINDING: {
        // TODO
        break;
      }

      case PopulationPhase.BREEDING: {
        // TODO
        break;
      }
    }

    this.phase.value = nextPhase.get( this.phase.value ) || PopulationPhase.SURVIVAL;
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );