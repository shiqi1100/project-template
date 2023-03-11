import { request } from "@/utils/http";
import type { LoginParams } from "@/api/login/type";

export const login = (params: LoginParams) => request.dataPost({ url: "main/login.do", data: params })