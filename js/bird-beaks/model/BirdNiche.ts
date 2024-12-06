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

  private updateFood( seeds: Seeds ) {
    this.totalFood = PopulationEvolutionConstants.BIRD_NICHE_SIZE * seeds.abundance( this.beakSize );
    this.occupantFood = this.totalFood / this.occupantCount;
  }

  public static updateAll( birds: Bird[], seeds: Seeds ) {
    BirdNiche.updateAllOccupantCounts( birds, PopulationEvolutionConstants.BIRD_NICHE_SIZE );

    birds.forEach( bird => {
      bird.niche.updateFood( seeds );
    } );
  }

  public static updateAllOccupantCounts( birds: Bird[], nicheSize: number ) {
    birds.sort( ( bird1, bird2 ) => bird1.beakSize - bird2.beakSize );

    let minNicheBirdIndex = 0;
    let maxNicheBirdIndex = 0;

    for ( let birdIndex = 0; birdIndex < birds.length; ++birdIndex ) {
      const nicheBeakSizeRange = BirdNiche.calcNicheBeakSizeRange( birds[ birdIndex ].beakSize, nicheSize );
      minNicheBirdIndex = BirdNiche.findMinNicheBirdIndex( birds, nicheBeakSizeRange[ 0 ], minNicheBirdIndex );
      maxNicheBirdIndex = BirdNiche.findMaxNicheBirdIndex( birds, nicheBeakSizeRange[ 1 ], maxNicheBirdIndex );
      birds[ birdIndex ].niche.occupantCount = maxNicheBirdIndex - minNicheBirdIndex + 1;
    }
  }

  private static calcNicheBeakSizeRange( beakSize: number, nicheSize: number ): [ number, number ] {
    const halfNicheSize = nicheSize / 2.0;
    return [ beakSize - halfNicheSize, beakSize + halfNicheSize ];
  }

  public static findMinNicheBirdIndex( birds: Bird[], minNicheBeakSize: number, startIndex: number ) {
    let result = startIndex;
    while ( birds[ result ].beakSize < minNicheBeakSize ) {
      ++result;
    }
    return result;
  }

  public static findMaxNicheBirdIndex( birds: Bird[], maxNicheBeakSize: number, startIndex: number ) {
    let result = startIndex;
    while ( result + 1 < birds.length && birds[ result + 1 ].beakSize <= maxNicheBeakSize ) {
      ++result;
    }
    return result;
  }
}

populationEvolution.register( 'BirdNiche', BirdNiche );