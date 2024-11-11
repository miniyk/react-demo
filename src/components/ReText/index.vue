<template>
  <el-text
    v-bind="{
      truncated: !lineClamp,
      lineClamp,
      ...$attrs,
    }"
    ref="textRef"
    @mouseover.self="handleHover"
  >
    <slot></slot>
  </el-text>
</template>
<script lang="ts" setup>
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import 'tippy.js/animations/scale.css'
import 'tippy.js/animations/scale-subtle.css'
import 'tippy.js/animations/scale-extreme.css'
import { type TippyOptions, useTippy } from "vue-tippy";

defineOptions({
  name: "ReText",
});

const props = defineProps({
  // 行数
  lineClamp: {
    type: [String, Number],
  },
  tippyProps: {
    type: Object as PropType<TippyOptions>,
    default: () => ({}),
  },
});

const $slots: any = useSlots();

const textRef = ref();
const tippyFunc = ref();

const isTextEllipsis = (el: HTMLElement) => {
  if (!props.lineClamp) {
    // 单行截断，并检查元素的 scrollWidth（即包括溢出内容的宽度）是否大于 clientWidth（即元素不包括溢出内容的可见宽度）
    return el.scrollWidth > el.clientWidth;
  } else {
    // 多行省略判断,检查元素的 scrollHeight（即包括溢出内容的高度）是否大于 clientHeight（即元素不包括溢出内容的可见高度）
    return el.scrollHeight > el.clientHeight;
  }
};

const getTippyProps = () => ({
  content: h($slots.default),
  ...props.tippyProps,
});

function handleHover(event: MouseEvent) {
  if (isTextEllipsis(event.target as HTMLElement)) {
    tippyFunc.value.setProps(getTippyProps());
    tippyFunc.value.enable();
  } else {
    tippyFunc.value.disable();
  }
}

onMounted(() => {
  tippyFunc.value = useTippy(textRef.value?.$el, getTippyProps());
});
</script>
