import styles from 'src/styles/create_account_header.module.scss';

const CreateAccountHeader = () => (
  <header className={styles.headline}>
    <img src="images/wealthfrontlogo.png" className={styles.logo}/>
    <h1 className={styles.title}>
      Create New Account
    </h1>
  </header>
);

export default CreateAccountHeader;