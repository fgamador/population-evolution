// Copyright 2024, University of Colorado Boulder

/**
 * A normally distributed collection of seeds for the birds to eat.
 *
 * @author Franz Amador (open-source contributor)
 */

import NormalDistribution from '../../common/model/NormalDistribution.js';
import populationEvolution from '../../populationEvolution.js';

export default class SeedDistribution {

  public distribution: NormalDistribution;

  public abundanceFactor: number;

  public constructor( sizeMean: number, sizeStdDev: number, abundanceFactor: number ) {
    this.distribution = new NormalDistribution( sizeMean, sizeStdDev );
    this.abundanceFactor = abundanceFactor;
  }

  public setSizeMean( value: number ): void {
    this.distribution.setMean( value );
  }

  public setSizeStdDev( value: number ): void {
    this.distribution.setStdDev( value );
  }

  public setAbundanceFactor( value: number ): void {
    this.abundanceFactor = value;
  }

  // A truly egregious abuse of the concept of probability density. Converts the probability density
  // at a specific seed size into a vaguely defined "abundance" of seeds near the specified size.
  public abundance( seedSize: number ): number {
    return this.abundanceFactor * this.distribution.probabilityDensity( seedSize );
  }
}

populationEvolution.register( 'SeedDistribution', SeedDistribution );