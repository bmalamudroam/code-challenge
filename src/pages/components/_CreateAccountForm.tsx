import { ChangeEvent, Component, FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';
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
    this.handleWarningBack = this.handleWarningBack.bind(this);
    this.handleWarningProceedAnyway = this.handleWarningProceedAnyway.bind(this);
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
    const { username, password } = this.state;
    let response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      // .catch(alert);
    const responseData = await response.json();
    //result is a boolean which indicates if account creation is valid
    if (responseData.result) {
      //success screen
      if (responseData.exposed) {
        this.setState({ showExposedWarning: true });
      } else {
        this.setState({ successfullyCreated: true });
      }
    } else {
      const { errors } = responseData;
      this.displayInvalidCriteria(errors);
    }
  }

  displayInvalidCriteria(errors: ValidationErrors) {
    this.setState({ validationErrors: errors });
  }

  handleWarningBack(event: FormEvent) {
    event.preventDefault();
    this.setState({ showExposedWarning: false });
  }

  handleWarningProceedAnyway(event: FormEvent) {
    event.preventDefault();
    this.setState({ successfullyCreated: true, showExposedWarning: false });
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
    const warning = showExposedWarning ? <ExposedWarning
      handleBack={this.handleWarningBack} handleProceedAnyway={this.handleWarningProceedAnyway}
    /> : <div />;
    return (
      <form className={`CreateAccountForm ${styles.form}`} onSubmit={this.handleSubmit}>
        <CreateAccountHeader />
        {warning}
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
    <button type="submit" className={styles.submit_button}>
      Create Account
    </button>
    <button
      onClick={togglePasswordVisibility}
      className={styles.hide_show_button}
    >
      {passwordVisibility}
    </button>
  </>
);

