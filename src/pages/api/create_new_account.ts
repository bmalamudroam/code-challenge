import type { NextApiRequest, NextApiResponse } from 'next';

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
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<CreateNewAccountResult>) {
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
  res.status(200).json(validationResult);
}

//HELPER FUNCTIONS (edit these to adjust validation requirements)
function isValidUsername(username: string): Array<ValidationCriteria> {
  return (username.length >= 10 && username.length <= 50) ? [] : ["Length"];
}

//test these functions
//takes in a password to test
//outputs an array of all incomplete criteria (ex. ['Length', 'Symbol'])
function isValidPassword(password: string): Array<ValidationCriteria> {
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