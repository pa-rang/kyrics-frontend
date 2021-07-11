import styled from '@emotion/styled';
import { mockClient } from 'lib/api';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import useSWR from 'swr';
import { Song } from 'types';

import MusicCard from './MusicCard';

function NewlyAdded(): ReactElement {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data } = useSWR(`artist-${id}-songs`, (url) => mockClient.get(url));
  const songs = data?.data;

  console.log('songs', songs);

  return (
    <Styled.Root>
      <Styled.TitleWrapper>Newly Added</Styled.TitleWrapper>
      <Styled.MusicCardWrapper>
        <Styled.MusicCardTightWrapper>
          {songs?.map((song: Song, index: React.Key) => (
            <MusicCard
              key={index}
              title={song.title}
              artist={song.artist}
              albumImg={song.albumImg}
              songId={song.songId}
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
    gap: 40px 40px;
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
