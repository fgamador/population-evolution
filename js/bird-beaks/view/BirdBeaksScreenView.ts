// Copyright 2024, University of Colorado Boulder

/**
 * The root view for the bird-beak evolution sim.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import BirdBeaksModel from '../model/BirdBeaksModel.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionConstants from '../../common/PopulationEvolutionConstants.js';
import PopulationHistogram from './PopulationHistogram.js';
import PopulationPhase from '../model/PopulationPhase.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import StringDisplay from '../../../../scenery-phet/js/StringDisplay.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';

// Seconds to wait for next call to model.update.
const updateIntervalForTimeSpeed = new Map<TimeSpeed, number>( [
  [ TimeSpeed.SLOW, 1.0 ],
  [ TimeSpeed.NORMAL, 0.5 ],
  [ TimeSpeed.FAST, 0.25 ]
] );

type SelfOptions = EmptySelfOptions;

type BirdBeaksScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class BirdBeaksScreenView extends ScreenView {

  private model: BirdBeaksModel;

  private isPlayingProperty: BooleanProperty;

  private playingSpeedProperty: EnumerationProperty<TimeSpeed>;

  private secondsUntilNextUpdate: number;

  private histogram: PopulationHistogram;

  private labelValueProperty: StringProperty;

  public constructor( model: BirdBeaksModel, providedOptions: BirdBeaksScreenViewOptions ) {

    const options = optionize<BirdBeaksScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      // add default values for optional SelfOptions here

      // add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    this.model = model;
    this.isPlayingProperty = new BooleanProperty( true );
    this.playingSpeedProperty = new EnumerationProperty( TimeSpeed.SLOW );
    this.secondsUntilNextUpdate = 0;

    this.labelValueProperty = new StringProperty( '' );
    const label = new StringDisplay( this.labelValueProperty, {
      top: this.layoutBounds.minY + PopulationEvolutionConstants.SCREEN_VIEW_Y_MARGIN,
      centerX: this.layoutBounds.centerX
    } );
    this.addChild( label );

    model.phaseProperty.link( phase => {
      switch( phase ) {
        case PopulationPhase.SURVIVAL: {
          this.labelValueProperty.value = 'Survival phase';
          break;
        }
        case PopulationPhase.MATE_FINDING: {
          this.labelValueProperty.value = 'Mate-finding phase';
          break;
        }
        case PopulationPhase.BREEDING: {
          this.labelValueProperty.value = 'Breeding phase';
          break;
        }
        default: {
          break;
        }
      }
    } );

    this.histogram = new PopulationHistogram( {
      minValue: 0.0,
      maxValue: 2.0,
      maxCount: 2000,
      numBars: 10,
      barGap: 10,
      histogramWidth: Math.floor( this.layoutBounds.width * 0.8 ),
      histogramHeight: Math.floor( this.layoutBounds.height * 0.6 )
    } );
    this.addChild( this.histogram );
    this.histogram.centerX = this.layoutBounds.centerX;
    this.histogram.top = this.layoutBounds.top + 200;

    model.survivalPhaseEmitter.addListener( ( alive, dead ) => {
      this.histogram.updateFromSurvivalPhase( alive, dead );
    } );

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
    const timeControlNode = new TimeControlNode( this.isPlayingProperty, {
      playPauseStepButtonOptions: {
        stepForwardButtonOptions: {
          listener: () => model.update()
        }
      },
      timeSpeedProperty: this.playingSpeedProperty,
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
    this.isPlayingProperty.reset();
    this.playingSpeedProperty.reset();
    this.secondsUntilNextUpdate = 0;
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    if ( !this.isPlayingProperty.value || ( this.secondsUntilNextUpdate -= dt ) > 0 ) {
      return;
    }

    this.secondsUntilNextUpdate = updateIntervalForTimeSpeed.get( this.playingSpeedProperty.value ) || 1.0;
    this.model.update();
  }
}

populationEvolution.register( 'BirdBeaksScreenView', BirdBeaksScreenView );