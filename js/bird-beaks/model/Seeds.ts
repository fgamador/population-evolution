// Copyright 2024, University of Colorado Boulder

/**
 * A collection of various types of seeds, each with normally distributed sizes.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';
import SeedDistribution from './SeedDistribution.js';

export default class Seeds {

  private distributions: SeedDistribution[] = [];

  public constructor( distributions: SeedDistribution[] ) {
    this.distributions = distributions;
  }

  public addDistribution( distribution: SeedDistribution ): void {
    this.distributions.push( distribution );
  }

  public getDistribution( index: number ): SeedDistribution {
    return this.distributions[ index ];
  }

  public numDistributions(): number {
    return this.distributions.length;
  }

  public abundance( seedSize: number ): number {
    return this.distributions
      .map( dist => dist.abundance( seedSize ) )
      .reduce( ( sum, value ) => sum + value, 0 );
  }
}

populationEvolution.register( 'Seeds', Seeds );