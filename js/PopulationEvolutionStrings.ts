// Copyright 2024, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import populationEvolution from './populationEvolution.js';

type StringsType = {
  'birds-controls': {
    'titleStringProperty': LocalizedStringProperty;
    'variationControlLabelStringProperty': LocalizedStringProperty;
    'variationControlValueStringProperty': LocalizedStringProperty;
  };
  'extinctionMessageStringProperty': LocalizedStringProperty;
  'population-evolution': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'nameStringProperty': LocalizedStringProperty;
  };
  'seeds-controls': {
    'distributionEnabledLabelStringProperty': LocalizedStringProperty;
    'titleStringProperty': LocalizedStringProperty;
  }
};

const PopulationEvolutionStrings = getStringModule( 'POPULATION_EVOLUTION' ) as StringsType;

populationEvolution.register( 'PopulationEvolutionStrings', PopulationEvolutionStrings );

export default PopulationEvolutionStrings;
