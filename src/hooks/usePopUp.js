import { ref } from "vue";
import { useRender } from '@/hooks/useRender.js'

export function usePopUp(type, props, children, id) {
  const popUpRef = ref();
  const onClose = props.onClose;
  props.onClose = () => {
    onClose?.();
    popUpRef.value[1]();
  };
  props.modelValue = true;
  popUpRef.value = useRender({ type, props, id, children }, document.body);
  return popUpRef.value[0];
}
