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
  import { onBeforeMount, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useNavigationStore } from "@/stores/navigationStore";

  const router = useRouter();

  const { backLink } = storeToRefs(useNavigationStore());
  backLink.value = "/";

  const resultStore = useResultStore();
  const {
    selectedMode,
    resultBlobUrl,
    formModel,
    fileExtensionName,
    formRules,
  } = storeToRefs(resultStore);
  const { fileNameParser } = resultStore;

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

  const cropperButtonHandler = async () => {
    await router.push("/cropper");
  };

  onBeforeMount(async () => {
    if (!resultBlobUrl.value) await router.replace("/");
  });
</script>

<template>
  <div class="grid gap-[10px] grid-rows-[auto,1fr]">
    <ResultVideoPreview v-if="selectedMode === Mode.Video" />
    <ResultImagePreview v-else />
    <ElForm
      class="grid"
      :class="{
        'grid-rows-[auto,auto,1fr]': selectedMode === Mode.Photo,
        'grid-rows-[auto,1fr]': selectedMode === Mode.Video,
      }"
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
        v-if="selectedMode === Mode.Photo"
        type="primary"
        :disabled="!formModel.fileName"
        @click="cropperButtonHandler"
      >
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
      <ElButton
        type="success"
        class="self-end"
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
