import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { loginUser } from 'redux/actions';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import logo from 'assets/img/logo/logo_bantic.png'

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Por favor introduce tu contraseña.';
  } else if (value.length < 4) {
    error = 'El campo debe tener más de 3 caracteres.';
  }
  return error;
};

/* const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}; */

const validateUser = (value) => {
  let error;
  if (!value) {
    error = 'Por favor introduce tu Usuario';
  // } else if (/^[a-zA-Z0-9]{0,20}$/) {
    // error = 'Invalid email address';
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction }) => {
  // console.log("valor de loading en el componente: ", loading)
  const [email] = useState('');
  const [password] = useState('');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const onUserLogin = (values) => {
    // console.log("valor de loading en la funcion: ", loading)
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        // console.log("los valores en values")
        // console.log(values)
        // console.log("los valores en history")
        // console.log(history)
        loginUserAction(values, history);
      }
    }
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">BANTIC FINTECH</p>
            <p className="white mb-0">
              Por favor use sus credenciales para iniciar sesión.
              {/* <br />
              If you are not a member, please{' '}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              . */}
            </p>
          </div>
          <div className="form-side">
            <div className='d-flex justify-content-center mb-3'>
              <NavLink to="#" className="white">              
                <img src={ logo } alt="banticfintech" style={{ height: '3rem', width: "11.5rem" }} />
            </NavLink>
            </div>
            
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateUser}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-center align-items-center">
                    {/* <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink> */}
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
