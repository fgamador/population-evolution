// Copyright 2024, University of Colorado Boulder

/**
 * Struct holding the outputs from each of the population phases.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import Bird from './Bird.js';
import populationEvolution from '../../populationEvolution.js';

export default class PopulationPhaseOutputs {

  public initial: Bird[] = [];
  public died: Bird[] = [];
  public mates: [ Bird, Bird ][] = [];
  public added: Bird[] = [];
}

populationEvolution.register( 'PopulationPhaseOutputs', PopulationPhaseOutputs );