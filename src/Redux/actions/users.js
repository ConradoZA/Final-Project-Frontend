import store from '../store';
import axios from 'axios';
import { API_URL_2 } from '../../api-config';

const HEADER = 'Bearer ' + localStorage.getItem('authToken')

export const register = async (user) => {
    return axios.post(API_URL_2 + 'users/register', user)
}

export const login = async (user) => {
    const res = await axios.post(API_URL_2 + 'users/login', user);
    store.dispatch({
        type: 'LOGIN',
        payload: res.data
    })
    localStorage.setItem('authToken', res.data.token);
    return res;
}
export const getAllUsers = async () => {
        const res = await axios.get(API_URL_2 + 'users/all', {
            headers: {
                Authorization: HEADER
            }
        });
        store.dispatch({
            type: 'GET_ALL_USERS',
            payload: res.data
        })
        return res;
}

export const getUserDetail = async () => {
        const res = await axios.get(API_URL_2 + 'users', {
            headers: {
                Authorization: HEADER
            }
        });
        store.dispatch({
            type: 'GET_DETAIL',
            payload: res.data
        });
        return res;
}

export const logout = async () => {
        await axios.get(API_URL_2 + 'users/logout', {
            headers: {
                Authorization: HEADER
            }
        })
        localStorage.removeItem('authToken');
        store.dispatch({
            type: 'LOGOUT'
        })
}

export const uploadImage = async (fd) => {
        const res = await axios.post(API_URL_2 + 'users/upload', fd, {
            headers: {
                Authorization: HEADER
            }
        });
        store.dispatch({
            type: 'UPLOAD_IMAGE',
            payload: res.data.user
        });
        return res;
}

export const updateUser = async (user) => {
        const res = await axios.put(API_URL_2 + 'users/update', user, {
            headers: {
                Authorization: HEADER
            }
        });
        store.dispatch({
            type: 'UPDATE_USER',
            payload: res.data[0]
        });
        return res.data[0];
}

export const deleteUser = async () => {
        await axios.delete(API_URL_2 + 'users/delete', {
            headers: {
                Authorization: HEADER
            }
        });
        localStorage.removeItem('authToken');
        store.dispatch({
            type: 'DELETE_USER'
        });
}

export const sendRecoverEmail = async (email) => {
        const res = await axios.post(API_URL_2 + 'users/password/forgotten', { email })
        return res;
}

export const recoverPassword = async (token, password) => {
        const res = await axios.post(API_URL_2 + 'users/password/reset', { token, password });
        return res;
}

export const confirmMail = async () => {
        const res = await axios.get(API_URL_2 + 'users/confirm-mail', {
            headers: {
                Authorization: HEADER
            }
        })
        return res;
}

export const confirmedEmail = async (token) => {
        const res = await axios.post(API_URL_2 + 'users/mail-confirmed', { token }, {
            headers: {
                Authorization: HEADER
            }
        })
        store.dispatch({
            type: 'UPDATE_USER',
            payload: res.data[0]
        });
        return res;
}