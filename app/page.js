"use client";

import styles from './styles/Mobile.module.css';
import Header from './components/Header';
import NewCustomer from './components/Newcustomer';
import StoreCredentials from './components/storeCred';
import View from './components/view';


export default function Home() {
  return (
    <>
      <div className={styles.container} >
            <View />
      </div>
    </>
    
  );
}
