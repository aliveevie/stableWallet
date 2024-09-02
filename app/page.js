import styles from './styles/Mobile.module.css';
import Header from './components/Header';


export default function Home() {
  return (
    <>
      <div className={styles.container} >
      <Header />
      </div>
    </>
    
  );
}
