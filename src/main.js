import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import { VueCompositionApi } from "vue"
import 'element-plus/dist/index.css'

import { registerGlobComp } from '@/components/registerGlobComp.js'

import '@/design/index.less';

import { gloMixin } from '@/mixins/globalMixin'

// createApp 会返回一个对象 app
const app = createApp(App)
app.mixin(gloMixin)
app.use(VueCompositionApi).use(store).use(router)

registerGlobComp(app)

app.mount('#app')

export default app
