import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/products',
  message: 'Products fetched successfully',
})
export class ProductsApi extends SmurfResponse {

  async run() {
    this.result = 'index api for Products';
  }
}