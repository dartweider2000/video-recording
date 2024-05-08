import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useMediaStore } from "./mediaStore";
import { useResultStore } from "./resultStore";
import { useRouter } from "vue-router";

export const useVideoRecordingStore = defineStore("videoRecordingStore", () => {
  const { mediaStream } = storeToRefs(useMediaStore());
  const router = useRouter();

  const mediaRecorder = ref<MediaRecorder | null>(null);
  const videoDuration = ref<number>(0);

  const isRecordingStarted = ref<boolean>(false);
  const isRecordingOnPause = ref<boolean>(false);

  // Показывает, что запись началась и она не на праузе, а прямой эфир
  const isLive = computed(
    () => isRecordingStarted.value && !isRecordingOnPause.value,
  );

  const startRecording = () => {
    mediaRecorder.value = new MediaRecorder(mediaStream.value!, {
      mimeType: "video/webm",
    });

    mediaRecorder.value.addEventListener(
      "dataavailable",
      async ({ data }: BlobEvent) => {
        const { resultBlobUrl } = storeToRefs(useResultStore());

        resultBlobUrl.value = URL.createObjectURL(data);

        await router.push("/result");
      },
    );

    videoDuration.value = 0;
    mediaRecorder.value.start();

    isRecordingStarted.value = true;
  };

  const pauseRecording = () => {
    isRecordingOnPause.value = !isRecordingOnPause.value;

    if (isRecordingOnPause.value) mediaRecorder.value!.pause();
    else mediaRecorder.value!.resume();
  };

  const stopRecording = () => {
    mediaRecorder.value!.stop();

    isRecordingStarted.value = false;
    isRecordingOnPause.value = false;
  };

  return {
    videoDuration,
    isRecordingStarted,
    isRecordingOnPause,
    isLive,

    startRecording,
    pauseRecording,
    stopRecording,
  };
});
