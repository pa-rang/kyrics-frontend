import styled from '@emotion/styled';
import { client } from 'lib/api';
import React from 'react';
import useSWR from 'swr';
import { IMySongItem } from 'types';

import MySongItem from './MySongItem';
function Mysong() {
  const { data } = useSWR<{ data: { data: IMySongItem[] } }>('/user/song', client.get);

  return (
    <>
      {data?.data?.data[0] ? (
        <Styled.Card>
          {data?.data?.data[0] &&
            data?.data?.data.map((data: IMySongItem, index: React.Key) => (
              <MySongItem mySongData={data} key={index} id={data.id} />
            ))}
        </Styled.Card>
      ) : (
        <Styled.EmptyCard>
          <div className="message">Find your favorite songs and keep them here!</div>
        </Styled.EmptyCard>
      )}
    </>
  );
}

export default Mysong;

const Styled = {
  Card: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 165px);
    justify-content: center;
    column-gap: 25px;
    margin: 74px 32px;
    width: 1070px;
    row-gap: 25px;
    @media (max-width: 580px) {
      grid-template-columns: repeat(auto-fill, 92px);
      column-gap: 16px;
      margin: 53px 12px;
      row-gap: 16px;
    }
  `,
  EmptyCard: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 380px;
    .message {
      color: #9d9d9d;
      font-family: Poppins;
      font-size: 30px;
      font-weight: 600;
      font-style: normal;
    }
  `,
};
