// Copyright 2024, University of Colorado Boulder

/**
 * A normally distributed collection of seeds for the birds to eat. Provides a way to get
 * the probability of finding seeds of approximately a particular size.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';

export default class SeedDistribution {

  public sizeMean: number;

  public sizeStdDev: number;

  public readonly maxProbability: number;

  private sizeVariance = 0;

  private twiceSizeVariance = 0;

  private pdCoefficient = 0;

  private probabilityHack = 0;

  public constructor( sizeMean: number, sizeStdDev: number, maxProbability: number ) {
    this.sizeMean = sizeMean;
    this.sizeStdDev = sizeStdDev;
    this.maxProbability = maxProbability;
    this.updateConstants();
  }

  public setSizeMean( value: number ): void {
    this.sizeMean = value;
    this.updateConstants();
  }

  public setSizeStdDev( value: number ): void {
    this.sizeStdDev = value;
    this.updateConstants();
  }

  private updateConstants(): void {
    this.sizeVariance = this.sizeStdDev * this.sizeStdDev;
    this.twiceSizeVariance = 2 * this.sizeVariance;
    this.pdCoefficient = 1 / Math.sqrt( 2 * Math.PI * this.sizeVariance );
    this.probabilityHack = this.maxProbability / this.sizeProbability( this.sizeMean );
  }

  // A truly egregious abuse of the concept of probability density. Approximates
  // the probability of finding seeds "near" the specified size.
  public sizeProbability( seedSize: number ): number {
    return this.probabilityHack * this.sizeProbabilityDensity( seedSize );
  }

  // https://en.wikipedia.org/wiki/Normal_distribution
  public sizeProbabilityDensity( seedSize: number ): number {
    const offsetFromMean = seedSize - this.sizeMean;
    return this.pdCoefficient * Math.exp( -( offsetFromMean * offsetFromMean ) / this.twiceSizeVariance );
  }
}

populationEvolution.register( 'SeedDistribution', SeedDistribution );