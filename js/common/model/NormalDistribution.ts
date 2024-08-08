// Copyright 2024, University of Colorado Boulder

/**
 * @author Franz Amador <franzamador@gmail.com>
 */

import populationEvolution from '../../populationEvolution.js';

export default class NormalDistribution {

  public mean: number;

  public stdDev: number;

  private variance = 0;

  private twiceVariance = 0;

  private pdCoefficient = 0;

  public constructor( mean: number, stdDev: number ) {
    this.mean = mean;
    this.stdDev = stdDev;
    this.updateConstants();
  }

  public setMean( value: number ): void {
    this.mean = value;
    this.updateConstants();
  }

  public setStdDev( value: number ): void {
    this.stdDev = value;
    this.updateConstants();
  }

  private updateConstants(): void {
    this.variance = this.stdDev * this.stdDev;
    this.twiceVariance = 2 * this.variance;
    this.pdCoefficient = 1 / Math.sqrt( 2 * Math.PI * this.variance );
  }

  // https://en.wikipedia.org/wiki/Normal_distribution
  public probabilityDensity( x: number ): number {
    const offsetFromMean = x - this.mean;
    return this.pdCoefficient * Math.exp( -( offsetFromMean * offsetFromMean ) / this.twiceVariance );
  }
}

populationEvolution.register( 'NormalDistribution', NormalDistribution );