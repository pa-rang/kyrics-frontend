import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const a = 1;
  const b = 2;
  const c = {
    a: 1,
    b: 2,
    c: 3,
  };
  const d = {
    a,
    b,
    c,
  };
  const e = { a: 1, b: 2, c: 3 };

  return <Component {...pageProps} />;
}
export default MyApp;
