import styled from '@emotion/styled';
import { mainLogo } from '@public/assets';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

function LoginLayout({ children }: Props) {
  return (
    <Styled.Root>
      <Styled.Contents>
        <Styled.Logo src={mainLogo.src} alt="kyrics" />
        {children}
      </Styled.Contents>
    </Styled.Root>
  );
}

export default LoginLayout;

const Styled = {
  Root: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/assets/images/bottom-background.svg') no-repeat;
    background-position: bottom;
    background-size: contain;
    height: 100vh;
  `,

  Contents: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 120px;

    @media (max-width: 768px) {
      margin-bottom: 60px;
    }
  `,

  Logo: styled.img`
    margin-bottom: 40px;
    width: 360px;
    @media (max-width: 768px) {
      width: 180px;
    }
  `,
};
