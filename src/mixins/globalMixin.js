export const gloMixin = {
    created(){
        // 但是全局混入的会执行好多次
        // console.log('我是全局混入的钩子函数')
    }
}