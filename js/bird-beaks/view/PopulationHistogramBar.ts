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

  private deadRect: Rectangle;

  private newRect: Rectangle;

  public constructor( providedOptions: PopulationHistogramBarOptions ) {

    const options = optionize<PopulationHistogramBarOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    this.pixelsPerCount = options.pixelsPerCount;

    this.mainRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarMainColorProperty, opacity: 0 } );
    this.addChild( this.mainRect );

    this.deadRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarDeadColorProperty, opacity: 0 } );
    this.addChild( this.deadRect );

    this.newRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarNewColorProperty, opacity: 0 } );
    this.addChild( this.newRect );
  }

  public setPixelsPerCount( value: number ): void {
    this.pixelsPerCount = value;
  }

  public update( initial: number, died: number, mates: number, added: number ): void {
    this.mainRect.rectHeightFromBottom = ( initial ) * this.pixelsPerCount;
    this.mainRect.opacity = 1.0;

    const fadeInDeadRect = this.fadeInDeadRect( died );
    const shrinkDeadAndMainRects = this.shrinkDeadAndMainRects( initial - died );

    // todo

    fadeInDeadRect.then( shrinkDeadAndMainRects );
    fadeInDeadRect.start();
  }

  private fadeInDeadRect( deadCount: number ): Animation {
    this.deadRect.opacity = 0.0;
    this.deadRect.rectHeightFromBottom = deadCount * this.pixelsPerCount;

    return new Animation( {
      object: this.deadRect,
      attribute: 'opacity',
      from: 0.0,
      to: 1.0,
      duration: 1.0
    } );
  }

  private shrinkDeadAndMainRects( survivorCount: number ): Animation {
    // explicit types for Animation generic to keep eslint happy until inference is fixed
    return new Animation<unknown, unknown, [ number, number ], [ Rectangle, Rectangle ]>( {
      targets: [ {
        object: this.deadRect,
        attribute: 'rectHeightFromBottom',
        from: this.deadRect.height,
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

  // todo So far this handles just the TimeSpeed.SLOW case, so the animations
  // must fit within the time alloted in BirdScreenView's updateIntervalForTimeSpeed.
  public updateFromSurvivalPhase( aliveCount: number, deadCount: number ): void {
    this.mainRect.rectHeightFromBottom = ( aliveCount + deadCount ) * this.pixelsPerCount;
    this.mainRect.opacity = 1.0;

    const fadeInDeadRect = this.fadeInDeadRect( deadCount );
    const shrinkDeadAndMainRects = this.shrinkDeadAndMainRects( aliveCount );

    fadeInDeadRect.then( shrinkDeadAndMainRects );
    fadeInDeadRect.start();
  }

  // todo So far this handles just the TimeSpeed.SLOW case, so the animations
  // must fit within the time alloted in BirdScreenView's updateIntervalForTimeSpeed.
  public updateFromBreedingPhase( matedCount: number, newCount: number ): void {
    this.newRect.bottom = this.mainRect.top;
    this.newRect.rectHeightFromBottom = 0;
    this.newRect.opacity = 1.0;

    // explicit types for Animation generic to keep eslint happy until type inference is fixed
    const growNewAndMainRects = new Animation<unknown, unknown, [ number, number ], [ Rectangle, Rectangle ]>( {
      targets: [ {
        object: this.newRect,
        attribute: 'rectHeightFromBottom',
        from: 0,
        to: newCount * this.pixelsPerCount
      },
      {
        object: this.mainRect,
        attribute: 'rectHeightFromBottom',
        from: this.mainRect.height,
        to: this.mainRect.height + newCount * this.pixelsPerCount
      } ],
      duration: 1.0
    } );

    const fadeOutNewRect = new Animation( {
      object: this.newRect,
      attribute: 'opacity',
      from: 1.0,
      to: 0.0,
      duration: 1.0
    } );

    growNewAndMainRects.then( fadeOutNewRect );
    growNewAndMainRects.start();
  }
}

populationEvolution.register( 'PopulationHistogramBar', PopulationHistogramBar );