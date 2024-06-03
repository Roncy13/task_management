import { inBody, inQuery, inParam } from '@utilities/constants';
import { Schema }  from 'express-validator';
import { ETaskStatus } from './tasks.enums';

/**
 * Change the [sampleFieldName] to the property you are using.
 * Change the Field Name to the name of the property you are using.
 * In Body just tells that the schema be used in the Body section of the request.
 */

export const TasksSchema: Schema = {
  title: {
    ...inBody,
    notEmpty: {
      errorMessage: 'Title is required'
    }
  },
  status: {
    ...inBody,
    notEmpty: {
      errorMessage: 'Status is required'
    },
    isIn: {
      options: [Object.values(ETaskStatus)]
    }
  },
  description: {
    ...inBody,
    notEmpty: {
      errorMessage: 'Description is required'
    }
  },
};

export const BodyTaskIdSchema: Schema = {
  id: {
    ...inBody,
    notEmpty: {
      errorMessage: 'id is required'
    }
  },
}

export const QueryTaskIdSchema: Schema = {
  id: {
    ...inQuery,
    notEmpty: {
      errorMessage: 'id is required'
    }
  },
}

export const PathTaskIdSchema: Schema = {
  id: {
    ...inParam,
    notEmpty: {
      errorMessage: 'id is required'
    }
  },
}

export const UpdateTaskSchema: Schema = {
  ...TasksSchema,
  ...PathTaskIdSchema,
};