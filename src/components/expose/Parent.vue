<template>
   <!-- 父组件 -->

   <div>父组件</div>

   <h6>使用子组件:父组件想使用子组件的属性哦</h6>
   <!-- ◆ 🌿要获取子组件的ref 非常重要 -->
   <child ref="childRef"></child>
   {{childRef?.exp}}
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import Child from './Child.vue'
export default defineComponent({
    components:{ Child },
    setup(props, { attrs,emit,slots }) {
        const childRef = ref(null);
        // ◆ 🌿在 onMounted 里面调用非常重要
        onMounted(() => {
            console.log('子组件可暴露属性 ==> ', childRef.value?.exp)
        })
        // ◆ 🌿return childRef非常重要
        return {
            childRef
        }
    },
})
</script>


<style lang="less" scope>
 
</style>