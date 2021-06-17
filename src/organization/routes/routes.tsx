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
    path: "/",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Dashboard")),
  },
  {
    path: "/dashboard",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Dashboard")),
  },
  {
    path: "/desks",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Desks")),
  },
  /* {
    path: "/error",
    exact: true,l
    auth: true,
    component: lazy(() => import("../components/Error")),
  }, */
];
