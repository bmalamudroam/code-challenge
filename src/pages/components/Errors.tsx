import { Component } from 'react';
import styles from 'src/styles/create_account.module.scss';

const Errors = ({ validationErrors }) => {
  const possiblePasswordErrors = {
    Length: 'between 20 and 50 characters',
    Symbol: 'at least 1 Symbol (!,@,#,$,%)',
    Letter: 'at least 1 letter (upper or lower case)',
    Number: 'at least 1 number (0-9)'
  };
  const possibleUsernameErrors = {
    Length: 'between 10 and 50 characters'
  }
  const passwordErrors = validationErrors.password.map(error => possiblePasswordErrors[error]);
  const usernameErrors = validationErrors.username.map(error => possibleUsernameErrors[error]);
  let usernameErrorList, passwordErrorList;
  if (passwordErrors.length === 0) {
    passwordErrorList = <div />
  } else {
    passwordErrorList = <ErrorList errors={passwordErrors} field="password"/>
  }
  if (usernameErrors.length === 0) {
    usernameErrorList = <div />
  } else {
    usernameErrorList = <ErrorList errors={usernameErrors} field="username"/>
  }
  return (
    <div /*className={styles.errors} */>
      <small>
        {usernameErrorList}
        {passwordErrorList}
      </small>
    </div>
  )
};

const ErrorList = ({ field, errors }) => (
  <>
    <h3>
      Please provide a {field} which contains:
    </h3>
    <ul>
      {errors.map((error, index) => (
        <li key={`${field}${index}`}>
          {error}
        </li>
      ))}
    </ul>
  </>
)

export default Errors;