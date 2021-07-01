import { ChangeEvent, Component, FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';

// import ReactDOM from 'react-dom';
import CreateAccountHeader from './CreateAccountHeader';
import InputSection from './InputSection';


export default class CreateAccountForm extends Component<{},{ username: string, password: string, selected: string, hidePass: boolean}> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      selected: '',
      hidePass: true
    }
    this.setState = this.setState.bind(this);
    this.handleInputFieldSelection = this.handleInputFieldSelection.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputFieldSelection(event: FormEvent) {
    event.preventDefault();
    this.setState({ selected: event.target.name })
  }

  handleInput(event: ChangeEvent) {
    event.preventDefault();
    const field = event.target.name;
    const { value } = event.target;
    this.setState(state => {
      state[field.toLowerCase()] = value;
    });
  }

  togglePasswordVisibility(event: FormEvent) {
    event.preventDefault();
    let { hidePass } = this.state;
    hidePass = !hidePass;
    this.setState({ hidePass });
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { username, password} = this.state;
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    console.log(await response.json());
  }

  render () {
    let { selected, hidePass } = this.state;
    let passwordVisibility = hidePass ? 'Show' : 'Hide';
    return (
      <form className={`CreateAccountForm ${styles.form}`} onSubmit={this.handleSubmit}>
        <CreateAccountHeader />
        <InputSection
          field="Username"
          showRules={selected === 'Username'}
          handleSelect={this.handleInputFieldSelection}
          handleInput={this.handleInput}
          hidePass={hidePass}
        />
        <InputSection
          field="Password"
          showRules={selected === 'Password'}
          handleSelect={this.handleInputFieldSelection}
          handleInput={this.handleInput}
          hidePass={hidePass}
        />
        <button onClick={this.togglePasswordVisibility}>
          {passwordVisibility} Password
        </button>
        <button type="submit">
          Create Account
        </button>
      </form>
    )
  }
}


