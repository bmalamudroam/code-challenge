import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

type InvalidField = "Username" | "Password";
type ValidationCriteria = "Length" | "Symbol" | "Letter" | "Number";

interface CreateNewAccountResult {
  result: boolean;
  //example errors: { Username: ["Length"], Password: ["Symbol"]}
  //this would indicate the username is not a valid length and the password is invalid due to a missing symbol
  errors?: Record<InvalidField, Array<ValidationCriteria>>;
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<CreateNewAccountResult>) {
  const accountParams: CreateNewAccountParameters = JSON.parse(req.body);
  const usernameIssues: Array<ValidationCriteria> = [];
  const passwordIssues: Array<ValidationCriteria> = [];
  //if username is invalid, tell client
  //if password is invalid, tell client
  //if password is exposed, tell client
  //otherwise send client success
  res.status(200).json({ result: true });
}

//HELPER FUNCTIONS (edit these to adjust validation requirements)
function isValidUsername(username: string) {
  return (username.length >= 10 && username.length <= 50);
}

//test these functions
//takes in a password to test
//outputs an array of all incomplete criteria (ex. ['Length', 'Symbol'])
function isValidPassword(password: string) {
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
    if (hasSymbol && hasLetter && hasNumber) return true;
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