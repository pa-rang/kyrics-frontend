import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoginModalOpenedState } from 'states';
function LoginModal() {
  const router = useRouter();
  const setIsLoginModalOpened = useSetRecoilState(isLoginModalOpenedState);

  return (
    <Styled.ModalWrapper>
      <Styled.Modal>
        <Styled.ModalHeader></Styled.ModalHeader>
        <Styled.ModalMain>
          <Styled.ModalText>Login Needed</Styled.ModalText>
          <Styled.ModalButton>
            <button
              onClick={() => setIsLoginModalOpened(false)}
              aria-hidden="true"
              className="cancel"
            >
              Cancel
            </button>
            <button className="goToLogin" onClick={() => router.push('/login')}>
              Go to Login
            </button>
          </Styled.ModalButton>
        </Styled.ModalMain>
      </Styled.Modal>
    </Styled.ModalWrapper>
  );
}

export default LoginModal;

const Styled = {
  ModalWrapper: styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    z-index: 10000000;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
  `,
  Modal: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    /* height: 210px;x */
    @media (max-width: 768px) {
      width: 70%;
    }
  `,
  ModalHeader: styled.div`
    border-radius: 10px 10px 0 0;
    background-color: #6465f4;
    width: 100%;
    height: 16px;
  `,
  ModalMain: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 0 10px 10px;
    background-color: #ffffff;
    width: 100%;
    /* height: 194px; */
    color: #464646;
    .completeModalBtn {
      justify-content: center;
    }
    input {
      margin-bottom: 20px;
      outline: 0;
      border: 1px solid rgba(100, 101, 244, 0.86);
      border-radius: 5px;
      padding: 0 30px;
      height: 39px;
      text-align: center;
      color: #464646;
      font-size: 20px;
      font-weight: 500;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  `,
  ModalText: styled.div`
    margin: 30px 20px 21px 20px;
    text-align: center;
    font-size: 20px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  `,

  ModalButton: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 200px;
    button {
      outline: 0;
      border: 0;
      border-radius: 5px;
      background-color: #9d9d9d;
      cursor: pointer;
      width: 70px;
      height: 27px;
      color: #ffffff;
      font-size: 12px;
    }
    .goToLogin {
      background-color: #6465f4;
      width: 100px;
    }
  `,
};
