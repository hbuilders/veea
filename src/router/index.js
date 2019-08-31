import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
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
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/example',
    component: Layout,
    redirect: 'noRedirect',
    name: 'example',
    meta: {
      title: '示例',
      icon: 'example'
    },
    children: [
      {
        path: 'element-resize',
        name: 'ElementResize',
        component: () => import('@/views/example/elementResize'),
        meta: { title: '元素resize', icon: 'form' }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/example/table'),
        meta: { title: '表格', icon: 'form' }
      },
      {
        path: 'flex',
        name: 'Flex',
        component: () => import('@/views/example/flex'),
        meta: { title: 'Flex布局', icon: 'form' }
      }
    ]
  }
]

// for (let i = 1; i < 50; i++) {
//   asyncRoutes[0].children.push({
//     path: `flex${i}`,
//     name: `Flex${i}`,
//     component: () => import('@/views/example/flex'),
//     meta: { title: `Flex布局${i}`, icon: 'form' }
//   })
// }
console.log(process.env.VUE_APP_DEPLOY)
const createRouter = () =>
  new Router({
    mode: process.env.VUE_APP_DEPLOY === 'github' ? 'hash' : 'history', // require service support
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        // 保持滚动位置不变-对于页面的滚动条
        // 只有在在按下 后退/前进 按钮时 savedPosition 有效
        // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#滚动行为
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
