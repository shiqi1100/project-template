import VAxios from "@/utils/http/Axios";
import { BASE_URL } from "@/utils/http/config";

export const request = new VAxios({
  baseURL: BASE_URL,
  timeout: 10 * 1000
})