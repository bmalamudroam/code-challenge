import Head from 'next/head';
import { FormEvent } from 'react';
// import Logo from 'images/wealthfrontlogo.png';
import styles from 'src/styles/create_account.module.scss';
import InputSection from './components/InputSection';
import CreateAccountHeader from './components/CreateAccountHeader';
import CreateAccountForm from './components/_CreateAccountForm';


export default function CreateAccount() {
  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    //validate username
    //validate password
    //check for exposed password
    //if none of the above had issue, post new account
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
        <CreateAccountForm />
      </article>
    </>
  );
}


//HELPER FUNCTIONS (edit these to adjust validation requirements)
function isValidUsername(username: string) {
  return (username.length >= 10 && username.length <= 50);
}

//test these functions
function isValidPassword(password: string) {
  if (password.length < 20 || password.length > 50) return false;
  let hasSymbol = false;
  let hasLetter = false;
  let hasNum = false;
  for (let i = 0; i < password.length; i++) {
    let currentChar = password[i];
    if(!hasSymbol && isSymbol(currentChar)) hasSymbol = true;
    if(!hasLetter && isLetter(currentChar)) hasLetter = true;
    if(!hasNum && isNum(currentChar)) hasNum = true;
    if (hasSymbol && hasLetter && hasNum) return true;
  }
  return false;
}

function isLetter(char: string) {
  const charCode = char.charCodeAt(0);
  return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
}

function isNum(char: string) {
  const charCode = char.charCodeAt(0);
  return (charCode >= 48 && charCode <= 57);
}

function isSymbol(char: string) {
  const symbols = [`!`, `@`, `#`, `$`, `%`];
  return (symbols.indexOf(char) !== -1);
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
