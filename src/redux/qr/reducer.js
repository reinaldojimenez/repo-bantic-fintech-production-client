// import { getCurrentUser } from 'helpers/Utils';
// import { isAuthGuardActive, currentUser } from 'constants/defaultValues';
import {
  GENERAR_QR,
  GENERAR_QR_SUCCESS,
  GENERAR_QR_ERROR
} from '../contants';

const INIT_STATE = {
  miqr: '',
  erro: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GENERAR_QR:
      return { ...state, erro: '' };
    case GENERAR_QR_SUCCESS:
      return {
        ...state,
        miqr: action.payload,
        erro: '',
      };
    case GENERAR_QR_ERROR:
      return {
        ...state,
        erro: action.payload.message,
      };
    default:
      return { ...state };
  }
};
