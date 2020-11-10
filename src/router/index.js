import Vue from 'vue'
import Router from 'vue-router'
import table from '../components/views/Table.vue'
import order from '../components/views/orderView.vue'
import product from '../components/views/productView.vue'
import resource from '../components/views/resourceView.vue'
import resControll from '../components/views/res_ControllView.vue'
import mainView from '../components/views/mainView.vue'
import OPF from '../components/views/orderPlanForm.vue'
import SOF from '../components/views/subOForm.vue'
import RCF from '../components/views/resCountForm.vue'
import OCF from '../components/views/occupyForm.vue'
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
      path: '/OPF',
      name: 'OPF',
      component: OPF
    },
    {
      path: '/SOF',
      name: 'SOF',
      component: SOF
    },
    {
      path: '/RCF',
      name: 'RCF',
      component: RCF
    },
    {
      path: '/OCF',
      name: 'OCF',
      component: OCF
    },
    {
      path: '/config',
      name: 'config',
      component: Config
    }
  ]
})
