import Styled from '@emotion/styled';
import React from 'react';

const header: React.FC = () => {
  return (
    <HeaderWrap>
      <img className="logo" src="" alt=""></img>
      <div className="user">
        <div className="user__anonymous">
          <p className="user__anonymous--login">Log in</p>
          <p className="user__anonymous--signUp">Sign up</p>
        </div>
        <div className="user__profile">
          <img className="user__profile--picture" src="" alt=""></img>
          <p className="user__profile--name">Name</p>
        </div>
      </div>
    </HeaderWrap>
  );
};

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
