// Copyright 2024, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PopulationEvolutionConstants from '../../common/PopulationEvolutionConstants.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionModel from '../model/PopulationEvolutionModel.js';
import optionize from '../../../../phet-core/js/optionize.js';

type SelfOptions = {
 //TODO add options that are specific to PopulationEvolutionScreenView here
};

type PopulationEvolutionScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class PopulationEvolutionScreenView extends ScreenView {

  public constructor( model: PopulationEvolutionModel, providedOptions: PopulationEvolutionScreenViewOptions ) {

    const options = optionize<PopulationEvolutionScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - PopulationEvolutionConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - PopulationEvolutionConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    //TODO
  }
}

populationEvolution.register( 'PopulationEvolutionScreenView', PopulationEvolutionScreenView );