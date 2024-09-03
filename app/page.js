"use client";

import styles from './styles/Mobile.module.css';
import Header from './components/Header';
import NewCustomer from './components/Newcustomer';
import StoreCredentials from './components/storeCred';
import View from './components/view';
import Footer from './components/footer';
import Send from './components/send';
import useStore from '@/functions/main';
import { useState, useEffect } from 'react';
import Loader from './components/loader';

export default  function Home() {
  const { state, renderCredential, loadCredentials, initializeDid } = useStore();
  const [showStart, setShowStart] = useState(false);


  const customerfunction = async () => {
    const customer = await state.customerDid
    if(!customer){
       return <Loader />
    }
  }

  customerfunction();

  return (
    <>
      <div className={styles.container}>
        <View />
      </div>
    </>
  );
}