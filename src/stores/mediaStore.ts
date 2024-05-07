import type { ISize } from "@/types";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export const useMediaStore = defineStore("mediaStore", () => {
  const router = useRouter();

  const mediaStream = ref<MediaStream | null>(null);
  const isMediaStreamLoading = ref<boolean>(true);
  const isLoadingError = ref<boolean>(false);

  const originalSize = ref<ISize>({
    height: 0,
    width: 0,
  });

  const mediaConstraints = ref<MediaStreamConstraints>({
    video: true,
    audio: true,
  });

  const initMediaStream = async () => {
    try {
      mediaStream.value = await navigator.mediaDevices.getUserMedia(
        mediaConstraints.value,
      );
    } catch (e) {
      // Так как аудио не обязательно, то пробуем получить разрешение ещё раз, но уже без аудио
      if (mediaConstraints.value.audio) {
        mediaConstraints.value.audio = false;
        await initMediaStream();
      } else {
        console.log(e);
        isLoadingError.value = true;
      }
    } finally {
      isMediaStreamLoading.value = false;
    }
  };

  watch(
    isLoadingError,
    async () => {
      if (isLoadingError.value) await router.replace("/error");
    },
    { immediate: true },
  );

  return {
    mediaStream,
    isMediaStreamLoading,
    isLoadingError,
    initMediaStream,
    originalSize,
  };
});
