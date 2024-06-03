import IError from '@error-handling/error.interface';
import { StatusCodes } from 'http-status-codes';
import ValidationError from './validation.error';

export default class BadRequestException extends ValidationError {
  errorParams: IError;
  statusCode: number = StatusCodes.BAD_REQUEST;

  constructor (message: string) {
    super({
      message
    })
  }
}