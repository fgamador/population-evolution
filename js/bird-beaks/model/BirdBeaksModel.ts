/**
 * Model for the bird-beaks evolution sim as a whole.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Bird from './Bird.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Population from './Population.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationPhase from './PopulationPhase.js';
import RandomSource from '../../common/model/RandomSource.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import TModel from '../../../../joist/js/TModel.js';

type SelfOptions = {
  // TODO add options that are specific to BirdBeaksModel here
};

type BirdBeaksModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

// Seconds to wait for next call to model.update.
const updateIntervalForTimeSpeed = new Map<TimeSpeed, number>( [
  [ TimeSpeed.SLOW, 1.0 ],
  [ TimeSpeed.NORMAL, 0.5 ],
  [ TimeSpeed.FAST, 0.25 ]
] );

const nextPhase = new Map<PopulationPhase, PopulationPhase>( [
  [ PopulationPhase.SURVIVAL, PopulationPhase.MATE_FINDING ],
  [ PopulationPhase.MATE_FINDING, PopulationPhase.BREEDING ],
  [ PopulationPhase.BREEDING, PopulationPhase.SURVIVAL ]
] );

export default class BirdBeaksModel implements TModel {

  public isRunningProperty: BooleanProperty;

  public runSpeedProperty: EnumerationProperty<TimeSpeed>;

  private secondsUntilNextUpdate: number;

  private rand: RandomSource;

  public population: Population;

  public phase: EnumerationProperty<PopulationPhase>;

  public constructor( providedOptions: BirdBeaksModelOptions ) {

    this.isRunningProperty = new BooleanProperty( true );  
    this.runSpeedProperty = new EnumerationProperty<TimeSpeed>( TimeSpeed.SLOW );
    this.secondsUntilNextUpdate = 0;
    this.rand = new RandomSource();
    this.population = this.createPopulation();
    this.phase = new EnumerationProperty<PopulationPhase>( PopulationPhase.SURVIVAL );
  }

  public reset(): void {
    this.isRunningProperty.reset();
    this.runSpeedProperty.reset();
    this.secondsUntilNextUpdate = 0;
    this.population = this.createPopulation();
    this.phase.reset();
  }

  private createPopulation(): Population {
    return new Population( Bird.normallyDistributed( this.rand, 1000, 5, 2 ) );
  }

  public step( dt: number ): void {
    if ( !this.isRunningProperty.value || ( this.secondsUntilNextUpdate -= dt ) > 0 )
      return;

    this.secondsUntilNextUpdate = updateIntervalForTimeSpeed.get( this.runSpeedProperty.value ) || 1.0;
    this.update();
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