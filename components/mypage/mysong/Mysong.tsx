import styled from '@emotion/styled';
import { client, mockClient } from 'lib/api';
import React from 'react';
import useSWR from 'swr';
import { IMySongItem } from 'types';

import MySongItem from './MySongItem';
function Mysong() {
  //   const { data } = useSWR<{ data: IMySongItem[] }>('/user/song', client.get);
  const { data } = useSWR<{ data: IMySongItem[] }>('mysongs', mockClient.get);

  console.log(data);

  return (
    <Styled.Card>
      {data?.data[0] &&
        data?.data.map((data: IMySongItem, index: React.Key) => (
          <MySongItem mySongData={data} key={index} />
        ))}
    </Styled.Card>
  );
}

export default Mysong;

const Styled = {
  Card: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(158px, 1fr));
    column-gap: 25px;
    margin: 74px 32px;
    width: 1070px;
    row-gap: 25px;
  `,
};
