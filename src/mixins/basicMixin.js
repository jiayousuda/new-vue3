// 😊 是一个js文件
// 😊 本质是一个对象（混入对象）
export const basicMixin = {
   data(){
       return {
           message:"hello zhangsan"
       }
   },
   methods:{
       foo(){
           console.log('mixin methods foo')
       }
   },
   created(){
       console.log('mixin created', this.message)// mixin created xiang cai
   },
   mounted(){
       console.log('mixin mounted')
   }
}