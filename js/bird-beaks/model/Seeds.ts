// Copyright 2024, University of Colorado Boulder

/**
 * A normally distributed collection of seeds for the birds to eat. Provides a way to get
 * the probability of finding seeds of approximately a particular size.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';
import SeedDistribution from './SeedDistribution.js';

export default class Seeds {

  public distributions: SeedDistribution[] = [];

  // public readonly maxProbability: number;

  public constructor( distribution: SeedDistribution ) {
    this.addDistribution( distribution );
  }

  public addDistribution( distribution: SeedDistribution ): void {
    this.distributions.push( distribution );
  }

  // A truly egregious abuse of the concept of probability density. Approximates
  // the probability of finding seeds "near" the specified size.
  public sizeProbability( seedSize: number ): number {
    // const probabilities = this.distributions.map( dist => dist.sizeProbability( seedSize ) );
    return 0; // todo
  }
}

populationEvolution.register( 'Seeds', Seeds );