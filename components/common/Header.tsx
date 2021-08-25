/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from '@emotion/styled';
import { useGetUser } from 'hooks/api';
import { getPageLogger } from 'lib/utils/amplitude';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { mutate } from 'swr';

import ProfileMenu from './ProfileMenu';

const headerLogger = getPageLogger('header');

function Header() {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const router = useRouter();
  const user = useGetUser();

  function handleLogoClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    router.push('/');
  }

  function handleProfileClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    setIsProfileClicked((isProfileClicked) => !isProfileClicked);
  }

  function handleLogout() {
    localStorage.removeItem('userToken');
    mutate('/user');
    window.location.reload();
  }

  function handleLoginClick() {
    router.push('/login');
    headerLogger.click('로그인_버튼_클릭수');
  }

  return (
    <HeaderWrap>
      <div className="header">
        <button className="logo" onClick={handleLogoClick}></button>
        <div className="user">
          {user ? (
            <div className="user__profile">
              <p className="user__profile--logout" onClick={handleLogout}>
                Log out
              </p>
              <div className="user__profile--button" onClick={handleProfileClick}>
                <img
                  className="user__profile--button--picture"
                  src={user.profileImageUrl}
                  alt=""
                ></img>
                <p className="user__profile--button--name">{user.name}</p>
              </div>
              {isProfileClicked && (
                <ProfileMenu
                  isProfileClicked={isProfileClicked}
                  setIsProfileClicked={setIsProfileClicked}
                />
              )}
            </div>
          ) : (
            <div className="user__anonymous">
              <p className="user__anonymous--login" onClick={handleLoginClick}>
                Log In
              </p>
            </div>
          )}
        </div>
      </div>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    font-size: 20px;
    @media (max-width: 900px) {
      height: 70px;
    }
    @media (max-width: 768px) {
      height: 50px;
      font-size: 16px;
    }
  }

  .logo {
    margin-left: 140px;
    border: none;
    background: url(/assets/icons/headerLogo.svg) no-repeat;
    cursor: pointer;
    width: 176px;
    height: 31px;
    @media (max-width: 900px) {
      margin-left: 50px;
    }
    @media (max-width: 768px) {
      margin-left: 20px;
      background-image: url(/assets/icons/SmallHeaderLogo.svg);
      height: 20px;
    }
  }

  .user {
    &__profile {
      display: flex;
      margin-right: 140px;

      &--logout {
        margin-right: 40px;
        cursor: pointer;
        line-height: 27px;
        white-space: nowrap;
        color: #9d9d9d;
        font-weight: bold;
        font-style: normal;
        @media (max-width: 900px) {
          margin-right: 50px;
        }
        @media (max-width: 768px) {
          margin-right: 24px;
          font-size: 12px;
        }
      }

      &--button {
        display: flex;
        position: relative;
        align-items: center;
        border: none;
        background: transparent;
        cursor: pointer;

        &--picture {
          border-radius: 14px;
          background-color: #6465f4;
          width: 28px;
          height: 28px;
          overflow: hidden;
          @media (max-width: 768px) {
            width: 20px;
            height: 20px;
          }
        }

        &--name {
          margin-left: 6px;
          line-height: 27px;
          line-height: 1.2;
          white-space: nowrap;
          color: #9d9d9d;
          font-size: 18px;
          font-weight: bold;
          @media (max-width: 768px) {
            margin-left: 4px;
            font-size: 12px;
          }
        }
      }
      @media (max-width: 900px) {
        margin-right: 50px;
      }
      @media (max-width: 768px) {
        margin-right: 19px;
      }
    }

    &__anonymous {
      display: flex;
      margin-right: 140px;

      &--login {
        cursor: pointer;
        line-height: 27px;
        white-space: nowrap;
        color: #9d9d9d;
        font-weight: bold;
        font-style: normal;

        &:hover {
          color: #6465f4;
        }
        @media (max-width: 768px) {
          font-size: 12px;
        }
      }

      &--signUp {
        margin-left: 40px;
        cursor: pointer;
        line-height: 27px;
        white-space: nowrap;
        color: #6465f4;
        font-weight: bold;
        font-style: normal;
        @media (max-width: 768px) {
          margin-left: 24px;
          font-size: 12px;
        }
      }

      @media (max-width: 900px) {
        margin-right: 50px;
      }
      @media (max-width: 768px) {
        margin-right: 19px;
      }
    }
  }
`;

export default Header;
