"use client";

import styles from './styles/Mobile.module.css';
import Header from './components/Header';
import NewCustomer from './components/Newcustomer';
import StoreCredentials from './components/storeCred';
import View from './components/view';
import Footer from './components/footer';
import Send from './components/send';
import useStore from '@/functions/main';
import { useState } from 'react';

export default function Home() {

  const { state, renderCredential, loadCredentials } = useStore();

  const [ showStart, setShowStart ] = useState(true);


  useState(async () => {
        loadCredentials()
  }, []);

  return (
    <>
      <div className={styles.container} >
            { showStart && <View /> }
            { !showStart && <NewCustomer /> }
            <Footer />
      </div>
    </>
    
  );
}
