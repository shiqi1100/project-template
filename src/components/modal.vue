<template>
  <div>
    <el-button text @click="dialogVisible = true"> click to open the Dialog </el-button>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
      <span><el-input v-model="input"></el-input></span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="OK"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { inputStore } from '@/stores/input'
const dialogVisible = ref(false)
const input = ref('')
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const OK = () => {
  dialogVisible.value = false
  inputStore().inputVal = input.value
  input.value = ''
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
