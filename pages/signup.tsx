import LinedTitle from '@components/signup/LinedTitle';
import styled from '@emotion/styled';
import { mainLogo } from '@public/assets';
import React from 'react';

function SignUp() {
  return (
    <Styled.Root>
      <Styled.Contents>
        <Styled.Logo src={mainLogo.src} alt="kyrics" />
        <LinedTitle>Sign Up</LinedTitle>
      </Styled.Contents>
    </Styled.Root>
  );
}

export default SignUp;

const Styled = {
  Root: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `,

  Contents: styled.div``,

  Logo: styled.img`
    width: 360px;
    @media (max-width: 768px) {
      width: 180px;
    }
  `,
};
