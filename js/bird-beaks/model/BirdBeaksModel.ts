/**
 * Model for the bird-beaks evolution sim as a whole.
 *
 * @author Franz Amador
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import populationEvolution from '../../populationEvolution.js';
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

  public constructor( providedOptions: BirdBeaksModelOptions ) {

    this.isRunningProperty = new BooleanProperty( true );  
    this.runSpeedProperty = new EnumerationProperty<TimeSpeed>( TimeSpeed.SLOW );
    this.secondsUntilNextUpdate = 0;
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
    // TODO
    console.log( 'update' );
  }
}

populationEvolution.register( 'BirdBeaksModel', BirdBeaksModel );