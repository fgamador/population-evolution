/* eslint-disable copyright */

/**
 * One bar in the population histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Animation from '../../../../twixt/js/Animation.js';
import AnimationSequence from './AnimationSequence.js';
import { Node, NodeOptions, Rectangle } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionColors from '../PopulationEvolutionColors.js';
import { PopulationPhaseOutputValuesBin } from '../model/BinnedPopulationPhaseOutputValues.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';

type SelfOptions = {
  barWidth: number;
  barHeight: number;
  pixelsPerCount: number;
};

export type PopulationHistogramBarOptions = SelfOptions & NodeOptions;

export default class PopulationHistogramBar extends Node {

  private pixelsPerCount: number;

  private mainRect: Rectangle;

  private diedRect: Rectangle;

  private addedRect: Rectangle;

  private animation: AnimationSequence | null = null;

  private finalCount = 0;

  public constructor( providedOptions: PopulationHistogramBarOptions ) {

    const options = optionize<PopulationHistogramBarOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    this.pixelsPerCount = options.pixelsPerCount;

    this.mainRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarMainColorProperty, opacity: 0 } );
    this.addChild( this.mainRect );

    this.diedRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarDiedColorProperty, opacity: 0 } );
    this.addChild( this.diedRect );

    this.addedRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarAddedColorProperty, opacity: 0 } );
    this.addChild( this.addedRect );
  }

  public setPixelsPerCount( value: number ): void {
    this.pixelsPerCount = value;
    this.jumpToEnd();
  }

  public update( bin: PopulationPhaseOutputValuesBin, playingSpeed: TimeSpeed ): void {
    this.mainRect.rectHeightFromBottom = bin.initialCount * this.pixelsPerCount;
    this.mainRect.opacity = 1.0;

    this.finalCount = bin.initialCount - bin.diedCount + bin.addedCount;

    switch ( playingSpeed ) {
      case TimeSpeed.FAST: {
        this.jumpToEnd();
        break;
      }
      case TimeSpeed.NORMAL: {
        this.startNormalAnimation( bin );
        break;
      }
      default: {
        this.startNormalAnimation( bin );
        break;
      }
    }
  }

  private startNormalAnimation( bin: PopulationPhaseOutputValuesBin ): void {
    const survivedCount = bin.initialCount - bin.diedCount;
    // Animations must fit within the time alloted in BirdBeaksScreenView's
    // updateIntervalForTimeSpeed for TimeSpeed.NORMAL.
    this.animation = new AnimationSequence( [
      this.fadeInDiedRect( bin.diedCount, 1.0 ),
      this.shrinkDiedAndMainRects( survivedCount, 1.0 ),
      this.growAddedAndMainRects( survivedCount, bin.addedCount, 1.0 ),
      this.fadeOutAddedRect( 1.0 )
    ] );
    this.animation.start();
  }

  private fadeInDiedRect( diedCount: number, duration: number ): Animation {
    this.diedRect.opacity = 0.0;
    this.diedRect.rectHeightFromBottom = diedCount * this.pixelsPerCount;

    return new Animation( {
      object: this.diedRect,
      attribute: 'opacity',
      from: 0.0,
      to: 1.0,
      duration: duration
    } );
  }

  private shrinkDiedAndMainRects( survivedCount: number, duration: number ): Animation {
    // explicit types for Animation generic to keep eslint happy until inference is fixed
    return new Animation<unknown, unknown, [ number, number ], [ Rectangle, Rectangle ]>( {
      targets: [ {
        object: this.diedRect,
        attribute: 'rectHeightFromBottom',
        from: this.diedRect.height,
        to: 0.0
      },
      {
        object: this.mainRect,
        attribute: 'rectHeightFromBottom',
        from: this.mainRect.height,
        to: survivedCount * this.pixelsPerCount
      } ],
      duration: duration
    } );
  }

  private growAddedAndMainRects( survivedCount: number, addedCount: number, duration: number ): Animation {
    const mainRectStartHeight = survivedCount * this.pixelsPerCount;
    const addedRectEndHeight = addedCount * this.pixelsPerCount;

    this.addedRect.bottom = this.bottom - mainRectStartHeight;
    this.addedRect.rectHeightFromBottom = 0;
    this.addedRect.opacity = 1.0;

    // explicit types for Animation generic to keep eslint happy until type inference is fixed
    return new Animation<unknown, unknown, [ number, number ], [ Rectangle, Rectangle ]>( {
      targets: [ {
        object: this.addedRect,
        attribute: 'rectHeightFromBottom',
        from: 0,
        to: addedRectEndHeight
      },
      {
        object: this.mainRect,
        attribute: 'rectHeightFromBottom',
        from: mainRectStartHeight,
        to: mainRectStartHeight + addedRectEndHeight
      } ],
      duration: duration
    } );
  }

  private fadeOutAddedRect( duration: number ): Animation {
    return new Animation( {
      object: this.addedRect,
      attribute: 'opacity',
      from: 1.0,
      to: 0.0,
      duration: duration
    } );
  }

  public cancelAnimation(): void {
    this.animation?.stop();
    this.diedRect.opacity = 0;
    this.addedRect.opacity = 0;
    this.jumpToEnd();
  }

  private jumpToEnd(): void {
    this.mainRect.rectHeightFromBottom = this.finalCount * this.pixelsPerCount;
  }
}

populationEvolution.register( 'PopulationHistogramBar', PopulationHistogramBar );