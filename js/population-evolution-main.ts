/**
 * Main entry point for the sim.
 *
 * @author Franz Amador
 */

import BirdBeaksScreen from './bird-beaks2/BirdBeaksScreen.js';
import PopulationEvolutionStrings from './PopulationEvolutionStrings.js';
import './common/PopulationEvolutionQueryParameters.js';
import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';

// Launch the sim. Beware that scenery Image nodes created outside simLauncher.launch() will have zero bounds
// until the images are fully loaded. See https://github.com/phetsims/coulombs-law/issues/70#issuecomment-429037461
simLauncher.launch( () => {

  const titleStringProperty = PopulationEvolutionStrings[ 'population-evolution' ].titleStringProperty;

  const screens = [
    new BirdBeaksScreen( { tandem: Tandem.ROOT.createTandem( 'birdBeaksScreen' ) } )
  ];

  const options: SimOptions = {
    credits: {
      leadDesign: 'Franz Amador',
      softwareDevelopment: 'Franz Amador',
      team: '',
      contributors: '',
      qualityAssurance: '',
      graphicArts: '',
      soundDesign: '',
      thanks: ''
    }
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );