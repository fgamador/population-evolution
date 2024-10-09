/* eslint-disable copyright */

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Franz Amador
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import populationEvolution from '../populationEvolution.js';

const SCHEMA_MAP = {
  //TODO add schemas for query parameters
};

const PopulationEvolutionQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

// The schema map is a read-only part of the public API, in case schema details (e.g. validValues) are needed elsewhere.
PopulationEvolutionQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

populationEvolution.register( 'PopulationEvolutionQueryParameters', PopulationEvolutionQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.populationEvolution.PopulationEvolutionQueryParameters' );

export default PopulationEvolutionQueryParameters;