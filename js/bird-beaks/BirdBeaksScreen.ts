/* eslint-disable copyright */

/**
 * todo
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

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: PopulationEvolutionColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new BirdBeaksModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new BirdBeaksScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

populationEvolution.register( 'BirdBeaksScreen', BirdBeaksScreen );