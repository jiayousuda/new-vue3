<template>
  <h3>ref函数基本使用</h3>
  <br />
  <p>name: {{ name }}</p>
  <!-- 在模版中使用ref对象，vue会对它进行解包操作 -->
  <p>nameRef: {{ nameRef }}</p>
  <br />

  <el-button @click="updataName">updata name</el-button>

  <br/>
  <div>{{obj.name}}</div>
  <div>{{newObj}}</div>
  <el-button @click="changName">更新name</el-button>

</template>

<script >
import { defineComponent,ref } from 'vue'
// ◆ ref 接收参数并将这个参数包裹在一个带有 value 属性 的对象中返回
//   然后可以使用 value 属性 访问或更改响应式变量的值
export default defineComponent({
    name: "RefComp",
  setup(props, { attrs, emit, slots }) {
    // ◆◆ ref
    let name = "张三";
    // 此时nameRef 不是一个简简单单的字符串了
    // 而是变成了一个 ref 响应式 引用
    let nameRef = ref("张三"); // {value: '张三'}
    

    const updataName = () => {
      name = "李四";
      // 更改
      nameRef.value = "李四";
      // 访问
      console.log(nameRef.value); // 李四
      console.log(nameRef);
    };

    const value1 = 10;
    const value2 = ref(20); 

    // ◆◆ unref
    //    如果参数为 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val。

    console.log("unref====", unref(value1)); // 10
    console.log("unref====", value2.value, unref(value2)); // 20,20
    console.log("unref====", unref(value2) === value2.value); // true

    // ◆◆ isRef
    //    检查值是否为ref对象
    console.log("isRef====", isRef(value1)); // false
    console.log("isRef====", isRef(value2)); // true

    // ◆◆ toRef
    const state1 = reactive({ foo: 1, bar: 2 });
    //    为源响应式对象state1上的 属性foo 创建一个 ref
    //    将 ref 传递出去，从而保持对其源 属性foo 的响应式连接。
    const fooRef = toRef(state1, "foo");
    // 此时fooRef就是一个ref
    console.log("toRef====", fooRef); // ObjectRefImpl {_object: Proxy, _key: "foo", __v_isRef: true} == 相当于在Proxy外面包了一层ref
    console.log("toRef====", fooRef.value); // 1
    
    // 改变ref对象数据 --> 源响应式对象数据也改变
    fooRef.value++;
    console.log(state1.foo); // 2
    // 改变 源响应式对象 --> ref对象 数据也改变
    state1.foo++;
    console.log(fooRef.value); // 3

    // ◆◆ toRefs
    //    将响应式对象转换为 ref对象，返回的对象 的每个 属性 都是指向原始对象相应的 属性 ref
    const state2 = reactive({ foo: 1, bar: 2 });
    const stateAsRefs = toRefs(state2);
    // 将 源响应式对象state2 的每一项属性 都进行 toRef转换 
    // 实际上还是一个普通对象, 但是每一项属性 都已经是 ref 的 响应式对象 ObjectRefImpl
    console.log("toRefs====", stateAsRefs); 
    console.log("toRefs====", {foo: toRef(state2, 'foo'), bar: toRef(state2, 'bar')});
    // 每一项属性 都是 ref 类型 
    console.log("toRefs====", stateAsRefs.foo) // ref
    console.log("toRefs====", stateAsRefs.foo.value) // 1


    // 测试
    console.log('测试1',ref(1))
    console.log('测试2',toRef(1))
    console.log('测试3',ref({a:1}))
    console.log('测试4',toRef({a:1}))
    console.log('测试5',ref(reactive({a:1})))
    console.log('测试6',toRef(reactive({a:1})))



    // ◆◆ ref 和 toRef 
    // 利用ref函数将某个对象中的属性变成响应式数据，修改响应式数据是不会影响到原始数据
    let obj = {name:'zhangsan', age:18}
    // 当change执行的时候，响应式数据发生改变，而原始数据obj并不会改变
    // 当使用ref函数创建的响应式数据，改变会触发UI界面
    // ref的本质是深拷贝，与原始数据没有引用关系
    // let newObj = ref(obj.name) // ref(obj.name) 相当于 ref('zhangsan') 相当于 reactive({value:'alice'})


    // 而如果使用toRef将某个对象中的属性变成响应式数据，修改响应式数据是会影响到原始数据的
    // 如果修改通过toRef创建的响应式数据，并不会触发UI界面的更新
    // toRef的本质是引用，与原始数据有关联，而不是与视图的联动
    let newObj = toRef(obj,'name')

    const changName = () => {
        newObj.value = 'lisi'
        console.log(obj, newObj.value)
    }



    return {
      name,
      nameRef,
      updataName,
      changName,
      obj,
      newObj
    };
  },
})
</script>


<style lang="less" scope>
 
</style>