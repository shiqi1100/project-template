<template>
  <div class="main">
    这是详情。。。
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
    <div>
      <welcome-item></welcome-item>
    </div>
    <div>
      <modal></modal>
    </div>
    <div style='width: 500px; margin-left: 350px'>
      <my-form/>
      <div class='in'>
        <div class='inn'>
          <span>你好</span>
          <span>世界</span>
        </div>
        <div>
          图表。。
        </div>

      </div>

    </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WelcomeItem from "@/components/WelcomeItem.vue";
import Modal from "@/components/modal.vue";
import MyForm from '@/components/MyForm.vue'
</script>

<style lang="less" scoped>
.main {
  margin-top: 30px;
}
.in {
  width: 200px;
  height: 200px;
  border: 1px solid gray;
  //display: flex;
  //justify-content: space-between;
  .inn {
    display: flex;
    justify-content: space-between;
  }
}

</style>
