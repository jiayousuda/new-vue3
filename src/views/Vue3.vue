<script>
import { defineComponent, h, defineAsyncComponent, ref } from "vue";
import Hbr from '@/components/Hbr.vue'

// ⚠️ 当Elbutton全部注册时，h使用ElButton是应该像'div'一样'ElButton' h('ElButton', {}, '按钮') or <ElButton></ElButton>
//   而不应该 h(ElButton, {}, '按钮')，要不就报错ElButton is undefined

// ⚠️ defineComponent
//   入参
//   ◆ 具有组件选项的对象--> data\methods\create\components\等 如 Vue2组件
//   ◆ 是一个 setup 函数，函数名称将作为组件名称来使用  如 Vue3组件◆
import AsyncComp from "@/components/AsyncComp.vue";
import HighAsyncComp from "@/components/HighAsyncComp.vue";
// ◆ expose
import Parent from "@/components/expose/Parent.vue";
// ◆ 自定义组件
import MyVueElement from "@/hooks/MyVueElement.js";
// ◆ version
import getVueVersion from "@/hooks/updateVersion.js";
// ◆ ref
import RefComp from "@/components/proxy/RefComp.vue";
// ◆ 渲染页面-灵感来自链接平台
import { formConfig } from "@/enums/parseViewData.js";
import { usePopUp } from "@/hooks/usePopUp.js";
import { useWidgetParser } from "@/hooks/useWidgetParser.js";
// ◆ compositionApi 
import Composition from './compositionApi/index'
const { parseView } = useWidgetParser();

export default defineComponent({
  components: {
    Parent,
    MyVueElement,
    RefComp,
    Composition,
    Hbr,
    // 相当于 defAsyncComp: defineAsyncComponent(() => { import('@/components/AsyncComp.vue' )})
    AsyncComp: defineAsyncComponent(() => AsyncComp),
    HighAsyncComp: defineAsyncComponent({
      // ◆ 相当于loader: ()=> import('@/components/HighAsyncComp.vue'),
      loader: () => HighAsyncComp,
      // ◆ 加载异步组件时要使用的组件
      loadingComponent: <div>测试</div>,
      // ◆ 在显示  <div>测试</div> 之前的延迟 | 默认值：200（单位 ms）
      delay: 200000,
      timeout: 30000,
    }),
  },
  setup(props, {}) {
    // ◆ 渲染页面-灵感来自链接平台
    const openList = () => {};
    const openForm = function(data) {
      usePopUp(parseView("FormView", formConfig),{
          onComplete: () => tableAction.reload(),
          id: 1,
          type: "add",
          title: "授权",
        },
        null,
        "FormView"
      )();
    };
    // // 
    // const handleCommand = (event) => {
    //     console.log(event.name)
    // }

    return () =>
      h("div", {}, [
        h("h4", {}, "Vue3"),

        <Hbr />,

        /* <h4> 😊异步组件</h4>,
        h(AsyncComp, { type: "AsyncComp" }, "异步组件"),
        <br />,
        h(HighAsyncComp, { type: "HighAsyncComp" }, ["异步组件的高阶用法"]),

        <Hbr />,

        <h4> 😊expose</h4>,
        h(Parent, { type: "Parent" }),

        <Hbr />,

        <my-vue-element></my-vue-element>,

        <Hbr />,

        <div>已经安装的Vue 的版本号: {getVueVersion()}</div>,

        <Hbr />,

        <RefComp></RefComp>,

        <Hbr />,

        <el-button onClick={() => openList()}>渲染列表</el-button>,
        <el-button onClick={() => openForm()}>渲染表单</el-button>,

        <Hbr />, */
        
        <Composition message={'我是参数'} attrMessage={'我的属性message'} onCommand={(event)=> console.log(event.name)}>
          我是slots
        </Composition>,
        

       

        <Hbr />,
        <ReactiveComp></ReactiveComp>,
        <Hbr />,

        <RefComp></RefComp>,
        <Hbr />,



      ]);
  },
});
</script>

<style></style>
