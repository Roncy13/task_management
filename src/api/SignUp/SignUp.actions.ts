import SmurfResponse, { SmurfAction } from '../../core/response';

@SmurfAction({
  action: '/sign-up',
})
export class SignupApi extends SmurfResponse {

  async run() {
    this.data = 'Index Api for SignUp';
  }
}