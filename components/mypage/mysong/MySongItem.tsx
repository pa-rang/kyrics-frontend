import styled from '@emotion/styled';
import React from 'react';

import { IMySongItem } from '../../../types';

interface mySongItemProps {
  mySongData: IMySongItem;
}
function MySongItem({ mySongData }: mySongItemProps) {
  return (
    <Styled.Root>
      <Styled.Container>
        <img src={mySongData.albumImageUrl} alt="" />
        <Styled.Title>{mySongData.title}</Styled.Title>
        <Styled.Bottom>
          <Styled.Artist>{mySongData.artist}</Styled.Artist>
          <img src="/assets/icons/mySongStar.svg" alt="favorites" />
        </Styled.Bottom>
      </Styled.Container>
    </Styled.Root>
  );
}

export default MySongItem;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid rgba(100, 101, 244, 0.35);
    border-radius: 15px;
    cursor: pointer;
    width: 158px;
    height: 207px;
    &:hover {
      border: 1px solid #6465f4;
    }
  `,
  Container: styled.div`
    margin: 13px 16px 12px 16px;
    & > img {
      margin-bottom: 6px;
      border-radius: 20px;
      width: 126px;
      height: 126px;
    }
  `,
  Title: styled.div`
    width: auto;
    max-width: 135px;
    height: 27px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #656565;
    font-size: 20px;
    font-weight: 700;
  `,
  Bottom: styled.div`
    display: flex;
    justify-content: space-between;
    width: 126px;
  `,
  Artist: styled.div`
    color: #949494;
    font-size: 16px;
    font-weight: 500;
  `,
};
