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
  {
    path: "/desks/detail",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Desks/Detail")),
  },
  {
    path: "/investors",
    exact: true,
    auth: true,
    certicate: true,
    component: lazy(() => import("../components/Investors")),
  },
  {
    path: "/investors/:investorId",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Investors/InvestorDetail")),
  },
  {
    path: "/trades",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Trades")),
  },
  {
    path: "/trades/:investorId",
    exact: true,
    auth: true,
    component: lazy(() => import("../components/Trades/TradeDetail")),
  },
  {
    path: "/profile",
    exact: true,
    auth: true,
    component: lazy(() => import("../../components/Profile")),
  },
  /* {
    path: "/error",
    exact: true,l
    auth: true,
    component: lazy(() => import("../components/Error")),
  }, */
];
