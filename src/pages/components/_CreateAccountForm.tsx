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
    //validate username
    if (!isValidUsername(username)) {

    }
    //validate password
    if (!isValidPassword(password)) {

    }
    //check for exposed password
    //if none of the above had issue, post new account
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    console.log(await response.json());
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

// async function isExposedPassword()

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