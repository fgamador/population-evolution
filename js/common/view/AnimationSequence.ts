/* eslint-disable copyright */

/**
 * A sequence of consecutive animations that can be stopped,
 * which is not easy to do with animations chained by Animation.next().
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import Animation from '../../../../twixt/js/Animation.js';
import populationEvolution from '../../populationEvolution.js';

export default class AnimationSequence {

  private animations: Animation[] = [];

  private next = 0;

  private current: Animation | null = null;

  public constructor( animations: Animation[] ) {

    for ( const animation of animations ) {
      this.add( animation );
    }
  }

  private add( animation: Animation ): void {
    this.animations.push( animation );
    animation.finishEmitter.addListener( dt => this.startNext() );
  }

  private startNext(): void {
    if ( this.next < this.animations.length ) {
      this.current = this.animations[ this.next++ ];
      this.current.start();
    }
  }

  public start(): void {
    if ( this.current ) {
      this.current.start();
    }
    else {
      this.startNext();
    }
  }

  public stop(): void {
    this.current?.stop();
  }
}

populationEvolution.register( 'AnimationSequence', AnimationSequence );