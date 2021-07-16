import ArtistBanner from '@components/artist/ArtistBanner';
import NewlyAdded from '@components/artist/NewlyAdded';
import Header from '@components/common/Header';
import React, { ReactElement } from 'react';

function artist(): ReactElement {
  return (
    <div>
      <Header isLoggedIn={true} />
      <ArtistBanner />
      <NewlyAdded />
    </div>
  );
}

export default artist;
