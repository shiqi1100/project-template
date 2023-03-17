import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import type { LoginParams } from "@/api/login/type";
import { login } from "@/api/login";

const { state: loginState } = storeToRefs(useLoginStore());
export const useLogin = async (state: LoginParams, router: any) => {
  const params: LoginParams = {
    userName: state.userName,
    passWord: state.passWord,
    terminaltype: "WEB",
    auto: 0
  };

  const data = (await login(params))?.data || {};
  const { auth: { accessToken: token } = { accessToken: "" }, companyId, userInfo, authList } = data;

  Object.assign(loginState.value, {
    token,
    companyId,
    userInfo,
    authList
  });

  router.replace({ name: "main-page" });
  ElMessage.success("登录成功");

};
