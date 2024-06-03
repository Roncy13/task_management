import IError from '@error-handling/error.interface';
import { StatusCodes } from 'http-status-codes';

export default class BadRequestException extends Error {
  errorParams: IError;
  statusCode: number = StatusCodes.BAD_REQUEST;

  constructor (message: string) {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name
    this.errorParams = {
      message
    }
  }
}