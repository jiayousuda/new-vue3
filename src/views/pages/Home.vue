<template>
  Home page
</template>

<script>
import BasePage from '@/extends/BasePage.vue'
export default  {
    // 这里也是一个数组
    extends: BasePage,
    created(){
        console.log('我使用了公共属性titlt:---->', this.title)
    }

}
</script>

<style>

</style>