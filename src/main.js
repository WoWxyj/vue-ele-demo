// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 0-1-2-3-4  router路由的使用方法
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import vueResource from 'vue-resource'

// 1.定义路由， 当前是从其他文件import进来
import goods from '@/components/goods/goods.vue' // 商品
import ratings from '@/components/ratings/ratings.vue' // 评价
import seller from '@/components/seller/seller.vue' // 商家

// 引入mixin文件
import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(vueResource)
Vue.config.productionTip = false

// 2. 定义路由---每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者,只是一个组件配置对象。
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes: [{ path: '/', component: goods },
        { path: '/goods', component: goods },
        { path: '/ratings', component: ratings },
        { path: '/seller', component: seller }
    ],
    linkActiveClass: 'active'
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
    router
}).$mount('#app')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})