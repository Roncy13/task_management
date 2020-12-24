import SmurfResponse, { SmurfAction } from '../../core/response';
import notAllowedGuard from '../../guards/not-allowed.guard';
import { SignInUserSchema } from './validators';
import { CheckUserNameIfTest } from './sign-in.policies'
import { HTTP_METHODS } from '../../utilities/constants';

@SmurfAction({
  action: '/test',
  method: HTTP_METHODS.POST,
  validation: SignInUserSchema,
  policies: [CheckUserNameIfTest],
  // guards: [notAllowedGuard]
})
export class SignInUser extends SmurfResponse {

  async run() {
    this.data = 'test';
  }
}


@SmurfAction({
  action: '/index',
})
export class IndexApi extends SmurfResponse {

  async run() {
    this.data = 'index';
  }
}