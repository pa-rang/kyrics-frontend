import KeyExpressionItem from '@components/study/KeyExpression/KeyExpressionItem';
import styled from '@emotion/styled';
import { client } from 'lib/api';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IMyVocab } from 'types';

function MyVocab() {
  const { data } = useSWR<{ data: IMyVocab[] }>('/user/vocab', client.get);
  const [keyExpressions, setKeyExpressions] = useState<IMyVocab[]>();

  useEffect(() => {
    console.log(data);
    const keys = data?.data as any;

    setKeyExpressions(keys);
  }, [data]);

  return (
    <Styled.Card>
      {keyExpressions &&
        keyExpressions[0] &&
        keyExpressions.map(({ id, eng, engExample, kor, korExample }) => (
          <KeyExpressionItem
            id={id}
            key={kor}
            type="line-top"
            width="254px"
            eng={eng}
            engExample={engExample}
            kor={kor}
            korExample={korExample}
            isSaved={true}
          />
        ))}
    </Styled.Card>
  );
}

export default MyVocab;

const Styled = {
  Card: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 254px);
    justify-content: center;
    column-gap: 25px;
    margin: 50px;
    width: 1200px;
    row-gap: 70px;
    @media (max-width: 768px) {
      margin: 30px;
      row-gap: 20px;
    }
  `,
};
