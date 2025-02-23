import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      CryptoCrest inc. {new Date(Date.now()).getFullYear()}
    </footer>
  );
};

export default FooterSection;
