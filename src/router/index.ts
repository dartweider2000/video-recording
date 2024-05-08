import { createRouter, createWebHistory, useRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useMediaStore } from "@/stores/mediaStore";
import { storeToRefs } from "pinia";
import { useNavigationStore } from "@/stores/navigationStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/result",
      component: async () => await import("@/views/ResultView.vue"),
    },
    {
      path: "/cropper",
      component: async () => await import("@/views/CropperView.vue"),
    },
  ],
});

router.beforeEach(async ({ path: toPath }, { path: fromPath }) => {
  const { isLoadingError } = storeToRefs(useMediaStore());
  const { transitionName } = storeToRefs(useNavigationStore());

  if (isLoadingError.value) return { path: "/error" };

  const getLastPath = (path: string) => path.split("/").pop() || "/";

  const toLastPath = getLastPath(toPath);
  const fromLastPath = getLastPath(fromPath);

  if (toLastPath === fromLastPath) return true;

  if (
    toLastPath === "/" ||
    (toLastPath === "result" && fromLastPath === "cropper")
  ) {
    transitionName.value = "back";
  } else {
    transitionName.value = "front";
  }

  return true;
});

export default router;
