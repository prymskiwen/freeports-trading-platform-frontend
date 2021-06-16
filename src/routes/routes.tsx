import { lazy } from "react";

export default [
  {
    path: "/signin",
    exact: true,
    component: lazy(() => import("../clearer/components/Auth/SignIn")),
  },
  {
    path: "/signin-otp",
    exact: true,
    component: lazy(() => import("../clearer/components/Auth/OTPSignIn")),
  },
  {
    path: "/dashboard",
    exact: true,
    auth: true,
    component: lazy(() => import("../clearer/components/Dashboard")),
  },
  {
    path: "/organisations",
    exact: true,
    auth: true,
    component: lazy(() => import("../clearer/components/Organisations")),
  },
  {
    path: "/organisations/addOrganization",
    exact: true,
    auth: true,
    component: lazy(
      () => import("../clearer/components/Organisations/AddOrganizer")
    ),
  },
  {
    path: "/organisations/editOrganizer/:id",
    exact: true,
    auth: true,
    component: lazy(
      () => import("../clearer/components/Organisations/EditOrganizer")
    ),
  },
  {
    path: "/nostro-accounts",
    exact: true,
    auth: true,
    component: lazy(() => import("../clearer/components/NostroAccounts")),
  },
  {
    path: "/tracking",
    exact: true,
    auth: true,
    component: lazy(() => import("../clearer/components/Tracking")),
  },
  {
    path: "/roles",
    exact: true,
    auth: true,
    component: lazy(() => import("../clearer/components/Roles")),
  },
  {
    path: "/roles/add",
    exact: true,
    auth: true,
    component: lazy(() => import("../clearer/components/Roles/AddRole")),
  },
  {
    path: "/",
    exact: true,
    auth: true,
    component: lazy(() => import("../clearer/components/Dashboard")),
  },
  {
    path: "/co-worker",
    exact: true,
    auth: true,
    component: lazy(() => import("../clearer/components/CoWorker")),
  },
  /* {
    path: "/error",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Error")),
  }, */
];
