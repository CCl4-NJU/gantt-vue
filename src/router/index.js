import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/sub/HelloWorld.vue'
import order from '../components/views/orderView.vue'
import product from '../components/views/productView.vue'
import resource from '../components/views/resourceView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: order,
      redirect: '/order'
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
