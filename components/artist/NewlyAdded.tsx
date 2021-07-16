import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { ArtistSongs, Song } from 'types';

import MusicCard from './MusicCard';

interface Props {
  songs: Song[];
}

function NewlyAdded({ songs }: Props): ReactElement {
  return (
    <Styled.Root>
      <Styled.TitleWrapper>Newly Added</Styled.TitleWrapper>
      <Styled.MusicCardWrapper>
        <Styled.MusicCardTightWrapper>
          {songs?.map((song: Song) => (
            <MusicCard
              key={song.id}
              title={song.title}
              artist={song.artist}
              albumImg={song.albumImageUrl}
              songId={song.id}
            />
          ))}
        </Styled.MusicCardTightWrapper>
      </Styled.MusicCardWrapper>
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    width: 100%;
  `,

  TitleWrapper: styled.p`
    margin-top: 62px;
    margin-bottom: 59px;
    text-align: center;
    color: #464646;
    font-size: 32px;
    font-weight: bold;
    font-style: normal;
  `,

  MusicCardWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin: 0 64px;
  `,

  MusicCardTightWrapper: styled.div`
    display: grid;
    grid-template-rows: repeat(auto-fill, 1fr);
    gap: 60px 40px;
    justify-content: start;

    @media (max-width: 547px) {
      grid-template-columns: repeat(1, 200px);
    }

    @media all and (min-width: 548px) and (max-width: 767px) {
      grid-template-columns: repeat(2, 200px);
    }

    @media all and (min-width: 768px) and (max-width: 987px) {
      grid-template-columns: repeat(3, 200px);
    }

    @media all and (min-width: 988px) and (max-width: 1209px) {
      grid-template-columns: repeat(4, 200px);
    }

    @media (min-width: 1210px) {
      grid-template-columns: repeat(5, 200px);
    }
  `,
};

export default NewlyAdded;
