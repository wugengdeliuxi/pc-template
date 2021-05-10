import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'
import two from '@/layout/two' // 为了嵌套路由

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const constantRoutes = [
  {
    path: '/',
    redirect: '/case',
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/case',
    component: Layout,
    redirect: '/case/discover/index',
    alwaysShow: true, // will always show the root menu
    name: 'Case',
    meta: {
      title: '案件管理',
      icon: 'dashboard',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        redirect: '/case/discover/index',
        path: 'discover',
        component: two, // Parent router-view
        name: 'Discover',
        alwaysShow: true,
        meta: {
          title: '案件发现',
          roles: ['admin']
        },
        children: [
          {
            path: 'index',
            component: () => import('@/views/discover/index'),
            name: 'Index',
            meta: {
              title: '待受理',
              roles: ['admin']
            }
          }
        ]
      },
      {
        redirect: '/case/confirm/index',
        path: 'confirm',
        component: two, // Parent router-view
        name: 'Confirm',
        alwaysShow: true,
        meta: {
          title: '案件立案',
          roles: ['admin']
        },
        children: [
          {
            path: 'index',
            component: () => import('@/views/confirm/index'),
            name: 'Index',
            meta: {
              title: '待立案',
              roles: ['admin']
            }
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
