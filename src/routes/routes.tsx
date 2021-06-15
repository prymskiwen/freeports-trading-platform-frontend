import { lazy } from "react";

export default [
  {
    path: "/signin",
    exact: true,
    component: lazy(() => import("../components/Auth/SignIn")),
  },
  {
    path: "/signin-otp",
    exact: true,
    component: lazy(() => import("../components/Auth/OTPSignIn")),
  },
  {
    path: "/dashboard",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Dashboard")),
  },
  {
    path: "/organisations",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Organisations")),
  },
  {
    path: "/organisations/addOrganization",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Organisations/AddOrganizer")),
  },
  {
    path: "/organisations/editOrganizer/:id",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Organisations/EditOrganizer")),
  },
  {
    path: "/nostro-accounts",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/NostroAccounts")),
  },
  {
    path: "/tracking",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Tracking")),
  },
  {
    path: "/roles",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Roles")),
  },
  {
    path: "/roles/add",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Roles/AddRole")),
  },
  {
    path: "/",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Dashboard")),
  },
  {
    path: "/co-worker",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/CoWorker")),
  },
];
