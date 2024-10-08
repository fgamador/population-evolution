/* eslint-disable copyright */

/**
 * Defines the colors for this sim.
 *
 * All simulations should have a Colors.js file, see https://github.com/phetsims/scenery-phet/issues/642.
 *
 * For static colors that are used in more than one place, add them here.
 *
 * For dynamic colors that can be controlled via colorProfileProperty.js, add instances of ProfileColorProperty here,
 * each of which is required to have a default color. Note that dynamic colors can be edited by running the sim from
 * phetmarks using the "Color Edit" mode.
 *
 * @author Franz Amador
 */

import { ProfileColorProperty } from '../../../scenery/js/imports.js';
import populationEvolution from '../populationEvolution.js';

const PopulationEvolutionColors = {
  histogramBarMainColorProperty: new ProfileColorProperty( populationEvolution, 'histogramBarMain', {
    default: 'rgb( 90, 90, 90 )'
  } ),

  histogramBarDiedColorProperty: new ProfileColorProperty( populationEvolution, 'histogramBarDead', {
    default: 'rgb( 255, 100, 100 )'
  } ),

  histogramBarAddedColorProperty: new ProfileColorProperty( populationEvolution, 'histogramBarNew', {
    default: 'rgb( 100, 200, 100 )'
  } ),

  // Background color for screens in this sim
  screenBackgroundColorProperty: new ProfileColorProperty( populationEvolution, 'background', {
    default: 'lightgrey'
  } )
};

populationEvolution.register( 'PopulationEvolutionColors', PopulationEvolutionColors );
export default PopulationEvolutionColors;