import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: { title: '关于' }
      },
      {
        path: 'data-view',
        name: 'dataView',
        component: () => import('@/views/data-view/index.vue'),
        meta: { title: '数据展示' }
      },
      {
        path: 'component-designer',
        name: 'componentDesigner',
        component: () => import('@/views/draggable-components/index.vue'),
        meta: { title: '组件设计器' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
