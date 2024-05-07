<script setup lang="ts">
  import { ElOption, ElSelect } from "element-plus";
  import TheCamera from "@/components/TheCamera.vue";
  import TheVideoMode from "@/components/TheVideoMode.vue";
  import { useResultStore } from "@/stores/resultStore";
  import { storeToRefs } from "pinia";

  const { modeList, selectedMode } = storeToRefs(useResultStore());
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
