<template>
   <h3>reactive函数基本使用</h3>

   <div>
       <!-- {{counter}} -->
       {{state.counter}}
       <el-button @click="increment">increment</el-button>
   </div>
</template>

<script >
import { defineComponent, reactive,toRefs,toRef } from 'vue'
// 响应式API
export default defineComponent({
    setup(props) {

        // let counter = 100
        // const increment = () => {
        //     counter++;
        //     console.log(counter)
        // }
        
        // 😊 reactive要求传入对象 or 数组类型
        const state = reactive({counter: 100})
        const increment = () => {
            state.counter++;
            console.log(state.counter)
        }
        return {
            // counter,
            state,
            increment
        }
    },
})




function createReactiveObject(target,isReadonly,baseHandlers,collectionHandlers,proxyMap) {
  // 如果目标不是对象，直接返回原始值
  // 说明--基础数据类型并不会被转换成代理对象   
  if (!isObject(target)) {
    return target
  }
  // 目标已经存在对应的代理对象,直接返回这个代理对象
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  // 只有白名单里的类型才能被创建响应式对象
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
   // 当 target 类型是 Array 或 Object 时使用 baseHandlers 处理行为
   // 当 target 类型是 Map、Set、WeakMap、WeakSet 时使用collectionHandlers  处理行为
   // Vue3 仅会对 Array、Object、Map、Set、WeakMap、WeakSet 生成代理   
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  // 将生成的代理对象 存储到 proxyMap的 Map 对象里面。
  // 并且会将已经生成的代理对象缓存进传入的 proxyMap，当这个代理对象已存在时不会重复生成，会直接返回已有对象。   
  proxyMap.set(target, proxy)
  return proxy
}

// baseHandlers 中的 get 和 set 陷阱

// get  ----- 由 createGetter 函数生成的

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {}
}

// set 也有一个 createSetter 的工厂函数，也是通过柯里化的方式返回一个 set 函数。
// obj = {foo: 1}
// obj.foo = 1
function createSetter(shallow = false) {
  return function set(
    target, // obj
    key, // foo
    value, // 2
    receiver // Proxy{foo: 1}
  ) {
    let oldValue = (target)[key] // 1
    if (!shallow) {
      value = toRaw(value) 
      oldValue = toRaw(oldValue)
      // 当不是 shallow 模式时，判断旧值是否是 Ref，如果是则直接更新旧值的 value
      // 如果是对象 && 原来的值是ref类型 && 现在要赋的值不是ref类型   
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value // 将旧值.value = 新值
        return true
      }
    } else {
      // shallow 模式不需要特殊处理，对象按原样 set
    }
		
    // 判断 target 中是否存在 key
    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    // Reflect.set 获取默认行为的返回值
    const result = Reflect.set(target, key, value, receiver)
    // 如果目标是原始对象原型链上的属性，则不会触发 trigger 派发更新
    if (target === toRaw(receiver)) {
      // 使用 trigger 派发更新，根据 hadKey 区别调用事件
      if (!hadKey) {
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }
}


</script>


<style lang="less" scope>
 
</style>