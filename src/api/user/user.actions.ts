import SmurfResponse, { SmurfAction } from "@core/response";
import { UserGuard } from './user.guard';

@SmurfAction({
  action: '/user',
  message: 'User fetched successfully',
  guards: [UserGuard]
})
export class UserApi extends SmurfResponse {

  async run() {
    this.data = 'index api for User';
  }
}