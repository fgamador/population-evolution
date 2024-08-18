// Copyright 2024, University of Colorado Boulder

/**
 * One bar in the population histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Animation from '../../../../twixt/js/Animation.js';
import AnimationSequence from '../../common/view/AnimationSequence.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionColors from '../../common/PopulationEvolutionColors.js';
import { Rectangle } from '../../../../scenery/js/imports.js';

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
  }

  // todo So far this handles just the TimeSpeed.SLOW case, so the animations
  // must fit within the time alloted in BirdScreenView's updateIntervalForTimeSpeed.
  public update( initialCount: number, diedCount: number, addedCount: number ): void {
    this.mainRect.rectHeightFromBottom = initialCount * this.pixelsPerCount;
    this.mainRect.opacity = 1.0;

    const survivedCount = initialCount - diedCount;
    this.finalCount = survivedCount + addedCount;

    this.animation = new AnimationSequence( [
      this.fadeInDiedRect( diedCount, 1.0 ),
      this.shrinkDiedAndMainRects( survivedCount, 1.0 ),
      this.growAddedAndMainRects( survivedCount, addedCount, 1.0 ),
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
    this.mainRect.rectHeightFromBottom = this.finalCount * this.pixelsPerCount;
    this.diedRect.opacity = 0;
    this.addedRect.opacity = 0;
  }
}

populationEvolution.register( 'PopulationHistogramBar', PopulationHistogramBar );