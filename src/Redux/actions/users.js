import store from '../store';
import axios from 'axios';
import { API_URL } from '../../api-config';

export const register = async (user) => {
    return axios.post(API_URL + 'users/register', user)
}

export const login = async (user) => {
    const res = await axios.post(API_URL + 'users/login', user);
    store.dispatch({
        type: 'LOGIN',
        payload: res.data.user
    })
    localStorage.setItem('authToken', res.data.token);
    return res;
}

export const getAllUsers = async () => {
    try {
        const res = await axios.get(API_URL + 'users', {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        });
        store.dispatch({
            type: 'GET_ALL_USERS',
            payload: res.data
        })
        return res;
    } catch (error) {
        console.error(error)
    }
}

export const getUserDetail = async () => {
    try {
        const res = await axios.get(API_URL + 'users/info', {
            headers: {
                Authorization: localStorage.getItem('authToken')
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
        await axios.get(API_URL + 'users/logout', {
            headers: {
                Authorization: localStorage.getItem('authToken')
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
        const res = await axios.post(API_URL + 'users/upload', fd, {
            headers: {
                Authorization: localStorage.getItem('authToken')
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
        const res = await axios.put(API_URL + 'users/update', user, {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        });
        store.dispatch({
            type: 'UPDATE_USER',
            payload: res.data.user
        });
        return res;
    } catch (error) {
        console.error(error)
    }
}

export const deleteUser = async () => {
    try {
        await axios.delete(API_URL + 'users/delete', {
            headers: {
                Authorization: localStorage.getItem('authToken')
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

export const getPassword = async () => {
    try {
        const res = await axios.get(API_URL + 'users/recover/get', {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        });
        return res;
    } catch (error) {
        console.error(error)
    }
}

export const sendRecoverEmail = async (name) => {
    try {
        const res = await axios.post(API_URL + 'users/recover', { name })
        return res;
    } catch (error) {
        console.error(error)
    }
}

export const renewPassword = async (oldPassword, newPassword, actualPass) => {
    try {
        const res = await axios.post(API_URL + 'users/recover/new', { oldPassword, newPassword , actualPass}, {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        });
        return res;
    } catch (error) {
        console.error(error)
    }
}


export const recoverPassword = async (token, password) => {
    try {
        const res = await axios.post(API_URL + 'users/recover/password', { token, password });
        return res;
    } catch (error) {
        console.error(error)
    }
}