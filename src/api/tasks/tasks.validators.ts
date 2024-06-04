import { inBody, inQuery, inParam } from '@utilities/constants';
import { Schema }  from 'express-validator';
import { EPageSort, ETaskStatus } from './tasks.enums';

/**
 * Change the [sampleFieldName] to the property you are using.
 * Change the Field Name to the name of the property you are using.
 * In Body just tells that the schema be used in the Body section of the request.
 */

const taskStatuses = Object.values(ETaskStatus)

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
      options: [taskStatuses],
      errorMessage: `Task Status should be in ${taskStatuses.join(', ')}`
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

export const DeleteTaskSchema: Schema = {
  ...PathTaskIdSchema
};

export const FilterSchema: Schema = {
  taskStatus: {
    ...inQuery,
    isString: true,
    optional: true,
    isIn: {
      options: [taskStatuses],
      errorMessage: `Task Status should be in ${taskStatuses.join(', ')}`
    }
  },
  title: {
    ...inQuery,
    isString: true,
    optional: true,
  },
  name: {
    ...inQuery,
    isString: true,
    optional: true,
  }
}

export const TaskListSchema: Schema = {
  page: {
    ...inQuery,
    optional: true,
    isInt: {
      errorMessage: 'Page should be a number',
      options: {
        min: 0
      }
    },
  },
  limit: {
    ...inQuery,
    optional: true,
    isInt: {
      errorMessage: 'Limit should be a number',
      options: {
        min: 0
      }
    },
  },
  sort: {
    ...inQuery,
    optional: true,
    isIn: {
      options: [Object.values(EPageSort)]
    }
  },
  ...FilterSchema,
}