import styled from '@emotion/styled';
import { colors } from 'lib/constants/colors';
import { clickable } from 'lib/mixin';
import React, { useState } from 'react';

function RegisterEmailInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue('');
  };

  return (
    <Styled.EmailForm onSubmit={handleSubmit}>
      <Styled.EmailInput
        placeholder="Enter your email"
        value={inputValue}
        onChange={handleChange}
      />
      <Styled.SubmitInput type="submit" value="Subscribe" />
    </Styled.EmailForm>
  );
}

export default RegisterEmailInput;

const Styled = {
  EmailForm: styled.form`
    display: flex;
    margin: 16px 0;
  `,

  EmailInput: styled.input`
    transition: all 0.2s ease-in-out;
    border: 1px solid rgba(100, 101, 244, 0.25);
    border-radius: 5px;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.04);
    background: #ffffff;
    padding: 0 20px;
    width: 340px;
    height: 48px;
    color: ${colors.gray4};
    font-size: 20px;
    font-weight: 500;

    &::placeholder {
      color: ${colors.gray2};
    }
  `,

  SubmitInput: styled.input`
    margin-left: 16px;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 5px 2px rgba(98, 98, 98, 0.09);
    background: #fefcfe;
    padding: 8px 16px;
    color: ${colors.gray3};
    font-size: 14px;
    font-weight: 500;
    ${clickable}

    &:hover {
      box-shadow: 3px 3px 7px 4px rgba(98, 98, 98, 0.15);
    }
  `,
};
