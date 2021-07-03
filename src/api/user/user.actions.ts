import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/user',
  message: 'User fetched successfully',
})
export class UserApi extends SmurfResponse {

  async run() {
    this.data = 'index api for User';
  }
}