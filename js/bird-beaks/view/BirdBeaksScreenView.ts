/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador
 */

import BirdBeaksModel from '../model/BirdBeaksModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionConstants from '../../common/PopulationEvolutionConstants.js';
import PopulationPhase from '../model/PopulationPhase.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import StringDisplay from '../../../../scenery-phet/js/StringDisplay.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';

type SelfOptions = {
  //TODO add options that are specific to BirdBeaksScreenView here
};

type BirdBeaksScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class BirdBeaksScreenView extends ScreenView {

  private labelValue: StringProperty;

  private rect: Rectangle;

  public constructor( model: BirdBeaksModel, providedOptions: BirdBeaksScreenViewOptions ) {

    const options = optionize<BirdBeaksScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    this.labelValue = new StringProperty('');
    const label = new StringDisplay( this.labelValue, {
      top: this.layoutBounds.minY + PopulationEvolutionConstants.SCREEN_VIEW_Y_MARGIN,
      centerX: this.layoutBounds.maxX / 2
    } );
    this.addChild( label );

    model.phase.link( phase => {
      switch ( phase ) {
        case PopulationPhase.SURVIVAL: {
          this.labelValue.value = 'Survival phase';
          break;
        }
        case PopulationPhase.MATE_FINDING: {
          this.labelValue.value = 'Mate-finding phase';
          break;
        }
        case PopulationPhase.BREEDING: {
          this.labelValue.value = 'Breeding phase';
          break;
        }
      }
    } );

    this.rect = new Rectangle( ( this.layoutBounds.maxX / 2 - 50 ), 150, 100, 200, { fill: 'rgb( 120, 120, 120 )', opacity: 1.0 } );
    this.addChild( this.rect );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - PopulationEvolutionConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - PopulationEvolutionConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // Time controls, used to play/pause the simulation
    const timeControlNode = new TimeControlNode( model.isRunningProperty, {
      playPauseStepButtonOptions: {
        stepForwardButtonOptions: {
          listener: () => model.update()
        }
      },
      timeSpeedProperty: model.runSpeedProperty,
      timeSpeeds: [ TimeSpeed.FAST, TimeSpeed.SLOW ],
      right: resetAllButton.left - 40,
      bottom: this.layoutBounds.bottom - PopulationEvolutionConstants.SCREEN_VIEW_Y_MARGIN
    } );
    this.addChild( timeControlNode );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    this.rect.setRectHeightFromBottom( 200 );
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    if ( this.rect.getHeight() > 10 ) {
      this.rect.setRectHeightFromBottom( this.rect.getHeight() - 5 );
    }
  }
}

populationEvolution.register( 'BirdBeaksScreenView', BirdBeaksScreenView );