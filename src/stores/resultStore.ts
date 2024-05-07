import type { IOption, IResultForm } from "@/types";
import { Mode } from "@/types";
import type { FormRules } from "element-plus";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useResultStore = defineStore("resultStore", () => {
  const resultBlobUrl = ref<string>("");
  const videoDuration = ref<number>(0);

  const modeList = ref<IOption[]>([
    { name: "Фотография", mode: Mode.Photo },
    { name: "Видео", mode: Mode.Video },
  ]);

  const selectedMode = ref<Mode>(Mode.Video);

  const formModel = ref<IResultForm>({
    fileName: "my-media",
  });

  const refreshFileName = () => {
    formModel.value.fileName = "my-media";
  };

  const formRules = ref<FormRules<IResultForm>>({
    fileName: [
      {
        required: true,
        message: "Введите имя файла",
        trigger: ["change", "blur"],
      },
    ],
  });

  const fileNameParser = (v: string): string =>
    v.replace(/[^a-zA-z0-9_-]/gi, "");

  const fileExtensionName = computed(() =>
    selectedMode.value === Mode.Video ? ".webm" : ".png",
  );

  return {
    resultBlobUrl,
    videoDuration,
    modeList,
    selectedMode,
    formModel,
    fileExtensionName,
    formRules,
    fileNameParser,
    refreshFileName,
  };
});
