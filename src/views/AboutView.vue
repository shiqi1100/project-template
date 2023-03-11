<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ count }} ========= {{ doubleCount }}
    <div>
      <button @click="addCount">按钮1</button>
    </div>
    {{ count }} ========= {{ doubleCount }}
    <div>
      <button @click="addTemCount">按钮</button>
    </div>
    <br />
    <br />
<!--    <div>-->
<!--      <el-form-->
<!--        label-position="top"-->
<!--        label-width="100px"-->
<!--        :model="formLabelAlign"-->
<!--        style="max-width: 460px"-->
<!--      >-->
<!--        <el-form-item label="手机号">-->
<!--          <el-input v-model="formLabelAlign.userName" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码">-->
<!--          <el-input v-model="formLabelAlign.passWord" />-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
// import { useLoginStore } from '@/stores/login'
// import { reactive } from 'vue'
// import { storeToRefs } from 'pinia'
// import { useLogin } from "@/api/login";
// let { count, doubleCount, state } = storeToRefs(useLoginStore())
// let { increment } = useLoginStore()
// const formLabelAlign = reactive({
//   userName: '18056090106',
//   passWord: '123456'
// })
// const addCount = () => {
//   increment()
// }
// const addTemCount = () => {
//   console.log(state.value.userInfo);
// }

</script>
