import type { IOption } from "@/types";
import { Mode } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useResultStore = defineStore("resultStore", () => {
  const resultBlobUrl = ref<string>("");
  const videoDuration = ref<number>(0);

  const modeList = ref<IOption[]>([
    { name: "Фотография", mode: Mode.Photo },
    { name: "Видео", mode: Mode.Video },
  ]);

  const selectedMode = ref<Mode>(Mode.Video);

  return {
    resultBlobUrl,
    videoDuration,
    modeList,
    selectedMode,
  };
});
