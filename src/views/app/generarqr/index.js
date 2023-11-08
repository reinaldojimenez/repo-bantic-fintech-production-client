import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Genera = React.lazy(() =>
  import(/* webpackChunkName: "generar-qr" */ './generar-qr')
);
const Generar = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/generarqr`} />
      <Route
        path={`${match.url}/generarqr`}
        render={(props) => <Genera {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Generar;