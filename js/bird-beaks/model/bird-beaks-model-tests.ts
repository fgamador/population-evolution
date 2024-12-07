/* eslint-disable copyright */

/**
 * @author Franz Amador <franzamador@gmail.com>
 */

import Bird from './Bird.js';
import BirdNiche from './BirdNiche.js';

QUnit.module( 'BirdNiche', () => {
  QUnit.test( 'findMinNicheBirdIndex one bird', assert => {
    const birds = [ new Bird( 5.0 ) ];
    assert.equal( BirdNiche.findMinNicheBirdIndex( birds, 4.5, 0 ), 0 );
  } );

  QUnit.test( 'findMinNicheBirdIndex start before niche', assert => {
    const birds = [ new Bird( 4.4 ), new Bird( 4.5 ), new Bird( 5.0 ) ];
    assert.equal( BirdNiche.findMinNicheBirdIndex( birds, 4.5, 0 ), 1 );
  } );

  QUnit.test( 'findMinNicheBirdIndex start in niche', assert => {
    const birds = [ new Bird( 4.4 ), new Bird( 4.5 ), new Bird( 5.0 ) ];
    assert.equal( BirdNiche.findMinNicheBirdIndex( birds, 4.5, 1 ), 1 );
  } );

  QUnit.test( 'findMaxNicheBirdIndex one bird', assert => {
    const birds = [ new Bird( 5.0 ) ];
    assert.equal( BirdNiche.findMaxNicheBirdIndex( birds, 5.5, 0 ), 0 );
  } );

  QUnit.test( 'findMaxNicheBirdIndex start in niche', assert => {
    const birds = [ new Bird( 4.4 ), new Bird( 4.5 ), new Bird( 5.0 ), new Bird( 5.5 ), new Bird( 5.6 ) ];
    assert.equal( BirdNiche.findMaxNicheBirdIndex( birds, 5.5, 1 ), 3 );
  } );

  QUnit.test( 'updateAllOccupantCounts one bird', assert => {
    const birds = [ new Bird( 5.0 ) ];

    BirdNiche.updateAllOccupantCounts( birds, 1.0 );

    assert.equal( birds[ 0 ].niche.occupantCount, 1 );
  } );

  QUnit.test( 'updateAllOccupantCounts varying niches', assert => {
    const birds = [ new Bird( 4.0 ), new Bird( 4.6 ), new Bird( 5.0 ), new Bird( 5.4 ), new Bird( 6.0 ) ];

    BirdNiche.updateAllOccupantCounts( birds, 1.0 );

    assert.equal( birds[ 0 ].beakSize, 4.0 );
    assert.equal( birds[ 0 ].niche.occupantCount, 1 );

    assert.equal( birds[ 1 ].beakSize, 4.6 );
    assert.equal( birds[ 1 ].niche.occupantCount, 2 );

    assert.equal( birds[ 2 ].beakSize, 5.0 );
    assert.equal( birds[ 2 ].niche.occupantCount, 3 );

    assert.equal( birds[ 3 ].beakSize, 5.4 );
    assert.equal( birds[ 3 ].niche.occupantCount, 2 );

    assert.equal( birds[ 4 ].beakSize, 6.0 );
    assert.equal( birds[ 4 ].niche.occupantCount, 1 );
  } );
} );