import Head from 'next/head';
import { FormEvent } from 'react';
// import Logo from 'images/wealthfrontlogo.png';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    console.log(await response.json());
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <header className={styles.headline}>
          <img src="images/wealthfrontlogo.png" className={styles.logo}/>
          <h1 className={styles.title}>
            Create New Account
          </h1>
        </header>
        <form className={styles.form} onSubmit={handleSubmit}>
          <section className={styles.username}>
            <h2 className={styles.field_title}>
              Username
            </h2>
            <input type="text" className={styles.text_input}/>
            <small>
              USERNAME RULES
            </small>
          </section>
          <section className={styles.password}>
            <h2 className={styles.field_title}>
              Password
            </h2>
            <input type="text" className={styles.text_input}/>
            <small>
              PASSWORD RULES
            </small>
          </section>
          <button>Create Account</button>
        </form>
      </article>
    </>
  );
}

/*
  <article (page wrapper) flex col>
    <header>
      <Logo (img tag)/>
      <h1>Create Account<h1>
    <header/>
    <form>
      <UsernameInput (either p or section)>
        <h2>Username<h2>
        <text input />
        <username rules (small) />
      <UsernameInput />
      <PasswordInput (either p or section)>
        <h2>Password<h2>
        <text input>
        <password rules (small) />
      <PasswordInput/>
      <SubmitBtn />
    <form/>
  <article/>
*/
