import Head from 'next/head';
import styles from 'src/styles/create_account.module.scss';
import CreateAccountForm from './components/CreateAccountForm';



export default function CreateAccount() {

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <CreateAccountForm />
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
