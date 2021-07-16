import LinedTitle from '@components/login/LinedTitle';
import LoginLayout from '@components/login/LoginLayout';
import styled from '@emotion/styled';
import { client, KyricsResponse } from 'lib/api';
import { clickable } from 'lib/mixin';
import { useRouter } from 'next/router';
import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { LoginResponse } from 'types';

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

    const { data } = await client.post<KyricsResponse<LoginResponse>>('/login', payload);

    console.log('data?.data', data?.data);
    const { token, isNewUser } = data?.data;

    localStorage.setItem('userToken', token);

    if (isNewUser) {
      router.replace('/login/email');
    } else {
      router.replace('/');
    }
  };

  const handleGoogleLoginFailure = () => {
    alert('로그인에 실패햐였습니다. 다시 시도해주세요.');
  };

  return (
    <LoginLayout>
      <LinedTitle>Log In</LinedTitle>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <Styled.GoogleLoginButton onClick={renderProps.onClick}>
            <img src="/assets/icons/googleLogo.svg" alt="google-login" />
            <div>Log in with Google</div>
          </Styled.GoogleLoginButton>
        )}
      />
    </LoginLayout>
  );
}

export default Login;

const Styled = {
  GoogleLoginButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    border: none;
    border-radius: 2px;
    box-shadow: 3px 3px 7px 4px rgba(98, 98, 98, 0.09);
    background-color: #fff;
    padding: 18px 96px;
    ${clickable}

    &:hover {
      box-shadow: 3px 3px 7px 4px rgba(98, 98, 98, 0.15);
    }

    & > img {
      margin-right: 12px;
    }

    & > div {
      color: #464646;
      font-size: 18px;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      padding: 12px 54px;
      font-size: 10px;

      & > img {
        margin-right: 8px;
      }

      & > div {
        font-size: 14px;
      }
    }
  `,
};
