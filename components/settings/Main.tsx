import styled from '@emotion/styled';
import { useGetUser } from 'hooks/api';
import { client } from 'lib/api';
import React, { useRef, useState } from 'react';

function Main() {
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isCompleteModalOpened, setIsCompleteModalOpened] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useGetUser();

  if (user == undefined) {
    return <div>Loading...</div>;
  }

  const editEmail = () => {
    setIsEditModalOpened(false);

    const inputTag = inputRef.current as HTMLInputElement;
    const edited = inputTag.value;

    client
      .patch('/user/email', {
        email: edited,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const DeleteAccount = () => {
    setIsDeleteModalOpened(false);
    setIsCompleteModalOpened(true);
    client
      .delete('/user')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Styled.Root>
      <Styled.Blank></Styled.Blank>
      <Styled.Container>
        <img src={user.profileImageUrl} alt="profile" />
        <Styled.Name>{user.name}</Styled.Name>
        <Styled.Email>{user.email}</Styled.Email>
        <Styled.Desc>
          <img src="/assets/icons/emailIcon.svg" alt="email" width={18} />
          <span>Email Address</span>
        </Styled.Desc>
        <Styled.Edit onClick={() => setIsEditModalOpened(true)} aria-hidden="true">
          {user.email}
          <img src="/assets/icons/editIcon.svg" alt="edit" />
        </Styled.Edit>
        <Styled.Delete onClick={() => setIsDeleteModalOpened(true)} aria-hidden="true">
          <img src="/assets/icons/deleteIcon.svg" alt="delete" />
          <span>Delete Account</span>
        </Styled.Delete>
      </Styled.Container>
      {isEditModalOpened && (
        <Styled.EditModalWrapper>
          <Styled.EditModal>
            <Styled.EditModalHeader></Styled.EditModalHeader>
            <Styled.EditModalMain>
              <Styled.EditModalText>
                Insert new email address to get latest from Kyrics
              </Styled.EditModalText>
              <input type="text" defaultValue={user.email} ref={inputRef} />
              <Styled.EditModalButton>
                <button
                  className="EditCancel"
                  onClick={() => setIsEditModalOpened(false)}
                  aria-hidden="true"
                >
                  Cancel
                </button>
                <button className="EditSave" onClick={editEmail}>
                  Save
                </button>
              </Styled.EditModalButton>
            </Styled.EditModalMain>
          </Styled.EditModal>
        </Styled.EditModalWrapper>
      )}
      {isDeleteModalOpened && (
        <Styled.EditModalWrapper>
          <Styled.EditModal>
            <Styled.EditModalHeader></Styled.EditModalHeader>
            <Styled.EditModalMain>
              <Styled.EditModalText>
                You are about to delete your Account.
                <br />
                Are you sure?
              </Styled.EditModalText>
              <Styled.EditModalButton>
                <button onClick={() => setIsDeleteModalOpened(false)} aria-hidden="true">
                  Cancel
                </button>
                <button onClick={DeleteAccount} className="deleteBtn">
                  Delete
                </button>
              </Styled.EditModalButton>
            </Styled.EditModalMain>
          </Styled.EditModal>
        </Styled.EditModalWrapper>
      )}
      {isCompleteModalOpened && (
        <Styled.EditModalWrapper>
          <Styled.EditModal>
            <Styled.EditModalHeader></Styled.EditModalHeader>
            <Styled.EditModalMain>
              <Styled.EditModalText>Your Account is deleted.</Styled.EditModalText>
              <Styled.EditModalButton className="completeModalBtn">
                <button onClick={() => setIsCompleteModalOpened(false)} aria-hidden="true">
                  Confirm
                </button>
              </Styled.EditModalButton>
            </Styled.EditModalMain>
          </Styled.EditModal>
        </Styled.EditModalWrapper>
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
    margin-bottom: 32px;
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
  EditModalWrapper: styled.div`
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
  EditModal: styled.div`
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
  EditModalHeader: styled.div`
    border-radius: 10px 10px 0 0;
    background-color: #6465f4;
    width: 100%;
    height: 16px;
  `,
  EditModalMain: styled.div`
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
  EditModalText: styled.div`
    margin: 30px 20px 21px 20px;
    text-align: center;
    font-size: 20px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  `,

  EditModalButton: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 170px;
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
    .EditCancel:hover {
      background-color: #6465f4;
    }
    .EditSave:hover {
      background-color: #6465f4;
    }
    .deleteBtn {
      background-color: red;
    }
  `,
};
