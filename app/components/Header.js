import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.menuIcon}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.username}>Ibrahim Abdulkarim</div>
        <div>(evletwo.near)</div>
      </div>
      <div className={styles.latency}>1716ms</div>
    </div>
  );
};

export default Header;