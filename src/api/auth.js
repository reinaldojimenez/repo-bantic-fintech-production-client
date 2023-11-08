import axios from './axios';

// const API = 'http://localhost:3001/api/v1'

export const loginRequest = user => axios.post(`/auth/signin`, user); // username, password

export const logoutRequest = () => axios.post(`/auth/logout`);

export const verifyTokenRequest = () => axios.get(`/auth/whoami`);

export const generarQRRequest = data => axios.post(`/users/generarQR`, data);

export const getVersion = () => axios.get(`/prueba`);

export const getAllQRByUser = user => axios.get(`/cobranza/getAllQR?userName=${user.userName}&fkCustomer=${user.fkCustomer}&typeRequest=${user.typeRequest}`);
// export const getAllQRByUser = user => axios.get(`/cobranza/getAllQR?userName=${user.userName}&fkCustomer=1&typeRequest=DATAQR`);

export const verificarQR = data => axios.post(`/users/verificarQR`, data);
