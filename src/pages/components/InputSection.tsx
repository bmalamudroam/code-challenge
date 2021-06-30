import { Component } from 'react';
import styles from 'src/styles/create_account.module.scss';

const InputSection = ({ field, showRules, handleSelect }) => {
  let rules = showRules ? <RulesBox field={field}/> : <div />
  return (
    <section className={styles.username}>
      <h2 className={styles.field_title}>
        {field}
      </h2>
      <input name={field} type="text" className={styles.text_input}  onClick={handleSelect}/>
      {/* <small>
        {field} RULES
      </small> */}
      {rules}
    </section>
  );
};

const RulesBox = ({ field }) => {
  const passwordRules = ['between 20 and 50 characters', 'at least 1 Symbol (!,@,#,$,%)', 'at least 1 letter (upper or lower case)', 'at least 1 number (0-9)'];
  const usernameRules = ['between 10 and 50 characters'];
  const rules = (field === 'Username') ? usernameRules : passwordRules;
  return (
    <div className={styles.rules}>
      <small>
        Must contain:
        <RulesList rules={rules} field={field}/>
      </small>
    </div>
  )
};

const RulesList = ({ field, rules }) => (
  <ul>
    {rules.map((rule, index) => (
      <li key={`${field}${index}`}>
        {rule}
      </li>
    ))}
  </ul>
)

export default InputSection;