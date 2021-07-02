import { Component } from 'react';
import styles from 'src/styles/create_account.module.scss';

const InputSection = ({ field, showRules, handleSelect, handleInput, hidePass, validationErrors }) => {
  let rules = showRules ? <RulesBox field={field}/> : <div />;
  let inputType = (field === 'Username' || hidePass === false) ? "text" : "password";
  const validUsername = validationErrors.username.length === 0;
  const validPassword = validationErrors.password.length === 0;
  let textBoxStyle = styles.text_input;
  let inputSectionStyle = styles.valid_input_section;
  if ((field === 'Username' && !validUsername) || (field === 'Password' && !validPassword)) {
    textBoxStyle = styles.invalid_text_input;
    inputSectionStyle = styles.invalid_input_section;
  }
  return (
    <section className={inputSectionStyle}>
      <h2 className={styles.field_title}>
        {field}
      </h2>
      <input
        name={field}
        type={inputType}
        className={textBoxStyle}
        onSelect={handleSelect}
        onChange={handleInput}
        autoComplete="off"
      />
      {rules}
    </section>
  );
};

// const RulesBox = ({ field }) => {
//   // const passwordRules = [
//   //   'between 20 and 50 characters',
//   //   'at least 1 Symbol (!,@,#,$,%)',
//   //   'at least 1 letter (upper or lower case)',
//   //   'at least 1 number (0-9)'
//   // ];
//   // const usernameRules = [
//   //   'between 10 and 50 characters'
//   // ];
//   const rules = (field === 'Username') ? usernameRules : passwordRules;
//   return (
//     <div className={styles.rules}>
//         <RulesList rules={rules} field={field}/>
//     </div>
//   )
// };

const RulesBox = ({ field }) => {
  const usernameMessage = 'Use between 10 and 50 characters';
  const passwordMessage = 'Use between 20 and 50 characters and at least 1 letter, number & symbol';
  const message: string = (field === 'Username') ? usernameMessage : passwordMessage;
  return (
    <small className={styles.rules}>
      {message}
    </small>
  );
}
  // <ul>
  //   {rules.map((rule, index) => (
  //     <li key={`${field}${index}`}>
  //       {rule}
  //     </li>
  //   ))}
  // </ul>

export default InputSection;