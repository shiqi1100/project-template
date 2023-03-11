<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";

const { state: loginState } = storeToRefs(useLoginStore());
</script>

<template>
  <main>
    {{
      loginState.token
    }}
  </main>
</template>
