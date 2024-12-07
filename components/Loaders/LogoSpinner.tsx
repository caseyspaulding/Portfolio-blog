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
          src="/images/cs_logo1.png" //  logo
          alt="Logo"
          width={ 100 }
          height={ 100 }
        />
      </div>
    </div>
  );
};

export default LogoSpinner;