import './styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'default-passive-events'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'


// 使用乾坤渲染
renderWithQiankun({
    // 挂载时
    mount (props) {
        console.log('mount');
        render(props)
    },
    bootstrap(){

        console.log('bootstrap');
    },
    // 卸载时
    unmount (props) {
        console.log('unmount', props);
    }
})

//若独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({})
}
// rander函数
function render (props = {}){
    const { container } = props
    console.log('container', container);
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)


    app.mount(container ? container.querySelector('#app') : '#app')
}
