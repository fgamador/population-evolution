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
  maxCount: number;
  barWidth: number;
  barHeight: number;
};

export type PopulationHistogramBarOptions = SelfOptions & NodeOptions;

export default class PopulationHistogramBar extends Node {

  private pixelsPerCount: number;

  private countRect: Rectangle;

  private deadRect: Rectangle;

  private newRect: Rectangle;

  public constructor( providedOptions: PopulationHistogramBarOptions ) {

    const options = optionize<PopulationHistogramBarOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    this.pixelsPerCount = options.barHeight / options.maxCount;

    this.countRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarMainColorProperty, opacity: 0 } );
    this.addChild( this.countRect );

    this.deadRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarDeadColorProperty, opacity: 0 } );
    this.addChild( this.deadRect );

    this.newRect = new Rectangle( 0, 0, options.barWidth, options.barHeight,
      { fill: PopulationEvolutionColors.histogramBarNewColorProperty, opacity: 0 } );
    this.addChild( this.newRect );
  }

  // todo So far this handles just the TimeSpeed.SLOW case, so the animations
  // must fit within the time alloted in BirdScreenView's updateIntervalForTimeSpeed.
  public updateFromSurvivalPhase( aliveCount: number, deadCount: number ): void {
    this.countRect.rectHeightFromBottom = ( aliveCount + deadCount ) * this.pixelsPerCount;
    this.countRect.opacity = 1.0;
    this.deadRect.opacity = 0.0;
    this.deadRect.rectHeightFromBottom = deadCount * this.pixelsPerCount;

    const fadeInDeadRect = new Animation( {
      object: this.deadRect,
      attribute: 'opacity',
      from: 0.0,
      to: 1.0,
      duration: 1.0
    } );

    // explicit types for Animation generic to keep eslint happy until inference is fixed
    const shrinkDeadAndCountRects = new Animation<unknown, unknown, [ number, number ], [ Rectangle, Rectangle ]>( {
      targets: [ {
        object: this.deadRect,
        attribute: 'rectHeightFromBottom',
        from: this.deadRect.height,
        to: 0.0
      },
      {
        object: this.countRect,
        attribute: 'rectHeightFromBottom',
        from: this.countRect.height,
        to: aliveCount * this.pixelsPerCount
      } ],
      duration: 1.0
    } );

    fadeInDeadRect.then( shrinkDeadAndCountRects );
    fadeInDeadRect.start();
  }

  // todo So far this handles just the TimeSpeed.SLOW case, so the animations
  // must fit within the time alloted in BirdScreenView's updateIntervalForTimeSpeed.
  public updateFromBreedingPhase( matedCount: number, newCount: number ): void {
    this.newRect.bottom = this.countRect.top;
    this.newRect.rectHeightFromBottom = 0;
    this.newRect.opacity = 1.0;

    // explicit types for Animation generic to keep eslint happy until type inference is fixed
    const growNewAndCountRects = new Animation<unknown, unknown, [ number, number ], [ Rectangle, Rectangle ]>( {
      targets: [ {
        object: this.newRect,
        attribute: 'rectHeightFromBottom',
        from: 0,
        to: newCount * this.pixelsPerCount
      },
      {
        object: this.countRect,
        attribute: 'rectHeightFromBottom',
        from: this.countRect.height,
        to: this.countRect.height + newCount * this.pixelsPerCount
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

    growNewAndCountRects.then( fadeOutNewRect );
    growNewAndCountRects.start();
  }
}

populationEvolution.register( 'PopulationHistogramBar', PopulationHistogramBar );