import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const Generar = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './generarqr')
);
const VerQR = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './verqr')
);
const Cobranza = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './cobranza')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);

const App = ({ match }) => {
  // console.log('el valor de match es: ')
  // console.log(match) // {path: '/app', url: '/app', isExact: false, params: {…}}
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/inicio`} />
            <Route
              path={`${match.url}/inicio`}
              render={(props) => <Gogo {...props} />}
            />
            <Route
              path={`${match.url}/generarqr`}
              render={(props) => <Generar {...props} />}
            />
            <Route
              path={`${match.url}/verqr`}
              render={(props) => <VerQR {...props} />}
            />
            <Route
              path={`${match.url}/cobranza`}
              render={(props) => <Cobranza {...props} />}
            />
            <Route
              path={`${match.url}/second-menu`}
              render={(props) => <SecondMenu {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
