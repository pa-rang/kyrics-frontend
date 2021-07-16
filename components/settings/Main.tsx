import styled from '@emotion/styled';
import { mockClient } from 'lib/api';
import React from 'react';
import useSWR from 'swr';

interface IUserData {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string;
}

function Main() {
  const { data } = useSWR<{ data: IUserData }>('/userdata', mockClient.get);
  const userData = data?.data;

  return (
    <Styled.Root>
      <Styled.Blank></Styled.Blank>
      <Styled.Container>
        <img src={userData?.profileImageUrl} alt="profile" />
        {/* <img src="/assets/images/profileExample.svg" alt="profile" /> */}
        <Styled.Name>{userData?.name}</Styled.Name>
        <Styled.Email>{userData?.email}</Styled.Email>
        <Styled.Desc>
          <img src="/assets/icons/emailIcon.svg" alt="email" />
          <span>Email Address</span>
        </Styled.Desc>
        <Styled.Edit>
          {userData?.email}
          <img src="/assets/icons/editIcon.svg" alt="edit" />
        </Styled.Edit>
        <Styled.Delete>
          <img src="/assets/icons/deleteIcon.svg" alt="delete" />
          <span>Delete Account</span>
        </Styled.Delete>
      </Styled.Container>
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
};
