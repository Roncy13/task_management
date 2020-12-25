import SmurfResponse, { SmurfAction } from '../../core/response';

@SmurfAction({
  action: '/',
})
export class SignUpApi extends SmurfResponse {

  async run() {
    this.data = 'Index Action for sign-up';
  }
}