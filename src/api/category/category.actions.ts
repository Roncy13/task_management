import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/category',
  message: 'Category fetched successfully',
})
export class CategoryApi extends SmurfResponse {

  async run() {
    this.data = 'index api for Category';
  }
}