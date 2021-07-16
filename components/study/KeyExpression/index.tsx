import styled from '@emotion/styled';
import { client } from 'lib/api';
import React from 'react';
import useSWR from 'swr';
import { IMyVocab } from 'types';

import KeyExpressionItem from './KeyExpressionItem';

interface KyricsResponse<T> {
  status: number;
  message: string;
  data: T;
}

function KeyExpression() {
  const { data } = useSWR<{
    data: KyricsResponse<IMyVocab[]>;
  }>('/song/1/vocab', client.get, {
    revalidateOnFocus: false,
    errorRetryCount: 3,
  });

  const keyExpressions = data?.data.data;

  return (
    <Styled.Root>
      <Styled.Title>Key Expression</Styled.Title>
      <Styled.KeyExpressionWrapper>
        {keyExpressions?.map(({ id, eng, engExample, kor, korExample }) => (
          <KeyExpressionItem
            key={kor}
            type="line-left"
            width="100%"
            eng={eng}
            engExample={engExample}
            kor={kor}
            korExample={korExample}
            style={{ marginBottom: '12px' }}
            myvocab={false}
            id={id}
          />
        ))}
      </Styled.KeyExpressionWrapper>
    </Styled.Root>
  );
}

export default KeyExpression;

const Styled = {
  Root: styled.div`
    margin-left: 36px;
    width: 343px;
    height: 100%;
  `,
  Title: styled.h3`
    margin-top: 36px;
    margin-bottom: 23px;
    color: #7d7d7d;
    font-size: 24px;
    font-weight: 700;
    @media (max-width: 768px) {
      display: none;
    }
  `,

  KeyExpressionWrapper: styled.div``,
};
