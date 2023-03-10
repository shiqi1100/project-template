<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ count }} ========= {{ doubleCount }}
    <div>
      <button @click="addCount">按钮</button>
    </div>
    {{ count }} ========= {{ doubleCount }}
    <div>
      <button @click="addTemCount">按钮</button>
    </div>
    <br />
    <br />
    <div>
      <el-form
        label-position="top"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.passWord" />
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="userLogin">点击登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { reactive } from 'vue'
import { request } from '@/utils/http'
const { count, doubleCount, increment } = useCounterStore()
const formLabelAlign = reactive({
  userName: '',
  passWord: ''
})
const addCount = () => {
  increment()
}
const addTemCount = () => {}

const userLogin = () => {
  const params = {
    userName: formLabelAlign.userName,
    passWord: formLabelAlign.passWord,
    terminaltype: 'WEB',
    auto: 0
  }
  return request.dataPost({ url: "main/login.do",data: params })
    .then((res) => {
      console.log(res)
    })
}
</script>
