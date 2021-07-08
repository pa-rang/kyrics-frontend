import styled from '@emotion/styled';
import router from 'next/router';
import React, { ReactElement, useState } from 'react';

import ProfileHover from './ProfileHover';

interface HeaderProps {
  isLoggedIn: boolean;
}

function Header({ isLoggedIn = false }: HeaderProps): ReactElement {
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  function handleLogoClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    router.push('/');
  }

  function handleProfileClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault;
    setIsProfileClicked(!isProfileClicked);
  }

  return (
    <HeaderWrap>
      <div className="header">
        <button className="logo" onClick={handleLogoClick}></button>
        <div className="user">
          {isLoggedIn ? (
            <div className="user__profile">
              <p className="user__profile--logout">Log out</p>
              <button className="user__profile--button" onClick={handleProfileClick}>
                <img className="user__profile--button--picture" src="" alt=""></img>
                <p className="user__profile--button--name">Name</p>
              </button>
            </div>
          ) : (
            <div className="user__anonymous">
              <p className="user__anonymous--login">Log in</p>
              <p className="user__anonymous--signUp">Sign up</p>
            </div>
          )}
        </div>
      </div>
      {isProfileClicked && <ProfileHover />}
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
  }

  .logo {
    margin-left: 140px;
    border: none;
    background: url(/assets/icons/headerLogo.svg) no-repeat;
    cursor: pointer;
    width: 176px;
    height: 31px;
  }

  .user {
    &__profile {
      display: flex;
      margin-right: 55px;

      &--logout {
        margin-right: 40px;
        cursor: pointer;
        line-height: 27px;
        white-space: nowrap;
        color: #9d9d9d;
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
      }

      &--button {
        display: flex;
        border: none;
        background: transparent;
        cursor: pointer;

        &--picture {
          border-radius: 14px;
          box-shadow: 3px 3px 7px 4px rgba(98, 98, 98, 0.12);
          background-color: #6465f4;
          width: 28px;
          height: 28px;
          overflow: hidden;
        }

        &--name {
          margin-left: 9px;
          line-height: 27px;
          white-space: nowrap;
          color: #6465f4;
          font-size: 20px;
          font-weight: bold;
          font-style: normal;
        }
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
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
      }

      &--signUp {
        margin-left: 40px;
        cursor: pointer;
        line-height: 27px;
        white-space: nowrap;
        color: #6465f4;
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
      }
    }
  }
`;

export default Header;
