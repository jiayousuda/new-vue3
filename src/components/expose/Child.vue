<template>
   <!-- 子组件 -->
   
   <div>子组件:<slot></slot></div>
</template>

<script >
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup(props, { attrs,emit,slots, expose }) {
        const exportRef = ref('我是子组件可暴漏属性')
        const noExposeRef = ref('我是不能暴露的属性')
        // ◆ 🌿 非常重要 ☞ 父组件Parent.vue 就只能访问exportRef, 不能访问noExposeRef
        expose({
            exp: exportRef
        })
        return {
            noExposeRef,
            exportRef
        }
    },
})
</script>


<style lang="less" scope>
 
</style>