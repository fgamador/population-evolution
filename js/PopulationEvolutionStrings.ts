// Copyright 2024, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import populationEvolution from './populationEvolution.js';

type StringsType = {
  'extinctionMessageStringProperty': LocalizedStringProperty;
  'population-evolution': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'nameStringProperty': LocalizedStringProperty;
  }
};

const PopulationEvolutionStrings = getStringModule( 'POPULATION_EVOLUTION' ) as StringsType;

populationEvolution.register( 'PopulationEvolutionStrings', PopulationEvolutionStrings );

export default PopulationEvolutionStrings;
