/**
 * Phase is an enumeration of population phases.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import populationEvolution from '../../populationEvolution.js';

export default class PopulationPhase extends EnumerationValue {

  public static readonly SURVIVAL = new PopulationPhase();
  public static readonly MATE_FINDING = new PopulationPhase();
  public static readonly BREEDING = new PopulationPhase();

  // Gets a list of keys, values and mapping between them. For use in EnumerationProperty and PhET-iO
  public static readonly enumeration = new Enumeration( PopulationPhase );
}

populationEvolution.register( 'Phase', PopulationPhase );