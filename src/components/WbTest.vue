<template>
  <div class="table-container">
    <VueDraggableNext
      class="column-config-box"
      :list="state.columns"
      handle=".move"
      @change="draggableChange"
    >
      <transition-group name="fade">
        <div
          class="column-config-box-item"
          v-for="item of state.columns"
          :key="item.dataIndex"
        >
          <el-checkbox v-model="item.checked">{{ item.title }}</el-checkbox>
          <span class="drag-icon move"></span>
        </div>
      </transition-group>
    </VueDraggableNext>
    <el-table :data="state.listData" style="width: 100%">
      <el-table-column
        v-for="item in tableColumns"
        :key="item.dataIndex"
        :prop="item.dataIndex"
        :label="item.title"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { computed, reactive } from 'vue'

const state = reactive({
  listData: [
    {
      time: '2023',
      cdName: 'foo',
      profileName: '18156224704',
      key: 1
    },
    {
      time: '2022',
      cdName: 'bar',
      profileName: '18156224704',
      key: 2
    }
  ],
  columns: [
    { title: '时间', dataIndex: 'time', width: '100px', checked: true },
    { title: '部门', dataIndex: 'cdName', width: '100px', checked: true },
    { title: '姓名', dataIndex: 'profileName', width: '105px', checked: true }
  ]
})

const tableColumns = computed(() => {
  return state.columns.filter(item => item.checked)
})

function draggableChange(val: any) {
  // console.log(val, 'line 57 57 57 57')
}
</script>

<style scoped lang="less">
.column-config-box-item {
  display: flex;
  align-items: center;
}

.drag-icon {
  display: block;
  height: 36px;
  width: 36px;
  background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjOUNBNkI5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii42Ij48cGF0aCBkPSJNMiA0aDEydjFIMnpNMiA3aDEydjFIMnpNMiAxMGgxMnYxSDJ6Ii8+PC9nPjwvc3ZnPg==')
  no-repeat center center;
  cursor: pointer;
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
