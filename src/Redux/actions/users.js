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
//ToDo: No existe get all users en laravel
// export const getAllUsers = async () => {
//     try {
//         const res = await axios.get(API_URL_2 + 'users', {
//             headers: {
//   Authorization: HEADER
//             }
//         });
//         store.dispatch({
//             type: 'GET_ALL_USERS',
//             payload: res.data
//         })
//         return res;
//     } catch (error) {
//         console.error(error)
//     }
// }

export const getUserDetail = async () => {
    try {
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
    } catch (error) {
        console.error(error)
    }
}

export const logout = async () => {
    try {
        await axios.get(API_URL_2 + 'users/logout', {
            headers: {
                Authorization: HEADER
            }
        })
        localStorage.removeItem('authToken');
        store.dispatch({
            type: 'LOGOUT'
        })
    } catch (error) {
        console.error(error)
    }

}

export const uploadImage = async (fd) => {
    try {
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
    } catch (error) {
        console.error(error)
    }
}

export const updateUser = async (user) => {
    try {
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
    } catch (error) {
        console.error(error)
    }
}

export const deleteUser = async () => {
    try {
        await axios.delete(API_URL_2 + 'users/delete', {
            headers: {
                Authorization: HEADER
            }
        });
        localStorage.removeItem('authToken');
        store.dispatch({
            type: 'DELETE_USER'
        });
    } catch (error) {
        console.error(error)
    }

}

export const sendRecoverEmail = async (email) => {
    try {
        const res = await axios.post(API_URL_2 + 'users/password/forgotten', { email })
        return res;
    } catch (error) {
        console.error(error)
    }
}

export const recoverPassword = async (token, password) => {
    try {
        const res = await axios.post(API_URL_2 + 'users/password/reset', { token, password });
        return res;
    } catch (error) {
        console.error(error)
    }
}

export const confirmMail = async () => {
    try {
        const res = await axios.get(API_URL_2 + 'users/confirm-mail', {
            headers: {
                Authorization: HEADER
            }
        })
        return res;
    } catch (error) {
        console.error(error)
    }
}

export const confirmedEmail = async (token) => {
    try {
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
    } catch (error) {
        console.error(error)
    }
}