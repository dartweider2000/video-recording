import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useVariablesStore = defineStore("variablesStore", () => {
  const computedStyles = ref<CSSStyleDeclaration>(
    window.getComputedStyle(document.documentElement),
  );
  const html = document.documentElement as HTMLElement;

  enum Variable {
    WebCaptureHeight = "--web-capture-height",
    WebCaptureWidth = "--web-capture-width",
    MaxContainerWidth = "--max-container-width",
    ContainerPadding = "--container-padding",
  }

  const getProperty = (
    propertyName: Variable,
    toInt: boolean = true,
  ): number | string => {
    const val = computedStyles.value.getPropertyValue(propertyName);

    if (toInt) return parseInt(val);
    return val;
  };

  const _webCaptureWith = ref<number>(
    getProperty(Variable.WebCaptureWidth) as number,
  );
  const _webCaptureHeight = ref<number>(
    getProperty(Variable.WebCaptureHeight) as number,
  );

  const maxContainerWidth = computed(
    () => getProperty(Variable.MaxContainerWidth) as number,
  );
  const containerPadding = computed(
    () => getProperty(Variable.ContainerPadding) as number,
  );

  const webCaptureHeight = computed({
    get: () => _webCaptureHeight.value,
    set: (v: number) => {
      html.style.setProperty(Variable.WebCaptureHeight, `${v}px`);
      _webCaptureHeight.value = v;
    },
  });

  const webCaptureWidth = computed({
    get: () => _webCaptureWith.value,
    set: (v: number) => {
      html.style.setProperty(Variable.WebCaptureWidth, `${v}px`);
      _webCaptureWith.value = v;
    },
  });

  return {
    webCaptureHeight,
    webCaptureWidth,
    containerPadding,
    maxContainerWidth,
  };
});
