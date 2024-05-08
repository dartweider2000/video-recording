<script setup lang="ts">
  import TheNav from "@/components/TheNav.vue";
  import { onBeforeMount } from "vue";
  import { useMediaStore } from "@/stores/mediaStore";
  import { useNavigationStore } from "./stores/navigationStore";
  import { storeToRefs } from "pinia";

  const { initMediaStream } = useMediaStore();
  const { transitionName } = storeToRefs(useNavigationStore());

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
      <RouterView #default="{ Component }">
        <Transition :name="transitionName" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .front-enter-from,
  .back-leave-to {
    @apply opacity-0 translate-x-[200px];
  }

  .front-leave-to,
  .back-enter-from {
    @apply opacity-0 translate-x-[-200px];
  }

  .front-enter-active,
  .front-leave-active,
  .back-enter-active,
  .back-leave-active {
    // @apply transition-all;

    transition: all 0.25s ease 0s;
  }
</style>
