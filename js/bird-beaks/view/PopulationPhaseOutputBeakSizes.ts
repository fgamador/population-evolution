// Copyright 2024, University of Colorado Boulder

/**
 * Struct holding the outputs from each of the population phases.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';

export default class PopulationPhaseOutputBeakSizes {

  public initial: number[] = [];
  public died: number[] = [];
  public mates: [ number, number ][] = [];
  public added: number[] = [];
}

populationEvolution.register( 'PopulationPhaseOutputBeakSizes', PopulationPhaseOutputBeakSizes );