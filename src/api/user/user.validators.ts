import { inBody, inParam } from '@utilities/constants';
import { Schema }  from 'express-validator';

/**
 * Change the [sampleFieldName] to the property you are using.
 * Change the Field Name to the name of the property you are using.
 * In Body just tells that the schema be used in the Body section of the request.
 */

export const UserSchema: Schema = {
  name: {
    ...inBody,
    notEmpty: {
      errorMessage: 'name is required'
    },
  },
  email: {
    ...inBody,
    notEmpty: {
      errorMessage: 'email is required'
    },
  },
  password: {
    ...inBody,
    notEmpty: {
      errorMessage: 'password is required'
    },
  }
};

export const ParamUserIdSchema: Schema = {
  id: {
    ...inParam,
    notEmpty: {
      errorMessage: 'id is required'
    },
    isNumeric: {
      errorMessage: 'id should be numeric'
    }
  },
}

export const UpdateUserSchema: Schema = {
  ...ParamUserIdSchema,
  ...UserSchema
}
