import SmurfResponse, { SmurfAction } from "@core/response";
import { HTTP_METHODS } from "@utilities/constants";
import { Request } from 'express';
import { Response } from 'express';
import { UomPolicy } from "./uom.policy";

@SmurfAction({
  action: '/uom',
  message: 'Uom fetched successfully',
})
export class UomApi extends SmurfResponse {

  async run() {
    this.result = 'index api for Uom';
  }
}

@SmurfAction({
  action: '/uom',
  message: 'Uom fetched successfully',
  method: HTTP_METHODS.POST,
  policies: [UomPolicy]
})
export class UomCreateApi extends SmurfResponse {

  async run(req: Request, resp: Response) {
    const { body } = req;

    this.result = body;
  }
}