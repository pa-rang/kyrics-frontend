import Title from 'components/home/Title';
import { mockClient } from 'lib/api';
import React from 'react';
import useSWR from 'swr';
import { Artist } from 'types';

function Home() {
  const { data } = useSWR<{ data: Artist[] }>('/artists', mockClient.get);

  console.log('data', data?.data);

  return (
    <>
      <Title />
      <div>안녕하세요.</div>
    </>
  );
}

export default Home;
