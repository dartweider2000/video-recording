<script setup lang="ts">
  import { Cropper, CircleStencil } from "vue-advanced-cropper";
  import MediaArea from "@/components/MediaArea.vue";
  import { ref } from "vue";

  const loading = ref<boolean>(true);

  const cropperReadyHandler = () => {};
</script>

<template>
  <MediaArea :loading="loading">
    <Cropper v-show="!loading" :stencil-component="CircleStencil"></Cropper>
  </MediaArea>
</template>

<style scoped lang="scss"></style>
