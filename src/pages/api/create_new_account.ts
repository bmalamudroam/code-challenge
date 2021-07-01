import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { username, password } = JSON.parse(req.body);
  console.log(username, password);
  res.status(200).json({ result: true });
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