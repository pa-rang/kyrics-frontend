import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

import MusicCard from './MusicCard';

function NewlyAdded(): ReactElement {
  let counter: 0;

  return (
    <Wrap>
      <p className="title">Newly Added</p>
      <div className="cards">
        <MusicCard
          title={'Dynamite'}
          artist={['BTS']}
          albumImg={
            'https://upload.wikimedia.org/wikipedia/ko/thumb/d/db/BTS_-_Butter.png/220px-BTS_-_Butter.png'
          }
          songId={0}
        ></MusicCard>
        <MusicCard
          title={'Dynamite'}
          artist={['BTS']}
          albumImg={
            'https://upload.wikimedia.org/wikipedia/ko/thumb/d/db/BTS_-_Butter.png/220px-BTS_-_Butter.png'
          }
          songId={0}
        ></MusicCard>
        <MusicCard
          title={'Dynamite'}
          artist={['BTS']}
          albumImg={
            'https://upload.wikimedia.org/wikipedia/ko/thumb/d/db/BTS_-_Butter.png/220px-BTS_-_Butter.png'
          }
          songId={0}
        ></MusicCard>
        <MusicCard
          title={'Dynamite'}
          artist={['BTS']}
          albumImg={
            'https://upload.wikimedia.org/wikipedia/ko/thumb/d/db/BTS_-_Butter.png/220px-BTS_-_Butter.png'
          }
          songId={0}
        ></MusicCard>
        <MusicCard
          title={'Dynamite'}
          artist={['BTS']}
          albumImg={
            'https://upload.wikimedia.org/wikipedia/ko/thumb/d/db/BTS_-_Butter.png/220px-BTS_-_Butter.png'
          }
          songId={0}
        ></MusicCard>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  .title {
    margin-top: 62px;
    margin-bottom: 59px;
    text-align: center;
    color: #464646;
    font-size: 32px;
    font-weight: bold;
    font-style: normal;
  }

  .cards {
    display: flex;
    justify-content: space-between;
    margin-bottom: 80px;
    padding: 0 137px;
  }
`;

export default NewlyAdded;
