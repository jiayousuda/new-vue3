import { isVNode, createApp, createVNode, unref, ref } from "vue";
import { registerGlobComp } from "@/components/registerGlobComp";
import { isElement, isNumber } from "@/utils/is";

const cacheMap = new Map();

export function useRender(node, appendTo, size) {
  const renderId = isVNode(node) ? node : node.id || node.type;

  if (cacheMap.get(renderId)) {
    cacheMap.get(renderId)?.();
    cacheMap.delete(renderId);
  }
  
  const containerRef = ref(document.createElement("div"));
  const appRef = ref();
  const appendToEl = isElement(appendTo)
    ? appendTo
    : document.body.querySelector(appendTo);
  let vm;
  if (isVNode(node)) {
    vm = node;
  } else {
    const { type, props = {}, children } = node;
    vm = createVNode(type, props, children);
  }

  const doDestory = () => {
    if (unref(appRef)) {
      appRef.value?.unmount(unref(containerRef));
      appendToEl?.removeChild(unref(containerRef));
      containerRef.value = null;
      appRef.value = null;
    } else {
      warn("该弹窗已关闭，请检查代码(重复关闭)!");
    }
  };
  const doRender = async () => {
    if (!unref(containerRef)) {
      containerRef.value = document.createElement("div");
    }
    if (unref(appRef)) {
      warn("该弹窗已打开，不能重复打开!");
      return;
    }

    if (size?.width) {
      containerRef.value.style.width = isNumber(size.width)
        ? `${size.width}px`
        : size.width;
    }

    if (size?.height) {
      containerRef.value.style.height = isNumber(size.height)
        ? `${size.height}px`
        : size.height;
    }
    // 😊 appendToEl?.appendChild 入参必须是node
    appendToEl?.appendChild(unref(containerRef));
    const app = createApp(vm);

    registerGlobComp(app);
    app.mount(unref(containerRef));
    appRef.value = app;
    cacheMap.set(renderId, doDestory);
  };
  if (!vm.props) {
    vm.props = {};
  }
  vm.props.onDestroy = () => {
    doDestory();
  };
  return [doRender, doDestory];
}
