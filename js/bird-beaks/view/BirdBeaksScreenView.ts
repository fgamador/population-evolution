/* eslint-disable copyright */

/**
 * The root view for the bird-beak evolution sim.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Bird from '../model/Bird.js';
import BirdBeaksModel from '../model/BirdBeaksModel.js';
import BirdPopulationHistogram from './BirdPopulationHistogram.js';
import BirdsControlPanel from './BirdsControlPanel.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Dialog from '../../../../sun/js/Dialog.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import { Font, HBox, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionConstants from '../../common/PopulationEvolutionConstants.js';
import PopulationEvolutionStrings from '../../PopulationEvolutionStrings.js';
import PopulationPhaseOutputValues from '../../common/model/PopulationPhaseOutputValues.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import SeedDistributionPlots from './SeedDistributionPlots.js';
import SeedsControlPanel from './SeedsControlPanel.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';

const MESSAGE_FONT = new PhetFont( 24 );

// Seconds to wait for next call to model.update.
const updateIntervalForTimeSpeed = new Map<TimeSpeed, number>( [
  [ TimeSpeed.SLOW, 8.0 ], // currently unused
  [ TimeSpeed.NORMAL, 4.0 ],
  [ TimeSpeed.FAST, 0.5 ]
] );

// todo move to constants file
const minBeakSize = 0.0;
const maxBeakSize = 20.0;
const numHistogramBars = 20;
const maxHistogramCount = 220;

type SelfOptions = EmptySelfOptions;
type BirdBeaksScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class BirdBeaksScreenView extends ScreenView {

  private readonly isPlayingProperty: BooleanProperty;

  private readonly playingSpeedProperty: EnumerationProperty<TimeSpeed>;

  private secondsUntilNextUpdate: number;

  private readonly histogram: BirdPopulationHistogram;

  private seedDistributions: SeedDistributionPlots;

  public constructor( private readonly model: BirdBeaksModel, providedOptions: BirdBeaksScreenViewOptions ) {

    const options = optionize<BirdBeaksScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
    }, providedOptions );

    super( options );

    this.isPlayingProperty = new BooleanProperty( true );
    this.playingSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL );
    this.secondsUntilNextUpdate = 0;

    this.addChild( new HBox( {
      centerX: this.layoutBounds.centerX,
      top: this.layoutBounds.top + PopulationEvolutionConstants.SCREEN_VIEW_Y_MARGIN,
      children: [
        new VBox( {
          children: [
            this.histogram = new BirdPopulationHistogram( {
              layoutOptions: { align: 'right' },
              minValue: minBeakSize,
              maxValue: maxBeakSize,
              maxCount: maxHistogramCount,
              numBars: numHistogramBars,
              barWidthFraction: 0.9,
              histogramWidth: Math.floor( this.layoutBounds.width * 0.5 ),
              histogramHeight: Math.floor( this.layoutBounds.height * 0.45 )
            } ),
            this.seedDistributions = new SeedDistributionPlots( model.seeds, {
              layoutOptions: { align: 'right' },
              minValue: minBeakSize,
              maxValue: maxBeakSize,
              diagramWidth: Math.floor( this.layoutBounds.width * 0.5 ),
              diagramHeight: Math.floor( this.layoutBounds.height * 0.35 )
            } )
          ]
        } ),
        new VBox( {
          layoutOptions: { align: 'top', leftMargin: PopulationEvolutionConstants.SCREEN_VIEW_SPACING },
          children: [
            new BirdsControlPanel( model, {
              layoutOptions: { stretch: true }
            } ),
            new SeedsControlPanel( model, {
              layoutOptions: { stretch: true, topMargin: PopulationEvolutionConstants.SCREEN_VIEW_SPACING }
            } ),
            new HBox( {
              layoutOptions: { topMargin: PopulationEvolutionConstants.SCREEN_VIEW_SPACING },
              children: [
                new TimeControlNode( this.isPlayingProperty, {
                  playPauseStepButtonOptions: {
                    stepForwardButtonOptions: {
                      listener: () => this.singleStep()
                    }
                  },
                  timeSpeedProperty: this.playingSpeedProperty,
                  timeSpeeds: [ TimeSpeed.FAST, TimeSpeed.NORMAL ]
                } ),
                new ResetAllButton( {
                  layoutOptions: { leftMargin: 2 * PopulationEvolutionConstants.SCREEN_VIEW_SPACING },
                  listener: () => {
                    this.interruptSubtreeInput(); // cancel interactions that may be in progress
                    this.histogram.cancelAnimation();
                    model.reset();
                    this.reset();
                  }
                } )
              ]
            } )
          ]
        } )
      ]
    } ) );

    this.isPlayingProperty.link( value => {
      if ( !value ) {
        this.histogram.cancelAnimation();
        this.secondsUntilNextUpdate = 0;
      }
    } );

    this.playingSpeedProperty.link( value => {
      if ( value === TimeSpeed.FAST ) {
        this.histogram.cancelAnimation();
        this.secondsUntilNextUpdate = 0;
      }
    } );
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
    this.updateModelAndHistogram();
    if ( this.model.population.individuals.length === 0 ) {
      this.extinct();
    }
  }

  private extinct(): void {
    this.isPlayingProperty.set( false );
    new Dialog( new Node( {} ), {
      titleAlign: 'center',
      isModal: true,
      title: new Text( PopulationEvolutionStrings.extinctionMessageStringProperty, { font: new Font( { size: 32 } ) } )
    } ).show();
  }

  private singleStep(): void {
    this.histogram.cancelAnimation();
    this.updateModelAndHistogram();
  }

  private updateModelAndHistogram(): void {
    const phaseOutputs = this.model.update();
    this.histogram.update( new PopulationPhaseOutputValues<Bird>( phaseOutputs, bird => bird.beakSize ), this.playingSpeedProperty.value );
  }
}

populationEvolution.register( 'BirdBeaksScreenView', BirdBeaksScreenView );