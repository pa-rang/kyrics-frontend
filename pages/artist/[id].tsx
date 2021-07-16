import ArtistBanner from '@components/artist/ArtistBanner';
import NewlyAdded from '@components/artist/NewlyAdded';
import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import { client } from 'lib/api';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import useSWR from 'swr';
import { ArtistSongs } from 'types';

interface Songs {
  data: ArtistSongs;
}

function Artist(): ReactElement {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data } = useSWR<{ data: Songs }>(`/artist/${id}`, client.get);
  const songs = data?.data.data;

  console.log('songs', songs);

  return (
    <div>
      <Header />
      {songs && <ArtistBanner name={songs.artist} bgImg={songs?.backgroundImageUrl} />}
      {songs && <NewlyAdded songs={songs?.songs} />}
      <Footer />
    </div>
  );
}

export default Artist;
