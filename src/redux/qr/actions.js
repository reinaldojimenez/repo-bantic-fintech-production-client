import {
  GENERAR_QR,
  GENERAR_QR_SUCCESS,
  GENERAR_QR_ERROR
} from '../contants';

// actions creators exportados como funciones

export const generarQRAct = (data, history) => ({
  type: GENERAR_QR,
  payload: { data, history },
});
export const generarQRSuccessAct = (data) => ({
  type: GENERAR_QR_SUCCESS,
  payload: data,
});
export const generarQRErrorAct = (message) => ({
  type: GENERAR_QR_ERROR,
  payload: { message },
});
