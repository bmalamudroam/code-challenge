import Head from 'next/head';
import { FormEvent } from 'react';
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
        <form className={styles.form} onSubmit={handleSubmit}>
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
