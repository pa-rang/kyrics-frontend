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
        <div>
          <Styled.Title>{mySongData.title}</Styled.Title>
          <Styled.Bottom>
            <Styled.Artist>{mySongData.artist}</Styled.Artist>
            <img src="/assets/icons/mySongStar.svg" alt="favorites" />
          </Styled.Bottom>
        </div>
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
    width: 100%;
    &:hover {
      border: 1px solid #6465f4;
    }
  `,
  Container: styled.div`
    margin: 16px;

    & > img {
      margin-bottom: 12px;
      border-radius: 15px;
      width: 100%;
    }
  `,
  Title: styled.div`
    /* width: 100%; */
    width: 135px;
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
  `,
  Artist: styled.div`
    color: #949494;
    font-size: 16px;
    font-weight: 500;
  `,
};
