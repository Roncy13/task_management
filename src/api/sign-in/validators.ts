import { inBody } from '@utilities/constants';
import { Schema }  from 'express-validator';

export const SignInUserSchema: Schema = {
  userName: {
    ...inBody,
    isLength: {
      errorMessage: 'User Name should be not less than 1 and not greater than 50 characters',
      options: {
        min: 1,
        max: 50,
      }
    }
  },
  password: {
    ...inBody,
    isLength: {
      errorMessage: 'Full Name should be not less than 1 and not greater than 50 characters',
      options: {
        min: 1,
        max: 50,
      }
    }
  }
};