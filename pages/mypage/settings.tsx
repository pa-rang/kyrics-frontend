import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import Main from '@components/settings/Main';
import React from 'react';

function Settings() {
  return (
    <div>
      <Header isLoggedIn={true} />
      <Main />
      <Footer />
    </div>
  );
}

export default Settings;
