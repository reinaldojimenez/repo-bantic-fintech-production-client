import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import CobranzaPage from './cobranzaPage';

const CobranzaPage = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './cobranzaPage')
);
const Cobranza = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/cobranza`} />
      <Route
        path={`${match.url}/cobranza`}
        render={(props) => <CobranzaPage {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Cobranza;