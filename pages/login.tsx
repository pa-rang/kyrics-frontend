import LinedTitle from '@components/signup/LinedTitle';
import styled from '@emotion/styled';
import { mainLogo } from '@public/assets';
import { client, KyricsResponse } from 'lib/api';
import { useRouter } from 'next/router';
import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

function Login() {
  const router = useRouter();

  const handleGoogleLoginSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    /** Type Guard: Filter GoogleLoginResponseOffline */
    if ('code' in response) {
      return;
    }

    const {
      profileObj: { name, email, googleId, imageUrl },
    } = response;

    const payload = {
      name,
      email,
      socialId: googleId,
      socialType: 'Google',
      profileImageUrl: imageUrl,
    };

    const {
      data: {
        data: { token },
      },
    } = await client.post<KyricsResponse<{ token: string }>>('/login', payload);

    localStorage.setItem('userToken', token);
    router.push('/');
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

export default Login;

const Styled = {
  Root: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `,

  Contents: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Logo: styled.img`
    margin-bottom: 40px;
    width: 360px;
    @media (max-width: 768px) {
      width: 180px;
    }
  `,
};
