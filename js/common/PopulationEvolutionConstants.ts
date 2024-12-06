/* eslint-disable copyright */

/**
 * Constants used throughout this simulation.
 *
 * @author Franz Amador
 */

import populationEvolution from '../populationEvolution.js';

const PopulationEvolutionConstants = {

  BIRD_INITIAL_COUNT: 1000,
  BIRD_INITIAL_BEAK_SIZE_MEAN: 10,
  BIRD_INITIAL_BEAK_SIZE_STDEV: 5,
  BIRD_NICHE_SIZE: 1,
  SCREEN_VIEW_SPACING: 20,
  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15
};

populationEvolution.register( 'PopulationEvolutionConstants', PopulationEvolutionConstants );
export default PopulationEvolutionConstants;