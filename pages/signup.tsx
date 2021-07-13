import LinedTitle from '@components/signup/LinedTitle';
import styled from '@emotion/styled';
import { mainLogo } from '@public/assets';
import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

function SignUp() {
  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <Styled.Root>
      <Styled.Contents>
        <Styled.Logo src={mainLogo.src} alt="kyrics" />
        <LinedTitle>Sign Up</LinedTitle>
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          buttonText="Sign up with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
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
