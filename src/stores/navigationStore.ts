import type { TransitionName } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavigationStore = defineStore("navigationStore", () => {
  const backLink = ref<string>("/");
  const transitionName = ref<TransitionName>("none");

  return {
    backLink,
    transitionName,
  };
});
