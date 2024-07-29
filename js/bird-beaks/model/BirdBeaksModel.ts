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
function updateIntervalForTimeSpeed(timeSpeed: TimeSpeed): number {
  switch (timeSpeed) {
    case TimeSpeed.FAST:
      return 0.25;
    case TimeSpeed.NORMAL:
      return 0.5;
    default:
      return 1.0;
  }
}

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
    this.population = new Population(Bird.normallyDistributed( this.rand, 1000, 5, 2 ));
    this.phase = new EnumerationProperty<PopulationPhase>( PopulationPhase.SURVIVAL );
  }

  public reset(): void {
    this.isRunningProperty.reset();
    this.runSpeedProperty.reset();
    this.secondsUntilNextUpdate = 0;
  }

  public step( dt: number ): void {
    if ( !this.isRunningProperty.value || ( this.secondsUntilNextUpdate -= dt ) > 0 )
      return;

    this.secondsUntilNextUpdate = updateIntervalForTimeSpeed( this.runSpeedProperty.value );
    this.update();
  }

  public update(): void {
    switch ( this.phase.value ) {
      case PopulationPhase.SURVIVAL: {
        this.phase.value = PopulationPhase.MATE_FINDING;
        break;
      }

      case PopulationPhase.MATE_FINDING: {
        this.phase.value = PopulationPhase.BREEDING;
        break;
      }

      case PopulationPhase.BREEDING: {
        this.phase.value = PopulationPhase.SURVIVAL;
        break;
      }
    }
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );