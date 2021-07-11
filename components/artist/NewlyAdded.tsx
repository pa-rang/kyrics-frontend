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
