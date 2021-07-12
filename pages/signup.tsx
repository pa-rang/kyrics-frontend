import styled from '@emotion/styled';
import React from 'react';

function SignUp() {
  return (
    <Styled.Root>
      <Styled.Contents>HI</Styled.Contents>
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
};
