import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavigationStore = defineStore("navigationStore", () => {
  const backLink = ref<string>("/");

  return {
    backLink,
  };
});
