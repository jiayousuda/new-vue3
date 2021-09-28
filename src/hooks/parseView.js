import { createAsyncComponent, defineComponent, h } from "vue";
import { ElDrawer } from "element-plus";
const parseView = (code, data) => {
  const WidgetComp = defineComponent({
    name: code,
    props: {
      id: String,
      name: String,
    },
    setup(props, ctx) {
      //    return () => h("div", {}, "hahhhhhhh");
      return () =>
        h(
          "div",
          {
            style:{
                zIndex: 20000,
                position: 'absolute',
                top: '100px',
                width: '500px',
                height: '500px',
                border: '1px solid #191919',
                background: '#fff',
                left: '100px',
              }
          },
          [
            "hahhhhhhh",
                h(
                    ElDrawer,
                    {
                        model:true,
                        title: "我是标题",
                        style: {
                            zIndex: 20000,
                            display:'block'
                        },
                    },
                    h("p", {}, "iiiiii")
                )
          ]
        );
      //   return () => {
      //     h(
      //       'div',
      //       {
      //         style:{
      //             zIndex:2000,
      //             width: '100px',
      //             height: '500px'
      //         }
      //       },
      //       [
      //         <div>我出现了</div>,
      //         // h(
      //         //     ElDrawer,
      //         //     {
      //         //       model:true,
      //         //       title: "我是标题",
      //         //       style: {
      //         //         zIndex: 20000,
      //         //       },
      //         //     },
      //         //     h("p", {}, "hahhhhhhh")
      //         //   )
      //       ]
      //     );
      //   };
    },
  });
  return WidgetComp;
};

export default parseView;
