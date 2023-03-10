import { request } from "@/utils/http";
import type { LoginParams } from "@/api/login/type";

export const login = (params: LoginParams) => {
  return request.post({
    url: 'main/login.do',
    params
  })
}