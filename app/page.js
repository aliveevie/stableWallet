import styles from './styles/Mobile.module.css';
import Header from './components/Header';
import NewCustomer from './components/Newcustomer';


export default function Home() {
  return (
    <>
      <div className={styles.container} >
      <NewCustomer />
      </div>
    </>
    
  );
}
