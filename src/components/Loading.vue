<template>
  <v-dialog v-model="isLoading" persistent width="300">
    <v-card class="d-flex flex-column align-center justify-center pa-6">
      <v-progress-circular
        indeterminate
        size="48"
        width="5"
      />
      <v-card-text class="text-center">กรุณารอสักครู่ ...</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLoadingStore } from "../stores/loading";

const useLoading = useLoadingStore();
const isLoading = ref(useLoading.isLoading);
</script>

<style scoped>
</style>
