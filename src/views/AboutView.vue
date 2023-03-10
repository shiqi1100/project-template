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
import http from '@/utils/http/request-http'
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
  http.post(
      'main/login.do',
      { ...formLabelAlign, terminaltype: 'WEB', auto: 0 },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }
    )
    .then((res) => {
      console.log(res)
    })
}
</script>
