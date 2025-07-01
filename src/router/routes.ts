import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('src/layouts/AuthLayout.vue'),
    children: [{ path: '', component: () => import('src/modules/auth/SignIn.vue') }],
  },
  {
    path: '/transport-company',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: 'executive-dashboard',
        name: 'executive-dashboard',
        component: () => import('src/modules/dashboard/ExecutiveDashboard.vue'),
      },
    ],
  },
  {
    path: '/transport-company/mobility',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dispatch',
        name: 'dispatch-listing',
        component: () => import('src/modules/trip-management/views/TripList.vue'),
      },
      {
        path: 'creation',
        name: 'create-event',
        component: () =>
          import('components/transportCompany/mobility/dispatch/creation/CreateNew.vue'),
      },
      {
        path: 'creation2',
        name: 'create-event2',
        component: () =>
          import('components/transportCompany/mobility/dispatch/creation/CreateNew2.vue'),
      },
      {
        path: 'mobility-links',
        name: 'mobility-link',
        component: () =>
          import(
            'components/transportCompany/mobility/dispatch/breadcrumbLinks/MobilitySectionLinks.vue'
          ),
      },
      {
        path: 'dispatch-links',
        name: 'dispatch-link',
        component: () =>
          import(
            'components/transportCompany/mobility/dispatch/breadcrumbLinks/DispatchSectionLinks.vue'
          ),
      },
      {
        path: 'dispatch-details',
        name: 'dispatch-details',
        component: () =>
          import('components/transportCompany/mobility/dispatch/details/DispatchDetails.vue'),
      },
    ],
  },
  {
    path: '/admin-regulator',
    component: () => import('src/layouts/AdminLayout.vue'),
    children: [
      {
        path: 'live-map',
        name: 'live-map',
        component: () => import('src/modules/liveMap/LiveMap.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/auth/ErrorNotFound.vue'),
  },
];

export default routes;
