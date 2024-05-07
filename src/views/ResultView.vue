<script setup lang="ts">
  import ResultImagePreview from "@/components/Result/ResultImagePreview.vue";
  import ResultVideoPreview from "@/components/Result/ResultVideoPreview.vue";
  import { useResultStore } from "@/stores/resultStore";
  import { storeToRefs } from "pinia";
  import { Mode } from "@/types";
  import {
    ElButton,
    ElForm,
    ElFormItem,
    ElIcon,
    ElInput,
    type FormInstance,
  } from "element-plus";
  import { onUnmounted, ref } from "vue";

  const resultStore = useResultStore();
  const {
    selectedMode,
    resultBlobUrl,
    formModel,
    fileExtensionName,
    formRules,
  } = storeToRefs(resultStore);
  const { fileNameParser, refreshFileName } = resultStore;

  const formInstance = ref<FormInstance | null>(null);

  const downloadHandler = async () => {
    const isFromValid = await formInstance.value?.validate();
    if (!isFromValid) return;

    const link = document.createElement("a");
    link.setAttribute("href", resultBlobUrl.value);
    link.setAttribute(
      "download",
      `${formModel.value.fileName}${fileExtensionName.value}`,
    );

    link.click();
  };

  onUnmounted(() => {
    refreshFileName();
  });
</script>

<template>
  <div class="grid gap-[10px] grid-rows-[auto,1fr]">
    <ResultVideoPreview v-if="selectedMode === Mode.Video" />
    <ResultImagePreview v-else />
    <ElForm
      class="grid content-between"
      :model="formModel"
      :rules="formRules"
      ref="formInstance"
      label-position="top"
      :hide-required-asterisk="true"
    >
      <ElFormItem label="Имя файла" prop="fileName">
        <ElInput
          v-model.trim="formModel.fileName"
          placeholder="Имя файла"
          :formatter="(v: string) => v"
          :parser="fileNameParser"
        >
          <template #append>{{ fileExtensionName }}</template>
        </ElInput>
      </ElFormItem>
      <ElButton
        type="success"
        :disabled="!formModel.fileName"
        @click="downloadHandler"
      >
        <ElIcon class="el-icon--left" :size="20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
          </svg>
        </ElIcon>
        Скачать
      </ElButton>
    </ElForm>
  </div>
</template>

<style scoped lang="scss">
  :deep(.el-form-item__label) {
    @apply text-[16px] font-medium;
  }

  :deep(.el-input) {
    @apply text-[16px];
  }

  :deep(.el-form-item) {
    @apply m-0;
  }

  :deep(.el-form) {
    @apply grid gap-[20px];
  }
</style>
