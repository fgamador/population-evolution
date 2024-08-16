// Copyright 2024, University of Colorado Boulder

/**
 * One bar from the population histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import Animation from '../../../../twixt/js/Animation.js';
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

  public constructor( providedOptions: PopulationHistogramBarOptions ) {

    const options = optionize<PopulationHistogramBarOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    this.pixelsPerCount = options.pixelsPerCount;

    this.mainRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarMainColorProperty, opacity: 0 } );
    this.addChild( this.mainRect );

    this.diedRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarDeadColorProperty, opacity: 0 } );
    this.addChild( this.diedRect );

    this.addedRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarNewColorProperty, opacity: 0 } );
    this.addChild( this.addedRect );
  }

  public setPixelsPerCount( value: number ): void {
    this.pixelsPerCount = value;
  }

  public update( initial: number, died: number, mates: number, added: number ): void {
    this.mainRect.rectHeightFromBottom = initial * this.pixelsPerCount;
    this.mainRect.opacity = 1.0;

    const survived = initial - died;

    const fadeInDiedRect = this.fadeInDiedRect( died );
    fadeInDiedRect
      .then( this.shrinkDiedAndMainRects( survived ) )
      .then( this.growAddedAndMainRects( survived, added ) )
      .then( this.fadeOutAddedRect() );
    fadeInDiedRect.start();
  }

  private fadeInDiedRect( deadCount: number ): Animation {
    this.diedRect.opacity = 0.0;
    this.diedRect.rectHeightFromBottom = deadCount * this.pixelsPerCount;

    return new Animation( {
      object: this.diedRect,
      attribute: 'opacity',
      from: 0.0,
      to: 1.0,
      duration: 1.0
    } );
  }

  private shrinkDiedAndMainRects( survivorCount: number ): Animation {
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
        to: survivorCount * this.pixelsPerCount
      } ],
      duration: 1.0
    } );
  }

  private growAddedAndMainRects( survivorCount: number, addedCount: number ): Animation {
    const mainRectStartHeight = survivorCount * this.pixelsPerCount;
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
      duration: 1.0
    } );
  }

  private fadeOutAddedRect(): Animation {
    return new Animation( {
      object: this.addedRect,
      attribute: 'opacity',
      from: 1.0,
      to: 0.0,
      duration: 1.0
    } );
  }

  // todo So far this handles just the TimeSpeed.SLOW case, so the animations
  // must fit within the time alloted in BirdScreenView's updateIntervalForTimeSpeed.
  public updateFromSurvivalPhase( aliveCount: number, deadCount: number ): void {
    this.mainRect.rectHeightFromBottom = ( aliveCount + deadCount ) * this.pixelsPerCount;
    this.mainRect.opacity = 1.0;

    const fadeInDeadRect = this.fadeInDiedRect( deadCount );
    const shrinkDeadAndMainRects = this.shrinkDiedAndMainRects( aliveCount );

    fadeInDeadRect.then( shrinkDeadAndMainRects );
    fadeInDeadRect.start();
  }

  // todo So far this handles just the TimeSpeed.SLOW case, so the animations
  // must fit within the time alloted in BirdScreenView's updateIntervalForTimeSpeed.
  public updateFromBreedingPhase( matedCount: number, newCount: number ): void {
    const growNewAndMainRects = this.growNewAndMainRects_old( newCount );
    const fadeOutNewRect = this.fadeOutAddedRect();

    growNewAndMainRects.then( fadeOutNewRect );
    growNewAndMainRects.start();
  }

  private growNewAndMainRects_old( addedCount: number ): Animation {
    this.addedRect.bottom = this.mainRect.top;
    this.addedRect.rectHeightFromBottom = 0;
    this.addedRect.opacity = 1.0;

    // explicit types for Animation generic to keep eslint happy until type inference is fixed
    return new Animation<unknown, unknown, [ number, number ], [ Rectangle, Rectangle ]>( {
      targets: [ {
        object: this.addedRect,
        attribute: 'rectHeightFromBottom',
        from: 0,
        to: addedCount * this.pixelsPerCount
      },
      {
        object: this.mainRect,
        attribute: 'rectHeightFromBottom',
        from: this.mainRect.height,
        to: this.mainRect.height + addedCount * this.pixelsPerCount
      } ],
      duration: 1.0
    } );
  }
}

populationEvolution.register( 'PopulationHistogramBar', PopulationHistogramBar );