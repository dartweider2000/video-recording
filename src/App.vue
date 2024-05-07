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
  <div class="min-h-dvh overflow-hidden pb-[10px] grid">
    <div
      class="max-w-[--max-container-width] px-[--container-padding] m-auto w-full grid h-full content-start grid-rows-[auto,1fr]"
    >
      <TheNav />
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
