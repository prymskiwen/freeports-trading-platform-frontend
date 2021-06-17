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
  /* {
    path: "/error",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Error")),
  }, */
];
