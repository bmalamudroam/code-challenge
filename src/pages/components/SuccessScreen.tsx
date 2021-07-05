import { Component } from 'react';
import styles from 'src/styles/success_screen.module.scss';


const SuccessScreen = ({ username }) => {
  return (
    <div className={styles.success_display}>
      Account created! <br />
      Thanks for joining, <br />
      <em className={styles.username_display}>{username}</em>
    </div>
  )
}

export default SuccessScreen;