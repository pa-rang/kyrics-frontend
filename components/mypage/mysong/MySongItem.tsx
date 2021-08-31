import styled from '@emotion/styled';
import { client } from 'lib/api';
import { useRouter } from 'next/router';
import React from 'react';
import { mutate } from 'swr';

import { IMySongItem } from '../../../types';

interface mySongItemProps {
  mySongData: IMySongItem;
  id: number;
}
function MySongItem({ mySongData, id }: mySongItemProps) {
  const router = useRouter();
  const handleDelete = async () => {
    await client.delete(`user/song/${id}`);

    mutate('/user/song');
  };
  const handleRoute = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;

    if (target.tagName === 'BUTTON') {
      return;
    }
    router.push(`/study/${id}`);
  };

  return (
    <Styled.Root onClick={handleRoute}>
      <Styled.Container>
        <img src={mySongData.albumImageUrl} alt="" />
        <span>
          <Styled.Title>{mySongData.title}</Styled.Title>
          <Styled.Bottom>
            <Styled.Artist>{mySongData.artist}</Styled.Artist>
            <button onClick={handleDelete} />
          </Styled.Bottom>
        </span>
      </Styled.Container>
    </Styled.Root>
  );
}

export default MySongItem;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgba(100, 101, 244, 0.35);
    border-radius: 15px;
    cursor: pointer;
    width: 100%;
    max-width: 156px;
    &:hover {
      border: 1px solid #6465f4;
    }
    @media (max-width: 580px) {
      width: 95px;
    }
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;

    & > img {
      margin-bottom: 12px;
      border-radius: 15px;
      width: 126px;
      @media (max-width: 580px) {
        max-width: 68px;
      }
    }
  `,
  Title: styled.div`
    width: 135px;
    height: 27px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #656565;
    font-size: 20px;
    font-weight: 700;
    @media (max-width: 580px) {
      width: 68px;
      font-size: 11px;
    }
  `,
  Bottom: styled.div`
    display: flex;
    justify-content: space-between;
    button {
      z-index: 1000;
      border: none;
      background: url(/assets/icons/mySongStar.svg) no-repeat;
      cursor: pointer;
      padding: 0;
      width: 20px;
      height: 20px;
      @media (max-width: 580px) {
        background-image: url(/assets/icons/mySmallSongStar.svg);
        width: 10px;
        height: 10px;
      }
    }
  `,
  Artist: styled.div`
    color: #949494;
    font-size: 16px;
    font-weight: 500;
    @media (max-width: 580px) {
      font-size: 8px;
    }
  `,
};
