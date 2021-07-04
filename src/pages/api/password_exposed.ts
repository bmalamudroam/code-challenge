import type { NextApiRequest, NextApiResponse } from 'next';

interface PasswordExposedParameters {
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

/**
 * You won't need to change anything in this file.
 * Use it as a reference for how to develop the "/api/create_new_account" endpoint.
 */

/*
  To see exposed password warning adjust dummy password below to 'ValidButExposedPassword!1' and try creating an account with that password
*/
export default function passwordExposed(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { password }: PasswordExposedParameters = JSON.parse(req.body);
  if (password === 'weakpass') {
    res.status(200).json({ result: true });
  } else {
    res.status(200).json({ result: false });
  }
}
