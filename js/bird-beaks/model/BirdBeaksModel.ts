// Copyright 2024, University of Colorado Boulder

/**
 * Model for the bird-beaks evolution sim as a whole.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Bird from './Bird.js';
import Population from './Population.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationPhaseOutputs from './PopulationPhaseOutputs.js';
import RandomSource from '../../common/model/RandomSource.js';
import SeedDistribution from './SeedDistribution.js';
import Seeds from './Seeds.js';
import TModel from '../../../../joist/js/TModel.js';

export default class BirdBeaksModel implements TModel {

  private rand: RandomSource;

  public population: Population;

  public seeds: Seeds;

  public constructor() {

    this.rand = new RandomSource();
    this.population = this.createPopulation();
    this.seeds = this.createSeeds();
  }

  public reset(): void {
    this.population = this.createPopulation();
    this.seeds = this.createSeeds();
  }

  private createPopulation(): Population {
    return new Population( Bird.normallyDistributed( this.rand, 1000, 10, 5 ) );
  }

  private createSeeds(): Seeds {
    return new Seeds( [ new SeedDistribution( 4, 3, 50 ), new SeedDistribution( 16, 3, 50 ) ] );
  }

  public update(): PopulationPhaseOutputs {
    const result = new PopulationPhaseOutputs();
    result.initial = [ ...this.population.birds ];

    const aliveDeadPair = this.population.survivalPhase( this.rand, bird => bird.survivalProbability( this.seeds ) );
    result.died = aliveDeadPair[ 1 ];

    const matedPairs = this.population.mateFindingPhase( this.rand, 3,
      ( bird1, bird2 ) => bird1.matingProbability( bird2 ) );

      // todo get stdev from UI property
    const newBirds = this.population.breedingPhase( matedPairs, ( bird1, bird2 ) => bird1.breed( this.rand, bird2, 2 ) );
    result.added = newBirds;

    return result;
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );