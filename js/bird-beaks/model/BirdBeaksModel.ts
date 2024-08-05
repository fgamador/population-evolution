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

export default class BirdBeaksModel implements TModel {

  private rand: RandomSource;

  public population: Population;

  public phaseProperty: EnumerationProperty<PopulationPhase>;

  public survivalPhaseEmitter: TinyEmitter<[ Bird[], Bird[] ]>;

  public breedingPhaseEmitter: TinyEmitter<[ [ Bird, Bird ][], Bird[] ]>;

  private phaseHandlers: Map<PopulationPhase, () => PopulationPhase>;

  public constructor() {

    this.rand = new RandomSource();
    this.population = this.createPopulation();
    this.phaseProperty = new EnumerationProperty( PopulationPhase.SURVIVAL );
    this.survivalPhaseEmitter = new TinyEmitter();
    this.breedingPhaseEmitter = new TinyEmitter();
  
    this.phaseHandlers = new Map( [
      [ PopulationPhase.SURVIVAL, this.survivalPhase.bind( this ) ],
      [ PopulationPhase.BREEDING, this.breedingPhase.bind( this ) ]
    ] );
  }

  public reset(): void {
    this.population = this.createPopulation();
    this.phaseProperty.reset();
  }

  private createPopulation(): Population {
    return new Population( Bird.normallyDistributed( this.rand, 1000, 10, 2 ) );
  }

  public update(): void {
    const handler = this.phaseHandlers.get( this.phaseProperty.value ) || this.dummyPhase;
    this.phaseProperty.value = handler();
  }

  private survivalPhase(): PopulationPhase {
    const [ alive, dead ] = this.population.survivalPhase( this.rand, bird => bird.survivalProbability() );
    this.survivalPhaseEmitter.emit( alive, dead );
    return PopulationPhase.BREEDING;
  }

  private breedingPhase(): PopulationPhase {
    const matedPairs = this.population.mateFindingPhase( this.rand, 3,
      ( bird1, bird2 ) => bird1.matingProbability( bird2 ) );
    // todo get stdev from UI property
    const newBirds = this.population.breedingPhase( matedPairs, ( bird1, bird2 ) => bird1.breed( this.rand, bird2, 0.5 ) );
    this.breedingPhaseEmitter.emit( matedPairs, newBirds );
    return PopulationPhase.SURVIVAL;
  }

  private dummyPhase(): PopulationPhase {
    assert && assert( false, 'Unhandled population phase' );
    return PopulationPhase.SURVIVAL;
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );