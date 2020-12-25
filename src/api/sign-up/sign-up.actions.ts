import SmurfResponse, { SmurfAction } from '../../core/response';

@SmurfAction({
  action: '/test',
})
export class IndexApi extends SmurfResponse {

  async run() {
    this.data = 'index api';
  }
}