import type { NextApiRequest, NextApiResponse } from 'next';
import passwordExposed from 'src/pages/api/password_exposed';
interface CreateNewAccountParameters {
  username: string;
  password: string;
}

type InvalidField = "username" | "password";
type ValidationCriteria = "Length" | "Symbol" | "Letter" | "Number";
export type ValidationErrors = Record<InvalidField, Array<ValidationCriteria>>;

interface CreateNewAccountResult {
  result: boolean;
  //example errors: { Username: ["Length"], Password: ["Symbol"]}
  //this would indicate the username is not a valid length and the password is invalid due to a missing symbol
  errors?: ValidationErrors;
  exposed?: boolean
}

export default async function createNewAccount(req: NextApiRequest, res: NextApiResponse<CreateNewAccountResult>) {
  const accountParams: CreateNewAccountParameters = JSON.parse(req.body);
  const usernameIssues: Array<ValidationCriteria> = isValidUsername(accountParams.username);
  const passwordIssues: Array<ValidationCriteria> = isValidPassword(accountParams.password);
  const validationResult: CreateNewAccountResult = {
    result: (usernameIssues.length + passwordIssues.length === 0),
  };
  if(usernameIssues.length + passwordIssues.length !== 0) {
    validationResult.errors = {
      username: usernameIssues,
      password: passwordIssues
    }
  }
  let body = JSON.stringify({ password: accountParams.password });
  // const response = await fetch('/api/password_exposed', {
  //   method: 'POST',
  //   body: JSON.stringify({ password: accountParams.password }),
  // });
  // const { result } = await response.json();
  const result = await isPasswordExposed(accountParams.password);

  //result is a boolean which indicates if the given password has been exposed
  if (result) {
    validationResult.exposed = true;
    res.status(200).json(validationResult);
  } else {
    validationResult.exposed = false;
    res.status(200).json(validationResult);
  }

}

//HELPER FUNCTIONS (edit these to adjust validation requirements)
export function isValidUsername(username: string): Array<ValidationCriteria> {
  return (username.length >= 10 && username.length <= 50) ? [] : ["Length"];
}

//test these functions
//takes in a password to test
//outputs an array of all incomplete criteria (ex. ['Length', 'Symbol'])
export function isValidPassword(password: string): Array<ValidationCriteria> {
  let hasSymbol: boolean = false;
  let hasLetter: boolean = false;
  let hasNumber: boolean = false;
  let result: Array<ValidationCriteria> = [];
  if (password.length < 20 || password.length > 50) result.push('Length');
  for (let i = 0; i < password.length; i++) {
    let currentChar = password[i];
    if(!hasSymbol && isSymbol(currentChar)) hasSymbol = true;
    if(!hasLetter && isLetter(currentChar)) hasLetter = true;
    if(!hasNumber && isNum(currentChar)) hasNumber = true;
    if (hasSymbol && hasLetter && hasNumber) break;
  }
  if (!hasSymbol) {
    result.push('Symbol');
  }
  if (!hasLetter) {
    result.push('Letter');
  }
  if (!hasNumber) {
    result.push('Number');
  }
  return result;
}

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

async function isPasswordExposed(password) {
  const response = await fetch('http://localhost:3000/api/password_exposed', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
  const data =  await response.json();
  return data;
}