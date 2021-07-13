import styled from '@emotion/styled';
import { mockClient } from 'lib/api';
import React, { ReactElement } from 'react';

import ArtistCard from './ArtistCard';
import NewSongCard from './NewSongCard';

function ArtistCarousel(): ReactElement {
  const { data } = useSWR<{ data: Artist[] }>('/artists', mockClient.get);

  console.log(data?.data);

  const artists = data?.data;

  return (
    <Wrap>
      <ArtistCard
            {artists?.map((artist: Artist) => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                profileImage={artist.profileImageUrl}
                logo={artist.logo}
              />
            ))}
            <NewSongCard />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  margin-top: -114px;
  width: 100%;
  height: 270px;
`;

export default ArtistCarousel;
