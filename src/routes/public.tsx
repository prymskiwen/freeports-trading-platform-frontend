/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import RouteCompProps from './routeCompProps';

const PublicRoutes: React.FC<RouteCompProps> = 
    (params: RouteCompProps): React.ReactElement => {

  const { component: Component, ...rest } = params;

  return <Route {...rest} render={props => {
    return <Suspense fallback={<div>Loading...</div>}>
      <Component {...props}/>
    </Suspense>
  }}/>
}

export default PublicRoutes
