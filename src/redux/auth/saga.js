import { all, call, fork, put, takeEvery } from 'redux-saga/effects'; // takeLastest nos permite observar (Watcher) cada uno de los actions types que se estan disparando.
import { auth } from 'helpers/Firebase';
import { adminRoot, currentUser } from 'constants/defaultValues';
import { setCurrentUser, getCurrentUser } from 'helpers/Utils';
 import { loginRequest, generarQRRequest } from 'api/auth';
 import { v4 as uuid} from 'uuid';
 import { generarQRErrorAct, generarQRSuccessAct } from 'redux/qr/actions';
 
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GENERAR_QR
} from '../contants';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';


export function* watchLoginUser() {
  // console.log("funcion Middleware watchLoginUser")
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword); // start loginWithEmailPassword when LOGIN_USER is dispatched
}

const loginWithEmailPasswordAsync = async (email, password) => 
  // console.log("esta entrando aca #3")
  // eslint-disable-next-line no-return-await
  /* await auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error); */
  // eslint-disable-next-line no-return-await
  await loginRequest({username: email, password})
  // console.log(respuesta.data)


function* loginWithEmailPassword({ payload }) { // action.payload
  // console.log("funcion Middleware loginWithEmailPassword")
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password); // call -> para consumir la API
    console.log("LAS RESPUESTA ES ...............")
    console.log(loginUser.data)
    const item = { uid: uuid(), ...currentUser, title: loginUser.data.nameUser };
    setCurrentUser(item);
    yield put(loginUserSuccess(item)); // put -> despachamos el action 
    history.push(adminRoot);
    
    /* if (!loginUser.message) {
      const item = { uid: loginUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(loginUserSuccess(item)); // put -> despachamos el action 
      history.push(adminRoot);
    } else {
      yield put(loginUserError(loginUser.message)); // put -> despachamos el action 
    } */
  } catch (error) {
    // console.log("esta entrando a la excepcion")
    // console.log(error.response.data)
    yield put(loginUserError(error.response.data[0]));
  }
}

const generateQRAsync = async (amount, glosa, title) => 
  // eslint-disable-next-line no-return-await
  await generarQRRequest({amount, glosa, user: title})

function* generateQR({ payload }) { // action.payload
  // console.log("ESTA ENTRANDO A LA FUNCION watchGenerarQR SE DISPARO LA ACCION") // esta entrando dos veces
  const { amount, glosa } = payload.data;
  const { title } = getCurrentUser();
  const { history } = payload;
  try {
    const respuesta = yield call(generateQRAsync, amount, glosa, title); // call -> para consumir la API
    console.log(respuesta.data)
    // const item = { uid: uuid(), ...currentUser };
    yield put(generarQRSuccessAct(respuesta.data)); // put -> despachamos el action 
    history.push(`${adminRoot}/verqr`);    
  } catch (error) {
    console.log(error.response.data)
    yield put(generarQRErrorAct(error.response.data[0]));
  }
}


export function* watchGenerarQR() {
  // console.log("funcion Middleware watchGenerarQR")
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(GENERAR_QR, generateQR); // start loginWithEmailPassword when LOGIN_USER is dispatched
}

export function* watchRegisterUser() {
  // console.log("funcion Middleware watchRegisterUser")
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // console.log("funcion Middleware watchLogoutUser")
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

/* const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
}; */

const logoutSync = (history) => {
  history.push(adminRoot);
  window.location.reload();
};

function* logout({ payload }) {
  // console.log('estas saliendo del sistema')
  // const person = prompt("Please enter your name", "Harry Potter");
  // console.log(`nombre de la persona ${person}`)
  const { history } = payload;
  setCurrentUser();
  // yield call(logoutAsync, history);
  yield call(logoutSync, history);
}

export function* watchForgotPassword() {
  // console.log("funcion Middleware watchForgotPassword")
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // console.log("funcion Middleware watchResetPassword")
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchGenerarQR),
  ]);
}
