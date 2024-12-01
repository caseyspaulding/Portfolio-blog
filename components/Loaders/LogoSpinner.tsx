// app/components/Spinner.tsx
import Image from 'next/image';
import React from 'react';
import styles from './LogoSpinner.module.css'; 

const LogoSpinner: React.FC = () =>
{
  return (
    <div className={ styles[ 'spinner-container' ] }>
      <div className={ styles.spinner }></div>
      <div className={ styles[ 'logo-container' ] }>
        <Image
          src="/images/logo_Icon.png" // Replace with the path to your logo
          alt="Logo"
          width={ 50 }
          height={ 50 }
        />
      </div>
    </div>
  );
};

export default LogoSpinner;