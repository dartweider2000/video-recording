<script setup lang="ts">
  import TheNav from "@/components/TheNav.vue";
  import { onBeforeMount } from "vue";
  import { useMediaStore } from "@/stores/mediaStore";

  const { initMediaStream } = useMediaStore();

  onBeforeMount(async () => {
    await initMediaStream();
  });
</script>

<template>
  <div class="min-h-dvh overflow-hidden pb-[10px]">
    <div
      class="max-w-[--max-container-width] px-[--container-padding] m-auto w-full"
    >
      <TheNav />
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
