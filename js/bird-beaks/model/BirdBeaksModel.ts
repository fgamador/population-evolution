// Copyright 2024, University of Colorado Boulder

/**
 * Model for the bird-beaks evolution sim as a whole.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Bird from './Bird.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Population from './Population.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationPhase from './PopulationPhase.js';
import RandomSource from '../../common/model/RandomSource.js';
import TinyEmitter from '../../../../axon/js/TinyEmitter.js';
import TModel from '../../../../joist/js/TModel.js';

const nextPhase = new Map<PopulationPhase, PopulationPhase>( [
  [ PopulationPhase.SURVIVAL, PopulationPhase.MATE_FINDING ],
  [ PopulationPhase.MATE_FINDING, PopulationPhase.BREEDING ],
  [ PopulationPhase.BREEDING, PopulationPhase.SURVIVAL ]
] );

export default class BirdBeaksModel implements TModel {

  private rand: RandomSource;

  public population: Population;

  public phaseProperty: EnumerationProperty<PopulationPhase>;

  public survivalPhaseEmitter: TinyEmitter<[ number, number ]>;

  public constructor() {

    this.rand = new RandomSource();
    this.population = this.createPopulation();
    this.phaseProperty = new EnumerationProperty( PopulationPhase.SURVIVAL );
    this.survivalPhaseEmitter = new TinyEmitter();
  }

  public reset(): void {
    this.population = this.createPopulation();
    this.phaseProperty.reset();
  }

  private createPopulation(): Population {
    return new Population( Bird.normallyDistributed( this.rand, 1000, 5, 2 ) );
  }

  public update(): void {
    switch( this.phaseProperty.value ) {
      case PopulationPhase.SURVIVAL: {
        const [ alive, dead ] = this.population.survivalPhase( this.rand, bird => bird.survivalProbability() );
        this.survivalPhaseEmitter.emit( alive.length, dead.length );
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

      default: {
        break;
      }
    }

    this.phaseProperty.value = nextPhase.get( this.phaseProperty.value ) || PopulationPhase.SURVIVAL;
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );