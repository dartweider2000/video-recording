<script setup lang="ts">
  import TheCropper from "@/components/TheCropper.vue";
  import { useNavigationStore } from "@/stores/navigationStore";
  import { ElButton, ElIcon } from "element-plus";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";

  const { backLink } = storeToRefs(useNavigationStore());
  backLink.value = "/result";

  const toCropp = ref<boolean>(false);

  const croppHandler = async () => {
    toCropp.value = true;
  };
</script>

<template>
  <div class="grid gap-[10px] grid-rows-[1fr,auto]">
    <TheCropper :to-cropp="toCropp" />
    <ElButton type="success" @click="croppHandler" :disabled="toCropp">
      <ElIcon class="el-icon--left" :size="20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            d="M19 7.5C19 6.121 17.879 5 16.5 5H8V2H5v3H2v3h14v14h3v-3h3v-3h-3V7.5z"
          ></path>
          <path d="M8 10H5v6.5C5 17.879 6.121 19 7.5 19H14v-3H8v-6z"></path>
        </svg>
      </ElIcon>
      Обрезать
    </ElButton>
  </div>
</template>

<style scoped lang="scss"></style>
