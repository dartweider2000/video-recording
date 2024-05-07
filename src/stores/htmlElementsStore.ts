import { defineStore } from "pinia";
import { ref } from "vue";

export const useHtmlElementsStore = defineStore("htmlElementsStore", () => {
  const streamVideoEl = ref<HTMLVideoElement | null>(null);

  return {
    streamVideoEl,
  };
});
