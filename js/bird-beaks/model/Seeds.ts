// Copyright 2024, University of Colorado Boulder

/**
 * A collection of various types of seeds, each with normally distributed sizes.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';
import SeedDistribution from './SeedDistribution.js';

export default class Seeds {

  public distributions: SeedDistribution[] = [];

  public constructor( distribution: SeedDistribution ) {
    this.addDistribution( distribution );
  }

  public addDistribution( distribution: SeedDistribution ): void {
    this.distributions.push( distribution );
  }

  public abundance( seedSize: number ): number {
    return this.distributions
      .map( dist => dist.abundance( seedSize ) )
      .reduce( ( sum, value ) => sum + value, 0 );
  }
}

populationEvolution.register( 'Seeds', Seeds );