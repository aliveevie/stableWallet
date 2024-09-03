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
  const { state, renderCredential, loadCredentials, initializeDid } = useStore();
  const [showStart, setShowStart] = useState(false);
  const [hello, setHello] = useState(false);
  const [ loading, setLoading ] = useState(false);


  useEffect(() => {
    const customerfunction = async () => {
      const customer = await state.customerDid

      const cred = state.customerCredentials;
    

      const Notfound = await customer.uri == "yes";
     
    
      
      if(customer){
         setHello(true)
         setLoading(true)
         setShowStart(true)
      }if(!Notfound && !customer){
        console.log("Not working!")
        setHello(false)
        setLoading(false)
        setShowStart(true)
      }
    }

      customerfunction();
  }, [state.customerDid, state.customerCredentials]);

  const parsedCredentials = useMemo(async () => {
    return state.customerCredentials.map(jwt => {
      const credential = renderCredential(jwt);
    
      return credential; // Make sure to return the credential for rendering or other uses
    });
  }, [state.customerCredentials]); 

 

  return (
    <>
      <div className={styles.container}>

        {/**
         *  { !hello && !loading && !showStart && <Loader /> }
            { hello && loading && showStart && <View />}
         * 
         */}

        <NewCustomer />

      </div>
    </>
  );
}