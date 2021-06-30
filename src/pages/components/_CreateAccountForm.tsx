import { Component } from 'react';
import styles from 'src/styles/create_account.module.scss';

// import ReactDOM from 'react-dom';
import CreateAccountHeader from './CreateAccountHeader';
import InputSection from './InputSection';


export default class CreateAccountForm extends Component<{},{ username: string, password: string, selected: string}> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      selected: ''
    }
    this.setState = this.setState.bind(this);
    this.handleInputFieldSelection = this.handleInputFieldSelection.bind(this);
  }

  handleInputFieldSelection(event) {
    this.setState({ selected: event.target.name })
  }

  render () {
    let { selected } = this.state;
    return (
      <form className={`CreateAccountForm ${styles.form}`}>
        <CreateAccountHeader />
        <InputSection field="Username" showRules={selected === 'Username'} handleSelect={this.handleInputFieldSelection}/>
        <InputSection field="Password" showRules={selected === 'Password'} handleSelect={this.handleInputFieldSelection}/>
        <button>Create Account</button>
      </form>
    )
  }
}