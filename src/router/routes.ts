import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
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
        component: () => import('src/modules/transportCompany/dashboard/ExecutiveDashboard.vue'),
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
        component: () =>
          import('src/modules/transportCompany/mobility/dispatch/DispatchListing.vue'),
      },
      {
        path: 'creation',
        name: 'create-event',
        component: () =>
          import('components/transportCompany/mobility/dispatch/creation/CreateNew.vue'),
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
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/ErrorNotFound.vue'),
  },
];

export default routes;
