import KeyExpressionItem from '@components/study/KeyExpression/KeyExpressionItem';
import styled from '@emotion/styled';
import { client, mockClient } from 'lib/api';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IMyVocab } from 'types';

// import MyVocabItem from './MyVocabItem';

function MyVocab() {
  //   const { data } = useSWR<{ data: IMyVocab[] }>('/user/vocab', client.get);
  const { data } = useSWR<{ data: IMyVocab[] }>('/myvocab', mockClient.get);
  const [keyExpressions, setKeyExpressions] = useState<IMyVocab[]>();

  useEffect(() => {
    console.log(data?.data);
    const keys = data?.data as any;

    setKeyExpressions(keys);
  }, [data]);

  return (
    <Styled.Card>
      {keyExpressions &&
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
            myvocab={true}
          />
        ))}
    </Styled.Card>
  );
}

export default MyVocab;

const Styled = {
  Card: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(234px, 1fr));
    justify-items: center;
    column-gap: 25px;
    margin: 50px;
    width: 100%;
    row-gap: 70px;
  `,
};
