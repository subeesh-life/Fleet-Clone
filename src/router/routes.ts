import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/transport-company',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'executive-dashboard',
        name: 'executive-dashboard',
        component: () => import('pages/transport_company/dashboard/ExecutiveDashboard.vue'),
      },
    ],
  },
  {
    path: '/transport-company/mobility',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dispatch',
        name: 'dispatch',
        component: () => import('pages/transport_company/mobility/dispatch/DispatchListing.vue'),
      },
      {
        path: 'creation',
        name: 'create-event',
        component: () => import('components/transport_company/mobility/creation/CreateNew.vue'),
      },
      {
        path: 'mobility-links',
        name: 'mobility-link',
        component: () =>
          import('components/transport_company/mobility/breadcrumb-links/MobilitySectionLinks.vue'),
      },
      {
        path: 'dispatch-links',
        name: 'dispatch-link',
        component: () =>
          import('components/transport_company/mobility/breadcrumb-links/DispatchSectionLinks.vue'),
      },
      // {
      //   path: 'live-map',
      //   name: 'live-map',
      //   component: () => import('pages/transport_company/mobility/live-map/LiveMap.vue'),
      // },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
