import { ChangeEvent, Component, FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';

// import ReactDOM from 'react-dom';
import CreateAccountHeader from './CreateAccountHeader';
import InputSection from './InputSection';
import SuccessScreen from './SuccessScreen';
import { ValidationErrors } from '../api/create_new_account'
import ExposedWarning from './ExposedWarning';

export default class CreateAccountForm extends Component<{},{ username: string, password: string, selected: string, hidePass: boolean, validationErrors: ValidationErrors, successfullyCreated: boolean, showExposedWarning: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      selected: '',
      hidePass: true,
      validationErrors: {
        password: [],
        username: []
      },
      successfullyCreated: false,
      showExposedWarning: false,
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

  toggleShowWarning(event: FormEvent) {
    event.preventDefault();
    let { showExposedWarning } = this.state;
    showExposedWarning = !showExposedWarning;
    this.setState({ showExposedWarning });
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { username, password} = this.state;
    let response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    // response = await response.json();
    const responseData = await response.json();
    //result is a boolean which indicates if account creation is valid
    if (responseData.exposed) {
      // const alertMessage = 'Your password is exposed';
      // console.log(alertMessage);
      this.setState({ showExposedWarning: true});
    } else if (responseData.result) {
      //success screen
      this.setState({ successfullyCreated: true });
    }
    const { errors } = responseData;
    this.displayInvalidCriteria(errors);
  }

  displayInvalidCriteria(errors: ValidationErrors) {
    this.setState({ validationErrors: errors });
  }

  render () {
    const { selected, hidePass, validationErrors, successfullyCreated, username, showExposedWarning } = this.state;
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
    const successView = <SuccessScreen username={username}/>
    const display = successfullyCreated ? successView : formView;
    const warning = showExposedWarning ? <ExposedWarning /> : <div />;
    return (
      <form className={`CreateAccountForm ${styles.form}`} onSubmit={this.handleSubmit}>
        <CreateAccountHeader />
        {warning}
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

