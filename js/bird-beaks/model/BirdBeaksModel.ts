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

  public survivalPhaseEmitter: TinyEmitter<[ Bird[], Bird[] ]>;

  public mateFindingPhaseEmitter: TinyEmitter<[ Bird, Bird ][]>;

  private phaseHandlers: Map<PopulationPhase, () => void>;

  public constructor() {

    this.rand = new RandomSource();
    this.population = this.createPopulation();
    this.phaseProperty = new EnumerationProperty( PopulationPhase.SURVIVAL );
    this.survivalPhaseEmitter = new TinyEmitter();
    this.mateFindingPhaseEmitter = new TinyEmitter();
  
    this.phaseHandlers = new Map( [
      [ PopulationPhase.SURVIVAL, this.survivalPhase.bind( this ) ],
      [ PopulationPhase.MATE_FINDING, this.mateFindingPhase.bind( this ) ]
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
    const handler = this.phaseHandlers.get( this.phaseProperty.value ) || doNothing;
    handler();

    this.phaseProperty.value = nextPhase.get( this.phaseProperty.value ) || PopulationPhase.SURVIVAL;
  }
  
  private survivalPhase(): void {
    const [ alive, dead ] = this.population.survivalPhase( this.rand, bird => bird.survivalProbability() );
    this.survivalPhaseEmitter.emit( alive, dead );
  }
  
  private mateFindingPhase(): void {
    const matedPairs = this.population.mateFindingPhase( this.rand, 2,
      ( bird1, bird2 ) => bird1.matingProbability( bird2 ) );
    this.mateFindingPhaseEmitter.emit( matedPairs );
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function doNothing(): void {
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );