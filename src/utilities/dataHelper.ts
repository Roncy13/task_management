import { isEmpty } from "lodash"
import { SECRET_KEY } from "./constants"

export const CheckEmpty = (data: any) => isEmpty(data)
export const getSecretKey = () => {
  return process.env.SECRET_KEY || SECRET_KEY
}