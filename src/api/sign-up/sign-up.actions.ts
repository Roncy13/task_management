import SmurfResponse, { SmurfAction } from '../../core/response';

@SmurfAction({
  action: '/sign-up',
})
export class SignUpApi extends SmurfResponse {

  async run() {
    this.data = 'Index Api for sign-up';
  }
}