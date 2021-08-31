import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { ITimedText } from 'types';

import Lyrics from './Lyrics';
import TextSizeController from './TextSizeController';
import Translate from './Translate';

interface Props {
  handleLyrics: (line: ITimedText) => void;
  currentTime: number;
  id: number;
}

function LyricsContent({ id, currentTime, handleLyrics }: Props) {
  const [fontSize, setFontSize] = useState('Medium');
  const [isDropDown, setIsDropDown] = useState(false);
  const [engTranslated, setEngTranslated] = useState(false);

  const handleFontSize = (type: string) => {
    if (type === 'Up') {
      if (fontSize === 'Big') {
        return;
      } else if (fontSize === 'Medium') {
        setFontSize('Big');
      } else if (fontSize === 'Small') {
        setFontSize('Medium');
      }
    } else {
      if (fontSize === 'Small') {
        return;
      } else if (fontSize === 'Medium') {
        setFontSize('Small');
      } else if (fontSize === 'Big') {
        setFontSize('Medium');
      }
    }
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TextSizeController handleFontSize={handleFontSize} />
      <Translate
        engTranslated={engTranslated}
        setEngTranslated={setEngTranslated}
        isDropDown={isDropDown}
        setIsDropDown={setIsDropDown}
      />
      <Lyrics
        id={id}
        currentTime={currentTime}
        handleLyrics={handleLyrics}
        fontSize={fontSize}
        engTranslated={engTranslated}
      />
    </>
  );
}

export default LyricsContent;
