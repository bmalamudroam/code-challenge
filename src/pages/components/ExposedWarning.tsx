import { Component } from 'react';
import styles from 'src/styles/exposed_warning.module.scss';


const ExposedWarning = ({ handleBack, handleProceedAnyway }) => {
  return (
    <section className={styles.wrapper}>
      <strong className={styles.warning}>Warning!</strong><br/>
      <p className={styles.warning_message}>
        The password you have entered exists<br/>
        in a database of known passwords.<br/>
        Would you like to try a different one?
      </p>
      <button
        className={styles.return_btn}
        onClick={handleBack}
      >
        Return
      </button>
      <button
        className={styles.proceed_btn}
        onClick={handleProceedAnyway}
      >
        <small>Proceed anyway</small>
      </button>
    </section>
  )
}

export default ExposedWarning;