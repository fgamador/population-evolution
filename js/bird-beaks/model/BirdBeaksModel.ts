/* eslint-disable copyright */

/**
 * Model for the bird-beaks evolution sim as a whole.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Bird from './Bird.js';
import BirdNiche from './BirdNiche.js';
import Population from '../../common/model/Population.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionConstants from '../../common/PopulationEvolutionConstants.js';
import PopulationPhaseOutputs from './PopulationPhaseOutputs.js';
import Property from '../../../../axon/js/Property.js';
import RandomSource from '../../common/model/RandomSource.js';
import SeedDistribution from './SeedDistribution.js';
import Seeds from './Seeds.js';
import TModel from '../../../../joist/js/TModel.js';

export default class BirdBeaksModel implements TModel {

  private rand: RandomSource;

  public population: Population<Bird>;

  public seeds: Seeds;

  public readonly beakSizeStdDevProperty: Property<number>;

  public constructor() {
    this.rand = new RandomSource();
    this.population = this.createPopulation();
    this.seeds = this.createSeeds();
    this.beakSizeStdDevProperty = new Property( 2 );
  }

  public reset(): void {
    this.population = this.createPopulation();
    this.seeds = this.createSeeds();
    this.beakSizeStdDevProperty.reset();
  }

  private createPopulation(): Population<Bird> {
    // todo constants, or create in view?
    return new Population( Bird.normallyDistributed( this.rand, PopulationEvolutionConstants.BIRD_INITIAL_COUNT,
      PopulationEvolutionConstants.BIRD_INITIAL_BEAK_SIZE_MEAN, PopulationEvolutionConstants.BIRD_INITIAL_BEAK_SIZE_STDEV ) );
  }

  private createSeeds(): Seeds {
    // todo constants, or create in view?
    return new Seeds( [ new SeedDistribution( 4, 3, 5000, true ), new SeedDistribution( 10, 3, 3000, false ), new SeedDistribution( 16, 3, 4000, true ) ] );
  }

  public update(): PopulationPhaseOutputs {
    const result = new PopulationPhaseOutputs();
    result.initial = [ ...this.population.individuals ];

    BirdNiche.updateAll( this.population.individuals, this.seeds );

    const aliveDeadPair = this.population.survivalPhase( this.rand,
      bird => bird.survivalProbability() );
    result.died = aliveDeadPair[ 1 ];

    // todo constant
    const matedPairs = this.population.mateFindingPhase( this.rand, 3,
      ( bird1, bird2 ) => bird1.matingProbability( bird2 ) );

    const newBirds = this.population.breedingPhase( matedPairs,
      ( bird1, bird2 ) => bird1.breed( this.rand, bird2, this.beakSizeStdDevProperty.value ) );
    result.added = newBirds;

    return result;
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );