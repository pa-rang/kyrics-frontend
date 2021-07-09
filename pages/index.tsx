import Title from 'components/home/Title';
import React from 'react';

import Header from '../components/common/Header';

function Home() {
  return (
    <>
      <Header isLoggedIn={true} />
      <Title />
      <div>안녕하세요.</div>
    </>
  );
}

export default Home;
