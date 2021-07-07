import Styled from '@emotion/styled';
import React from 'react';

function header() {
  const isLoggedIn = true;

  return (
    <HeaderWrap>
      <img className="logo" src="/assets/icons/headerLogo.svg" alt=""></img>
      <div className="user">
        {isLoggedIn ? (
          <div className="user__profile">
            <p className="user__profile--logout">Log out</p>
            <img className="user__profile--picture" src="" alt=""></img>
            <p className="user__profile--name">Daniel</p>
          </div>
        ) : (
          <div className="user__anonymous">
            <p className="user__anonymous--login">Log in</p>
            <p className="user__anonymous--signUp">Sign up</p>
          </div>
        )}
      </div>
    </HeaderWrap>
  );
}

const HeaderWrap = Styled.div`
    .logo {

    }

    .user {
        &__anonymous {

            &--login {

            }

            &--signUp {

            }
        }
        

        &__profile{
            
            &--picture{

            }

            &--name{

            }
        }

    }
`;

export default header;
