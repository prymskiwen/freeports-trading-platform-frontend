import { lazy } from 'react'

export default [
  {
    path: "/auth/login",
    exact: true,
    component: lazy(() => import("../components/Auth/SignIn"))
  },
  {
    path: "/auth/register",
    exact: true,
    component: lazy(() => import("../components/Auth/SignUp"))
  },
  {
    path: '/dashboard',
    exact: true,
    auth: true,
    component: lazy(() => import('../components/Dashboard')),
  },
  {
    path: '/organisations',
    exact: true,
    auth: true,
    component: lazy(() => import('../components/Organisations')),
  },
  {
    path: '/nostro-accounts',
    exact: true,
    auth: true,
    component: lazy(() => import('../components/NostroAccounts')),
  },
  {
    path: '/tracking',
    exact: true,
    auth: true,
    component: lazy(() => import('../components/Tracking')),
  },
  {
    path: '/',
    exact: true,
    auth: true,
    component: lazy(() => import('../components/Dashboard')),
  },
];
