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
    <div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WelcomeItem from "@/components/WelcomeItem.vue";
import Modal from "@/components/modal.vue";
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
