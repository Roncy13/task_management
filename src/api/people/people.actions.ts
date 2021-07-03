import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/people',
  message: 'People fetched successfully',
})
export class PeopleApi extends SmurfResponse {

  async run() {
    this.result = 'index api for People';
  }
}