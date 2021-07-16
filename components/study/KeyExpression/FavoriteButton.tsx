import styled from '@emotion/styled';
import { FavoriteIcon } from '@public/assets';
import React from 'react';

function FavoriteButton() {
  return <Styled.Root src={FavoriteIcon.src} />;
}

export default FavoriteButton;

const Styled = {
  Root: styled.img`
    position: absolute;
    top: 12px;
    right: 16px;
  `,
};
