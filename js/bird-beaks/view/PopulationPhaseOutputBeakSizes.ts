// Copyright 2024, University of Colorado Boulder

/**
 * Struct holding the outputs from each of the population phases.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';
import Bird from '../model/Bird.js';
import PopulationPhaseOutputs from '../model/PopulationPhaseOutputs.js';

export default class PopulationPhaseOutputBeakSizes {

  public initial: number[];
  public died: number[];
  public added: number[];

  public constructor( phaseOutputs: PopulationPhaseOutputs ) {
    this.initial = birdsToBeakSizes( phaseOutputs.initial );
    this.died = birdsToBeakSizes( phaseOutputs.died );
    this.added = birdsToBeakSizes( phaseOutputs.added );
  }
}

function birdsToBeakSizes( birds: Bird[] ): number[] {
  return birds.map( bird => bird.beakSize );
}

populationEvolution.register( 'PopulationPhaseOutputBeakSizes', PopulationPhaseOutputBeakSizes );