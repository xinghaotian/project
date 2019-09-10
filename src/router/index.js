import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  
   

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    },
    {
      name:'driver',
      path: '/driver/:id',
      component: () => import('@/views/driver'),
      hidden: true
    },
    {
      name:'depot',
      path: '/depot/:id',
      component: () => import('@/views/depot'),
      hidden: true
    },
    {
      name:'pact',
      path: '/pact/:id',
      component: () => import('@/views/pact'),
      hidden: true
    },
    {
      name:'details',
      path: '/details',
      component: () => import('@/views/details'),
      hidden: true
    }
  ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form'),
        meta: { title: '店铺信息', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/nestede',
  //   component: Layout,
  //   meta: { title: '订单管理', icon: 'link' },
  //   redirect: '/nested',
  //   name:'Nestede',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'nestede',
  //       component: () => import('@/views/nestede'),
  //       meta: { title: '整车订单', icon: 'link' },
    
        
  //     }
  //   ]
  // },
  {
    path: '/nodetede',
    component: Layout,
    redirect: '/nodetede/index',
    name: 'nodetede',
    meta: { title: '订单管理', icon: 'link' },
    children: [
      {
        path: 'index',
        name: 'Nestede',
        component: () => import('@/views/nestede'),
        meta: { title: '整车订单', icon: 'link' }
      },
      {
        path: 'index1',
        name: 'index1',
        component: () => import('@/views/nestede/index1'),
        meta: { title: '零担订单', icon: 'link' }
      }
      ,
      {
        path: 'index2',
        name: 'index2',
        component: () => import('@/views/nestede/index2'),
        meta: { title: '已完成订单', icon: 'link' }
      }
      ,
      {
        path: 'index3',
        name: 'index3',
        component: () => import('@/views/nestede/index3'),
        meta: { title: '在途订单', icon: 'link' }
      }
      ,
      {
        path: 'index4',
        name: 'index4',
        component: () => import('@/views/nestede/index4'),
        meta: { title: '异常订单', icon: 'link' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '合同制管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table'),
        meta: { title: '合同制列表', icon: 'nested' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree'),
        meta: { title: '添加合同制用户', icon: 'tree' }
      }
    ]
  },
  {
    path: '/cw',
    component: Layout,
    // path: 'index',
    name: 'cw',
    // component: () => import('@/views/cw'),
    meta: { title: '财务管理', icon: 'table' },
    children: [{
      path: 'table',
      name: 'aaa',
      component: () => import('@/views/cw/table'),
      meta: { title: '合同制客户对账管理', icon: 'nested' }
    },
    {
      path: 'tree',
      name: 'bbb',
      component: () => import('@/views/cw/tree'),
      meta: { title: '司机货站的支付管理', icon: 'tree' }
    }]

  },
  


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
