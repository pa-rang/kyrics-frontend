import LinedTitle from '@components/signup/LinedTitle';
import styled from '@emotion/styled';
import { mainLogo } from '@public/assets';
import axios from 'axios';
import { client } from 'lib/api';
import { isServer } from 'lib/constants/env';
import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

function SignUp() {
  const handleGoogleLoginSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    /** Type Guard: Filter GoogleLoginResponseOffline */
    if ('code' in response) {
      return;
    }

    console.log('response', response);
    const {
      accessToken,
      profileObj: { name, email, googleId, imageUrl },
    } = response;

    const token = {
      'x-access-token': accessToken,
    };

    const payload = {
      name,
      email,
      socialId: googleId,
      socialType: 'Google',
      profileImageUrl: imageUrl,
    };

    const loginClient = axios.create({
      baseURL: 'http://kyrics-test-env.eba-kez2mzcm.ap-northeast-2.elasticbeanstalk.com/login',
      headers: token,
    });

    // const { data } = await loginClient.post('/login', payload);
    const { data } = await client.post('/login', payload);

    console.log('data', data);
  };

  const handleGoogleLoginFailure = () => {
    console.log('failure');
  };

  return (
    <Styled.Root>
      <Styled.Contents>
        <Styled.Logo src={mainLogo.src} alt="kyrics" />
        <LinedTitle>Sign Up</LinedTitle>
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
          buttonText="Sign up with Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
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
