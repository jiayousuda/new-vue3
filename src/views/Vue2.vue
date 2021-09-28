<template>
  {{title}} ｜
  <el-button @click="updataVersion">updata version</el-button>
</template>

<script >
import { defineComponent } from 'vue'
// ◆ mixin
import { basicMixin } from '@/mixins/basicMixin'
// ◆ 向下兼容也可以在composition api中使用 options选项 vue2语法
export default defineComponent({
    // ◆ mixin通常对应的是数组类型
    //   是因为此组件不仅混入一个混入对象，应该是多个对象，因此这里相当于数组对象
    mixins:[ basicMixin ],
    data(){
        return {
            title:'Vue2',
            message:'xiang cai'
        }
    },
    created(){
        console.log('我是组件created',this.message) //我是组件created xiang cai
    },
    mounted(){
       console.log('我是组件mounted')
    },
    methods:{
        updataVersion(){
            this.title = 'Vue3'
        }
    }
})
</script>


<style>

</style>