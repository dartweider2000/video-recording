<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const path = computed(() => route.path);

  const showBackArrow = ref<boolean>(false);

  watch(
    path,
    () => {
      showBackArrow.value = path.value !== "/";
    },
    { immediate: true },
  );

  const backButtonClickHandler = async () => {
    await useRouter().push("/");
  };
</script>

<template>
  <header class="flex justify-center items-center py-[5px] relative">
    <button
      v-if="showBackArrow"
      class="absolute left-0 top-[50%] translate-y-[-50%] pr-[5px] py-[5px]"
      @click="backButtonClickHandler"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style="fill: rgba(0, 0, 0, 1)"
      >
        <path
          d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"
        ></path>
      </svg>
    </button>
    <h1 class="text-[20px] font-bold">Nekit</h1>
  </header>
</template>

<style scoped lang="scss"></style>
