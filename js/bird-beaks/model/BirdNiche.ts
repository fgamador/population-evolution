/* eslint-disable copyright */

/**
 * @author Franz Amador (open-source contributor)
 */

import Bird from './Bird.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionConstants from '../../common/PopulationEvolutionConstants.js';
import Seeds from './Seeds.js';

export default class BirdNiche {

  public occupantCount: number;

  public totalFood: number;

  public occupantFood: number;

  public constructor( public readonly beakSize: number ) {
  }

  public update( occupantCount: number, seeds: Seeds ) {
    this.occupantCount = occupantCount;
    this.totalFood = PopulationEvolutionConstants.BIRD_NICHE_SIZE * seeds.abundance( this.beakSize );
    this.occupantFood = this.totalFood / this.occupantCount;
  }

  public static updateAll( birds: Bird[], seeds: Seeds ) {
    // todo sort birds, find and set counts
    birds.forEach( bird => {
      bird.niche.update( 1, seeds );
    } );
  }
}

populationEvolution.register( 'BirdNiche', BirdNiche );