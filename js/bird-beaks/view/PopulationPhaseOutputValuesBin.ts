// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';

export default class PopulationPhaseOutputValuesBin {

  public readonly initialCount: number;
  public readonly diedCount: number;
  public readonly addedCount: number;

  public constructor( initialCount: number, diedCount: number, addedCount: number ) {

    this.initialCount = initialCount;
    this.diedCount = diedCount;
    this.addedCount = addedCount;
  }
}

populationEvolution.register( 'PopulationPhaseOutputValuesBin', PopulationPhaseOutputValuesBin );