import { ChangeEvent, Component, FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';

// import ReactDOM from 'react-dom';
import CreateAccountHeader from './CreateAccountHeader';
import InputSection from './InputSection';
import SuccessScreen from './SuccessScreen';
import { ValidationErrors } from '../api/create_new_account'

export default class CreateAccountForm extends Component<{},{ username: string, password: string, selected: string, hidePass: boolean, validationErrors: ValidationErrors, successfullyCreated: boolean}> {
  constructor(props) {
    super(props);
    this.state = {
      username: 'TEST',
      password: '',
      selected: '',
      hidePass: true,
      validationErrors: {
        password: [],
        username: []
      },
      successfullyCreated: true,
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
    // debugger;
    const { username, password} = this.state;
    let response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    // response = await response.json();
    const responseData = await response.json();
    //result is a boolean which indicates if account creation is valid
    if (responseData.exposed) {
      const alertMessage = 'Your password is exposed';
      alert(alertMessage);
      console.log(alertMessage);
    }
    if (responseData.result) {
      //success screen
    }
    const { errors } = responseData;
    this.displayInvalidCriteria(errors);
  }

  displayInvalidCriteria(errors: ValidationErrors) {
    // const passwordErrors: Array<string> = errors.password;
    // const usernameErrors: Array<string> = errors.username;
    this.setState({ validationErrors: errors });
  }

  render () {
    const { selected, hidePass, validationErrors, successfullyCreated, username } = this.state;
    const passwordVisibility = hidePass ? 'Show' : 'Hide';
    const formView = <InputArea
                      selected={selected}
                      hidePass={hidePass}
                      validationErrors={validationErrors}
                      handleInput={this.handleInput}
                      handleSelect={this.handleInputFieldSelection}
                      togglePasswordVisibility={this.togglePasswordVisibility}
                      passwordVisibility={passwordVisibility}
                    />
    const successView = <SuccessScreen username={username} />
    const display = successfullyCreated ? successView : formView;
    return (
      <form className={`CreateAccountForm ${styles.form}`} onSubmit={this.handleSubmit}>
        <CreateAccountHeader/>
        {/* <Errors validationErrors={validationErrors}/> */}
        {/* <InputSection
          field="Username"
          showRules={selected === 'Username'}
          handleSelect={this.handleInputFieldSelection}
          handleInput={this.handleInput}
          hidePass={hidePass}
          validationErrors={validationErrors}
        />
        <InputSection
          field="Password"
          showRules={selected === 'Password'}
          handleSelect={this.handleInputFieldSelection}
          handleInput={this.handleInput}
          hidePass={hidePass}
          validationErrors={validationErrors}
        />
        <button
          onClick={this.togglePasswordVisibility}
          className={styles.hide_show_button}
        >
          {passwordVisibility}
        </button>
        <button type="submit" className={styles.submit_button}>
          Create Account
        </button> */}
        {display}
      </form>
    )
  }
}

const InputArea = ({ selected, hidePass, validationErrors, handleInput, handleSelect, togglePasswordVisibility, passwordVisibility }) => (
  <>
    <InputSection
      field="Username"
      showRules={selected === 'Username'}
      handleSelect={handleSelect}
      handleInput={handleInput}
      hidePass={hidePass}
      validationErrors={validationErrors}
    />
    <InputSection
      field="Password"
      showRules={selected === 'Password'}
      handleSelect={handleSelect}
      handleInput={handleInput}
      hidePass={hidePass}
      validationErrors={validationErrors}
    />
    <button
      onClick={togglePasswordVisibility}
      className={styles.hide_show_button}
    >
      {passwordVisibility}
    </button>
    <button type="submit" className={styles.submit_button}>
      Create Account
    </button>
  </>
);

