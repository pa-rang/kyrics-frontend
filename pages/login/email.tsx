import LoginLayout from '@components/login/LoginLayout';
import RegisterEmailInput from '@components/login/RegisterEmailInput';
import styled from '@emotion/styled';
import { colors } from 'lib/constants/colors';
import { clickable } from 'lib/mixin';
import { getPageLogger } from 'lib/utils/amplitude';
import { useRouter } from 'next/router';
import React from 'react';

const loginPageLogger = getPageLogger('login_page');

function LoginEmailPage() {
  const router = useRouter();

  const handleSkipButtonClick = () => {
    router.push('/');
    loginPageLogger.click('이메일_스킵_버튼_클릭수');
  };

  return (
    <LoginLayout>
      <Styled.Copy>
        Get the latest from Kyrics
        <br /> by adding your email address!
      </Styled.Copy>
      <RegisterEmailInput />
      <Styled.SkipButton onClick={handleSkipButtonClick}>Skip and continue</Styled.SkipButton>
    </LoginLayout>
  );
}

export default LoginEmailPage;

const Styled = {
  Copy: styled.h2`
    margin-bottom: 32px;
    text-align: center;
    line-height: 120%;
    color: #464646;
    font-size: 24px;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  `,

  SkipButton: styled.button`
    transition: all 0.2s ease-in-out;
    margin-top: 32px;
    border: none;
    border-radius: 3px;
    box-shadow: 3px 3px 7px 4px rgba(98, 98, 98, 0.09);
    background: #fefcfe;
    padding: 12px 44px;
    color: ${colors.gray3};
    font-size: 16px;
    font-weight: 500;
    ${clickable}

    &:hover {
      box-shadow: 3px 3px 7px 4px rgba(98, 98, 98, 0.15);
    }
  `,
};
