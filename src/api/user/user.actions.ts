import SmurfResponse, { SmurfAction } from "@core/response";
import { UserGuard } from './user.guard';

@SmurfAction({
  action: '/user',
  message: 'User fetched successfully',
  guards: [UserGuard]
})
export class UserApi extends SmurfResponse {

  async run() {
    this.result = 'index api for User';
  }
}