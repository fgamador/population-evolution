/* eslint-disable copyright */

/**
 * Constants used throughout this simulation.
 *
 * @author Franz Amador
 */

import populationEvolution from '../populationEvolution.js';

const PopulationEvolutionConstants = {

  BIRD_INITIAL_COUNT: 550,
  BIRD_INITIAL_BEAK_SIZE_MEAN: 4.0,
  BIRD_INITIAL_BEAK_SIZE_STDEV: 2.0,

  BIRD_MATE_FINDING_PHASE_ROUNDS: 3,

  BIRD_NICHE_SIZE: 1.0,

  BIRD_SEED1_SIZE_MEAN: 4.0,
  BIRD_SEED1_SIZE_STDEV: 1.0,
  BIRD_SEED1_SIZE_ABUNDANCE: 2000.0,

  BIRD_SEED2_SIZE_MEAN: 10.0,
  BIRD_SEED2_SIZE_STDEV: 1.0,
  BIRD_SEED2_SIZE_ABUNDANCE: 1000.0,

  BIRD_SEED3_SIZE_MEAN: 16.0,
  BIRD_SEED3_SIZE_STDEV: 1.0,
  BIRD_SEED3_SIZE_ABUNDANCE: 1000.0,

  SCREEN_VIEW_SPACING: 20,
  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15
};

populationEvolution.register( 'PopulationEvolutionConstants', PopulationEvolutionConstants );
export default PopulationEvolutionConstants;