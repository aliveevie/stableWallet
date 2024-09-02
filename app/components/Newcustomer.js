import styles from '../styles/NewCustomer.module.css';

const NewCustomer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src="/path_to_astronaut_image.png" alt="Astronaut" className={styles.image} />
      </div>
      <div className={styles.title}>Explore Web3</div>
      <div className={styles.subtitle}>Step into the Future with Meteor</div>

      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Claim your identity"
          className={styles.inputField}
        />
      </div>
      <div className={styles.availability}>fairuser5139.near is available.</div>

      <div className={styles.formGroup}>
        <label className={styles.ledgerOption}>
          <input type="checkbox" /> Use ledger device
        </label>
      </div>

      <button className={styles.button}>Create Wallet</button>
    </div>
  );
};

export default NewCustomer;
