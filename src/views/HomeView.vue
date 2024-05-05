<script setup lang="ts">
  import { ElOption, ElSelect } from "element-plus";
  import TheCamera from "@/components/TheCamera.vue";
  import TheVideoMode from "@/components/TheVideoMode.vue";
  import { ref } from "vue";

  enum Mode {
    Photo = "photo",
    Video = "video",
  }

  interface IOption {
    mode: Mode;
    name: string;
  }

  const modeList = ref<IOption[]>([
    { name: "Фотография", mode: Mode.Photo },
    { name: "Видео", mode: Mode.Video },
  ]);

  const selectedMode = ref<Mode>(Mode.Video);
</script>

<template>
  <div class="work-page grid gap-[10px]">
    <TheCamera />
    <ElSelect v-model="selectedMode">
      <ElOption
        v-for="mode in modeList"
        :key="mode.mode"
        :label="mode.name"
        :value="mode.mode"
      />
    </ElSelect>
    <TheVideoMode />
  </div>
</template>

<style scoped lang="scss"></style>
