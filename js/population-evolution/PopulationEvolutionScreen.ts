// Copyright 2024, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import PopulationEvolutionColors from '../common/PopulationEvolutionColors.js';
import populationEvolution from '../populationEvolution.js';
import PopulationEvolutionModel from './model/PopulationEvolutionModel.js';
import PopulationEvolutionScreenView from './view/PopulationEvolutionScreenView.js';
import PopulationEvolutionStrings from '../PopulationEvolutionStrings.js';

type SelfOptions = {
  //TODO add options that are specific to PopulationEvolutionScreen here
};

type PopulationEvolutionScreenOptions = SelfOptions & ScreenOptions;

export default class PopulationEvolutionScreen extends Screen<PopulationEvolutionModel, PopulationEvolutionScreenView> {

  public constructor( providedOptions: PopulationEvolutionScreenOptions ) {

    const options = optionize<PopulationEvolutionScreenOptions, SelfOptions, ScreenOptions>()( {
      name: PopulationEvolutionStrings.screen.nameStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: PopulationEvolutionColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new PopulationEvolutionModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new PopulationEvolutionScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

populationEvolution.register( 'PopulationEvolutionScreen', PopulationEvolutionScreen );