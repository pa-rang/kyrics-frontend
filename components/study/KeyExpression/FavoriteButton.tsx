import styled from '@emotion/styled';
import { FavoriteIcon2, FavoriteYellowIcon } from '@public/assets';
import { useGetUser } from 'hooks/api';
import { client } from 'lib/api';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoginModalOpenedState } from 'states';
import { mutate } from 'swr';

interface Props {
  id: number;
  isSaved: boolean;
  type: 'line-top' | 'line-left';
  songId: number | undefined;
}

function FavoriteButton({ id, isSaved, type, songId }: Props) {
  const user = useGetUser();
  const setIsLoginModalOpened = useSetRecoilState(isLoginModalOpenedState);

  const handleClick = async (id: number) => {
    if (!user) {
      setIsLoginModalOpened(true);

      return;
    }

    if (isSaved) {
      await client.delete(`/user/vocab/${id}`);
    } else {
      await client.post(`/user/vocab/${id}`);
    }

    songId ? mutate(`/song/${songId}/vocab`) : mutate('/user/vocab');
  };

  return (
    <>
      <Styled.Root
        type={type}
        src={isSaved ? FavoriteYellowIcon.src : FavoriteIcon2.src}
        onClick={() => handleClick(id)}
      />
    </>
  );
}

export default FavoriteButton;

const Styled = {
  Root: styled.img<{ type: 'line-top' | 'line-left' }>`
    position: absolute;
    top: ${({ type }) => (type === 'line-top' ? '24px' : '16px')};
    right: 16px;
    cursor: pointer;
  `,
};
