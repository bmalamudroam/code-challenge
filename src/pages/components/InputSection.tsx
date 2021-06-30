import { Component } from 'react';
import styles from 'src/styles/create_account.module.scss';

const InputSection = ({ field }) => (
  <section className={styles.username}>
    <h2 className={styles.field_title}>
      {field}
    </h2>
    <input type="text" className={styles.text_input}/>
    <small>
      {field} RULES
    </small>
  </section>
);

export default InputSection;