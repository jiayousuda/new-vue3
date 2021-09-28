<template>
  <!-- attrs 的属性 都自动绑定到了 子组件的根结点==https://vue3js.cn/docs/zh/guide/component-attrs.html#%E5%A4%9A%E4%B8%AA%E6%A0%B9%E8%8A%82%E7%82%B9%E4%B8%8A%E7%9A%84-attribute-%E7%BB%A7%E6%89%BF -->
  <!-- <div class="comps-container" attrmessage="我的属性message" style="color: red;" placeholder="请输入"> -->
  <div class="comps-container">
    <h3>vue3 compositionApi学习</h3>

    <!-- setup参数 -->
    <div class="mt">
      <h3>setup参数</h3>
      <div>props===== {{ message }}</div>
      <div>
        attrs===== {{ attrMessage }} <input v-bind="$attrs" type="text" />
      </div>

      <slot></slot>
      <div>
        <el-button @click="emitCommand">触发 发送emit事件</el-button>
      </div>
    </div>

    <!-- 返回值 -->

    <div>
      <div class="mt">
        <h3>setup返回值-属性</h3>
        <p>data 属性====={{ dataTitle }}</p>
        <p>setup 属性====={{ title }}</p>
      </div>
      <div class="mt">
        <h3>setup返回值-方法</h3>
        <el-button @click="handleSetupFn">调用setup 局部函数</el-button>
        <el-button @click="handleMethodsEvent">调用methods 方法</el-button>
        <el-button @click="handleMethodsEvent"
          >setup 与 methods同名的函数</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
// 如果在acript上定义setup就不需要在选项里写props对象了 <script setup>
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  // mount
  onBeforeMount,
  onMounted,


  toRefs,
  watchEffect,
  reactive,
  watch,
} from "vue";

export default defineComponent({
  name: "Composition",
  props: {
    message: String,
  },
  emits: ["command"],
  inheritAttrs: false,
  data() {
    return {
      title: "哈哈哈哈",
      dataTitle: "我是data中的title，我也可以在tempate里面显示",
    };
  },
  methods: {
    handleMethodsEvent() {
      console.log("调用了vue2 选项method对象 方法");
    },
  },
  beforeCreate() {
    console.log("vue2生命周期---beforeCreate");
  },
  created() {
    console.log("vue2生命周期---created");
  },
  beforeMount() {
    console.log("vue2生命周期---beforeMount");
  },
  mounted() {
    console.log("vue2生命周期---mounted");
  },

  /* 
      😊 参数
        props: https://vue3js.cn/docs/zh/guide/composition-api-setup.html#props
               
               1. 父组件传递过来的属性，放到了子组件的选项props对象中,我们需要在setup中去使用,
                  就可以通过setup的参数获取,因为在源码中将props作为参数传递到setup中
                  并且在template中可以正常使用
               2. 响应式的
                  因为 props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响应性

        context: context 是一个普通的 JavaScript 对象,可以安全地对 context 使用 ES6 解构。
                 setupContext -> setup的上下文对象,暴露了三个属性
                 1. attrs 所有的非prop的 attribute --> this.$attrs --->非响应式对象
                 2. slots: 父组件传递的插槽 (渲染函数返回时才有作用) --->非响应式对象
                 3. emit: 当子组件内部需要发出事件时会用到emit--> this.$emit-->方法
                 ⚠️ attrs 和 slots 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 attrs.x 或 slots.x 的方式引用 属性
      😊 返回值: setup中的返回值可以在模版tempalte中使用
      ⚠️ setup不能使用this
    */

  // 组合式 API 新的组件选项
  setup(props, { attrs, emit }) {
    // ◆◆◆ props是一个响应式的代理对象
    console.log("props", props);
    console.log("props.message", props.message);

    // ◆◆◆ attrs 有状态的对象,不能解构
    //     no-> const { attrMessage } = attrs ; yes-> attrs.attrMessage
    //     该组件并没有相应 props 定义的 属性,不如id、style、class
    //     非 prop attribute 将自动添加到根节点的 attribute 中
    console.log(attrs);
    console.log("attrs", attrs.attrMessage);

    const emitCommand = () => {
      emit("command", { name: "我是name" });
    };

    // ◆◆◆ 生命周期钩子
    console.log("开始执行setup函数了......"); //setup是在所有vue2钩子函数之前就执行
    onBeforeMount(() => {
      console.log("vue3生命周期===onBeforeMount");
    });
    onMounted(() => {
      console.log("vue3生命周期===onMounted");
    });


    // ◆◆◆ getCurrentInstance: 当前应用的实例对象
    const instance = getCurrentInstance();
    console.log("getCurrentInstance", instance?.appContext);

    // ◆◆◆ 局部函数
    const handleSetupFn = () => {
      console.log("调用了vue3 setup函数 局部函数handleSetupFn");
    };
    const handleMethodsEvent = () => {
      console.log("如果setup与methods同名函数,以我为主");
    };

    // ◆◆◆ 计算函数 computed
    const count = ref(1);
    const addOne = computed(() => count + 1); // addOne也是一个 响应式 引用
    console.log(addOne.value);
    console.log(count);

    // ◆◆◆ watchEffect
    //     watchEffect 传入一个函数watchCount2
    //     它立即执行传入的函数watchCount2，并在其依赖变更时重新运行该函数watchCount2
    //     1.响应地 跟踪 其依赖项时 立即运行一个函数a（logs1），并在更改依赖项时重新运行这个函数a（logs2）
    //     2.特点：立即执行一次函数，响应式追踪，依赖变更时重新执行函数
    const count2 = ref(2);
    const watchCount2 = () => {
      console.log("watchEffect====", count2.value);
      
    };
    const stop = watchEffect(watchCount2);
    count2.value++;
    // 1.侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止 2.显式调用返回值以停止侦听
    stop();

    // ◆◆◆ watch
    //     watch API 与选项式 API this.$watch (以及相应的 watch 选项) 完全等效
    //     惰性的 回调是仅在侦听源发生更改时调用
    //     watch 与 watchEffect 的区别
    //      1. 惰性的加载回调,只有在 值改变时才进行加载
    //      2. 能够获取当前值 和 先前值
    // 侦听一个 响应式 数据
    const state = reactive({ count: 0 });
    const watchStateFn = (count, prevCount) => {
      console.log("watch====", count, prevCount);
    };
    watch(() => state.count, watchStateFn);
    state.count++;
    // 直接侦听一个ref
    const count3 = ref(1);
    watch(count3, (count, prevCount) => {
      console.log("watch====", count, prevCount);
    });
    count3.value++

    const title = "我是setup title, 以我为主";
    // 返回对象
    return {
      attrMessage: attrs.attrMessage,
      emitCommand,

      title,
      handleSetupFn,
      handleMethodsEvent,
    };
  },
});
</script>

<style lang="less" scope>
.mt {
  margin-top: 20px;
}
h3{
    color: rgba(50, 197, 153, 0.589); ;
}
</style>
