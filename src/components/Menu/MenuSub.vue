<template>
  <div class="container" v-if="props.data">
    <template v-for="item in props.data" :key="item.id">
      <el-sub-menu :index="item.id" class="sq">
        <template #title>
          <span>{{ item.label }}</span>
        </template>
        <template v-if="item.children">
          <el-menu-item v-for="item in item.children" :key="item.id" :index="item.id" @click="changeMenuItem">
            <b-icon
              :name="item.icon"
              :style="{ fontSize: '30px',color: '##242934' }"
            ></b-icon> &nbsp;
             {{ item.label }}</el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts" setup>
import './hooks'
import type { PropsData } from "@/components/Menu/type";
import { useRouter } from "vue-router";
const router = useRouter()

const props = withDefaults(defineProps<{
  data: PropsData[] | null
}>(), {
  data: () => []
})
const changeMenuItem = (key: { index: any; }) => {
  if (key.index === '1-0') {
    router.push({
      name: 'hello-world'
    })
  } else {
    router.push({
      name: 'a'
    })
  }

}

</script>

<style scoped lang="less"></style>
