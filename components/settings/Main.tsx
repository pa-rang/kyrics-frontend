import styled from '@emotion/styled';
import { mockClient } from 'lib/api';
import React, { useState } from 'react';
import useSWR from 'swr';

interface IUserData {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string;
}

function Main() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { data } = useSWR<{ data: IUserData }>('/userdata', mockClient.get);
  const userData = data?.data;

  return (
    <Styled.Root>
      <Styled.Blank></Styled.Blank>
      <Styled.Container>
        {/* <img src={userData?.profileImageUrl} alt="profile" /> */}
        <img src="/assets/images/profileExample.svg" alt="profile" />
        <Styled.Name>{userData?.name}</Styled.Name>
        <Styled.Email>{userData?.email}</Styled.Email>
        <Styled.Desc>
          <img src="/assets/icons/emailIcon.svg" alt="email" />
          <span>Email Address</span>
        </Styled.Desc>
        <Styled.Edit>
          {userData?.email}
          <img
            src="/assets/icons/editIcon.svg"
            alt="edit"
            onClick={() => setIsModalOpened(true)}
            aria-hidden="true"
          />
        </Styled.Edit>
        <Styled.Delete>
          <img src="/assets/icons/deleteIcon.svg" alt="delete" />
          <span>Delete Account</span>
        </Styled.Delete>
      </Styled.Container>
      {isModalOpened && (
        <Styled.ModalWrapper>
          <Styled.Modal>
            <Styled.ModalHeader></Styled.ModalHeader>
            <Styled.ModalMain>
              <Styled.ModalText>
                Insert new email address to get latest from Kyrics
              </Styled.ModalText>
              <input type="text" defaultValue={userData?.email} />
              <Styled.ModalButton>
                <button onClick={() => setIsModalOpened(false)} aria-hidden="true">
                  Cancel
                </button>
                <button>Save</button>
              </Styled.ModalButton>
            </Styled.ModalMain>
          </Styled.Modal>
        </Styled.ModalWrapper>
      )}
    </Styled.Root>
  );
}

export default Main;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8fafc;
    width: 100%;
    height: 100%;
  `,
  Blank: styled.div`
    height: 100px;
    @media (max-width: 768px) {
      height: 60px;
    }
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    background-color: #ffffff;
    width: 70%;
    & > img {
      margin-top: 100px;
      margin-bottom: 20px;
      border-radius: 50%;
      width: 86px;
      height: 86px;
      @media (max-width: 768px) {
        margin-top: 50px;
        margin-bottom: 16px;
        background-color: #f8fafc;
        width: 68px;
        height: 68px;
      }
    }
    @media (max-width: 768px) {
      background-color: #f8fafc;
    }
  `,
  Name: styled.div`
    margin-bottom: 3px;
    height: 33px;
    color: #464646;
    font-size: 24px;
    font-weight: 700x;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  `,
  Email: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    color: #9d9d9d;
    font-size: 16px;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  `,
  Desc: styled.div`
    margin-bottom: 14px;
    color: #464646;
    font-size: 20px;
    font-weight: 500;
    & > img {
      margin-right: 8px;
    }
    @media (max-width: 768px) {
      font-size: 12px;
    }
  `,
  Edit: styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    margin-bottom: 120px;
    border: 1px solid rgba(100, 101, 244, 0.25);
    border-radius: 5px;
    cursor: pointer;
    padding: 0 50px;
    height: 39px;
    font-size: 20px;
    & > img {
      position: absolute;
      right: 21px;
    }
    @media (max-width: 768px) {
      margin-bottom: 80px;
      font-size: 12px;
    }
  `,
  Delete: styled.div`
    margin-bottom: 91px;
    cursor: pointer;
    color: #c4c4c4;
    font-size: 16px;
    font-weight: 500;
    & > img {
      margin-right: 8px;
    }
  `,
  ModalWrapper: styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
  `,
  Modal: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 210px;
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
    height: 194px;
    color: #464646;
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
    }
  `,
  ModalText: styled.div`
    margin-top: 30px;
    margin-bottom: 21px;
    text-align: center;
    font-size: 20px;
  `,

  ModalButton: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 170px;
    button {
      outline: 0;
      border: 0;
      border-radius: 5px;
      background-color: #9d9d9d;
      width: 70px;
      height: 27px;
      color: #ffffff;
      font-size: 12px;
    }
  `,
};
