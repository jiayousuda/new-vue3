// 自定义组件
import { defineCustomElement,h } from 'vue'
export const MyVueElement = defineCustomElement({
  setup(props){
     return ()=> h('div',{},'我是自定义组件')
  }
})
// 注册该自定义元素。
// 注册过后，页面上所有的 `<my-vue-element>` 标记会被升级。
customElements.define('my-vue-element', MyVueElement)
