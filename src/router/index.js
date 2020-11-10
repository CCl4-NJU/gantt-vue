import Vue from 'vue'
import Router from 'vue-router'
import table from '../components/views/Table.vue'
import order from '../components/views/orderView.vue'
import product from '../components/views/productView.vue'
import resource from '../components/views/resourceView.vue'
import resControll from '../components/views/res_ControllView.vue'
import mainView from '../components/views/mainView.vue'
import Config from '../components/views/Config.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: mainView,
      // redirect: '/order'
    },
    {
      path: '/table',
      name: 'table',
      component: table
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/product',
      name: 'product',
      component: product
    },
    {
      path: '/resource',
      name: 'resource',
      component: resource
    },
    {
      path: '/resControll',
      name: 'resControll',
      component: resControll
    },
    {
      path: '/config',
      name: 'config',
      component: Config
    }
  ]
})
