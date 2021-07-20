import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/category',
  message: 'Category fetched successfully',
})
export class CategoryApi extends SmurfResponse {

  async run() {
    this.result = 'index api for Category';
  }
}

@SmurfAction({
  action: '/category/:id',
  message: 'Category fetched successfully',
})
export class CategoryGetByIdApi extends SmurfResponse {

  async run() {

    this.result = 'index api for Category';
  }
}