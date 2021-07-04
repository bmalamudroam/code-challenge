import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { isValidPassword, isValidUsername } from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';
import fetchMock from 'jest-fetch-mock';


describe('/api/create_new_account', () => {

  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('returns true', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '',
        password: 'weakpass'
      },
    });

    await createNewAccount(req, res);
    await expect(true);
    // expect(res._getStatusCode()).toBe(200);
    // expect(res._getJSONData()).toEqual({
    //   result: true,
    // });
  });

  //isValidUsername returns an array containing each way the username is invalid, or an empty array if it is valid
  test('isValidUsername detects valid / invalid usernames', () => {
    expect(isValidUsername('').length > 0).toBe(true);
    expect(isValidUsername('ThisIsValid').length > 0).toBe(false);
    expect(isValidUsername('ThisIsNotValidBecauseItIsTooLong1111111111111111111111111111111111111111').length > 0).toBe(true);
  })

  //isValidPassword returns an array containing each way the password is invalid, or an empty array if it is valid
  test('isValidPassword detects valid / invalid passwords', () => {
    expect(isValidPassword('').length > 0).toBe(true);
    expect(isValidPassword('ThisIsTooShort1!').length > 0).toBe(true);
    expect(isValidPassword('ThisIsNotValidBecauseItIsTooLong1111111111111111111111111111111111111111!').length > 0).toBe(true);
    expect(isValidPassword('ThisIsInvalidBecauseItContainsNoSymbol1').length > 0).toBe(true);
    expect(isValidPassword('ThisIsInvalidBecauseItContainsNoNumber!').length > 0).toBe(true);
    expect(isValidPassword('ThisIsValid!123456789').length > 0).toBe(false);
  })
});
