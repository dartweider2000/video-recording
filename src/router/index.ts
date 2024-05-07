import { createRouter, createWebHistory, useRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useMediaStore } from "@/stores/mediaStore";
import { storeToRefs } from "pinia";
import ResultView from "@/views/ResultView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/result",
      component: ResultView,
    },
  ],
});

router.beforeEach((_, __, next) => {
  const { isLoadingError } = storeToRefs(useMediaStore());

  if (isLoadingError.value) useRouter().replace("/error");
  else next();
});

export default router;
