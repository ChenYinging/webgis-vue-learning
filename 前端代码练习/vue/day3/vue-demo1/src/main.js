// 文件核心作用：导入App.vue，基于App.vue创建结构渲染index.html
// 1. 导入 Vue 核心包
import Vue from 'vue'

// 2. 导入App.vue 根组件
import App from './App.vue'

import WebButton from './components/WebButton.vue'

// 提示：当前处于什么环境
Vue.config.productionTip = false

Vue.component('WebButton', WebButton)

// 3. Vue实例化：提供render方法 -> 基于App.vue创建结构渲染index.html
new Vue({
  render: h => h(App),
}).$mount('#app')
