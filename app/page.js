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
import { useMemo } from 'react';


export default  function Home() {
    return (
    <>
      <div className={styles.container} >
            <View />
      </div>
    </>
  );
}