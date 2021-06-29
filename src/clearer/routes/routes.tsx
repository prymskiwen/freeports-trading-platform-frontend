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
    path: "/organizations",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Organizations")),
  },
  {
    path: "/organizations/addOrganization",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Organizations/AddOrganizer")),
  },
  {
    path: "/organizations/editOrganizer/:id",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Organizations/EditOrganizer")),
  },
  {
    path: "/organizations/:organizationId/addmanager",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Organizations/AddManager")),
  },
  {
    path: "/nostro-accounts",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/NostroAccounts")),
  },
  {
    path: "/nostro-accounts/details",
    exact: true,
    auth: true,
    component: lazy(
      () => import("../components/NostroAccounts/NostroAccountDetails")
    ),
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
    path: "/co-workers",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/CoWorker")),
  },
  {
    path: "/co-workers/:coWorkerId",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/CoWorker")),
  },
  {
    path: "/profile",
    exact: true,
    auth: true,
    component: lazy(() => import("../../components/Profile")),
  },
  /* {
    path: "/error",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Error")),
  }, */
];
