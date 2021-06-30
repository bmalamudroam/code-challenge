import { ChangeEvent, Component, FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';

// import ReactDOM from 'react-dom';
import CreateAccountHeader from './CreateAccountHeader';
import InputSection from './InputSection';


export default class CreateAccountForm extends Component<{},{ username: string, password: string, selected: string, hidePass: boolean}> {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      selected: '',
      hidePass: true
    }
    this.setState = this.setState.bind(this);
    this.handleInputFieldSelection = this.handleInputFieldSelection.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.handleInput = this.handleInput.bind(this);
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
      state[field] = value;
    });
    console.log(this.state.Username);
  }

  togglePasswordVisibility(event: FormEvent) {
    event.preventDefault();
    let { hidePass } = this.state;
    hidePass = !hidePass;
    this.setState({ hidePass });
  }

  render () {
    let { selected, hidePass } = this.state;
    let passwordVisibility = hidePass ? 'Show' : 'Hide';
    return (
      <form className={`CreateAccountForm ${styles.form}`}>
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
        <button>
          Create Account
        </button>
      </form>
    )
  }
}