import { Component } from 'react';
import styles from 'src/styles/create_account.module.scss';

// import ReactDOM from 'react-dom';
import CreateAccountHeader from './CreateAccountHeader';
import InputSection from './InputSection';


export default class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.setState = this.setState.bind(this);
  }

  render () {
    return (
      <form className={`CreateAccountForm ${styles.form}`}>
        <CreateAccountHeader />
        <InputSection field="username" />
        <InputSection field="password" />
        <button>Create Account</button>
      </form>
    )
  }
}