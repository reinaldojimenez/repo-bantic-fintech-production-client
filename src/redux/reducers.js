import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import qrReducer from './qr/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  qrReducer,
});

export default reducers;
