<template>
  <div class="login">
    <div class="mylogin" align="center">
      <h4>登录</h4>
      <el-form
        :model="formLabelAlign"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
      >
        <el-form-item label="" prop="account" style="margin-top: 10px">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-s-custom"></span>
            </el-col>
            <el-col :span="22">
              <el-input
                class="inps"
                placeholder="账号"
                v-model="formLabelAlign.userName"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="" prop="passWord">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-lock"></span>
            </el-col>
            <el-col :span="22">
              <el-input
                class="inps"
                type="password"
                placeholder="密码"
                v-model="formLabelAlign.passWord"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top: 55px">
          <el-button type="primary" round class="submitBtn" @click="submitForm"
          >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import {useRouter} from "vue-router";
import { useLogin } from "@/views/login/hooks";

const router = useRouter();
const formLabelAlign = reactive({
  userName: '18056090106',
  passWord: '123456'
})
const loginRules = {
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  passWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
};
const submitForm = () => {
  const userAccount = formLabelAlign.userName;
  const userPassword = formLabelAlign.passWord;
  if (!userAccount) {
    return ElMessage({
      type: "error",
      message: "账号不能为空！"
    });
  }
  if (!userPassword) {
    return ElMessage({
      type: "error",
      message: "密码不能为空！"
    });
  }
  useLogin(formLabelAlign, router)
};
</script>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login"
};
</script>

<style scoped>
.login {
  width: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
  font-size: 16px;
  background-position: left top;
  background-color: #242645;
  color: #fff;
  position: relative;
}

.mylogin {
  width: 240px;
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: linear-gradient(
    230deg,
    rgba(53, 57, 74, 0) 0%,
    rgb(0, 0, 0) 100%
  );
}

.inps input {
  border: none;
  color: #fff;
  background-color: transparent;
  font-size: 12px;
}

.submitBtn {
  background-color: transparent;
  color: #39f;
  width: 200px;
}
</style>