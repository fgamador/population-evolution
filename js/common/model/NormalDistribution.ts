// Copyright 2024, University of Colorado Boulder

/**
 * @author Franz Amador <franzamador@gmail.com>
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import populationEvolution from '../../populationEvolution.js';

export default class NormalDistribution {

  public readonly meanProperty: NumberProperty;

  public readonly stdDevProperty: NumberProperty;

  private variance = 0;

  private twiceVariance = 0;

  private pdCoefficient = 0;

  public constructor( mean: number, stdDev: number ) {
    this.meanProperty = new NumberProperty( mean );
    this.stdDevProperty = new NumberProperty( stdDev );

    this.meanProperty.link( value => this.updateConstants() );
    this.stdDevProperty.link( value => this.updateConstants() );
  }

  // https://en.wikipedia.org/wiki/Normal_distribution
  public probabilityDensity( x: number ): number {
    const offsetFromMean = x - this.meanProperty.value;
    return this.pdCoefficient * Math.exp( -( offsetFromMean * offsetFromMean ) / this.twiceVariance );
  }

  private updateConstants(): void {
    this.variance = this.stdDevProperty.value * this.stdDevProperty.value;
    this.twiceVariance = 2 * this.variance;
    this.pdCoefficient = 1 / Math.sqrt( 2 * Math.PI * this.variance );
  }
}

populationEvolution.register( 'NormalDistribution', NormalDistribution );