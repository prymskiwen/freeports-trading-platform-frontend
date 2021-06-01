/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks';
import RouteCompProps from './routeCompProps';


const PrivateRoute: React.FC<RouteCompProps> = (
    { component: Component, ...rest }: RouteCompProps
) => {

  const {
    isAuthenticated,
  } = useAuth();

  return <Route {...rest} render={props => {
    return <Suspense fallback={<div>Loading...</div>}>
      {
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/auth/login',
            // state: { from: props.location },
          }} />
      }
    </Suspense>
  }} />
}

export default PrivateRoute
