/* eslint-disable copyright */

/**
 * Root container for the bird-beaks evolution sim model and view.
 *
 * @author Franz Amador
 */

import BirdBeaksModel from './model/BirdBeaksModel.js';
import BirdBeaksScreenView from './view/BirdBeaksScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import populationEvolution from '../populationEvolution.js';
import PopulationEvolutionColors from '../common/PopulationEvolutionColors.js';
import PopulationEvolutionStrings from '../PopulationEvolutionStrings.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';

type SelfOptions = EmptySelfOptions;
type BirdBeaksScreenOptions = SelfOptions & ScreenOptions;

export default class BirdBeaksScreen extends Screen<BirdBeaksModel, BirdBeaksScreenView> {

  public constructor( providedOptions: BirdBeaksScreenOptions ) {

    const options = optionize<BirdBeaksScreenOptions, SelfOptions, ScreenOptions>()( {
      name: PopulationEvolutionStrings.screen.nameStringProperty,
      backgroundColorProperty: PopulationEvolutionColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new BirdBeaksModel(),
      model => new BirdBeaksScreenView( model, {} ),
      options
    );
  }
}

populationEvolution.register( 'BirdBeaksScreen', BirdBeaksScreen );