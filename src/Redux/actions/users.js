import store from "../store";
import axios from "axios";
import { API_URL_2 } from "../../api-config";

const GET_HEADER = () => {
	return "Bearer " + localStorage.getItem("authToken");
};

export const register = async (user) => {
	return axios.post(API_URL_2 + "users/register", user);
};

export const login = async (user) => {
	const res = await axios.post(API_URL_2 + "users/login", user);
	store.dispatch({
		type: "LOGIN",
		payload: res.data,
	});
	localStorage.setItem("authToken", res.data.token);
	return res;
};
export const getAllUsers = async () => {
	const res = await axios.get(API_URL_2 + "users/all", {
		headers: {
			Authorization: GET_HEADER(),
		},
	});
	store.dispatch({
		type: "GET_ALL_USERS",
		payload: res.data,
	});
	return res;
};

export const getUserDetail = async () => {
	const res = await axios.get(API_URL_2 + "users", {
		headers: {
			Authorization: GET_HEADER(),
		},
	});
	store.dispatch({
		type: "GET_DETAIL",
		payload: res.data,
	});
	return res;
};

export const logout = async () => {
	const res = await axios.get(API_URL_2 + "users/logout", {
		headers: {
			Authorization: GET_HEADER(),
		},
	});
	localStorage.removeItem("authToken");
	store.dispatch({
		type: "LOGOUT",
	});
	return res
};

export const uploadImage = async (fd) => {
	const res = await axios.post(API_URL_2 + "users/upload", fd, {
		headers: {
			Authorization: GET_HEADER(),
		},
	});
	console.log(res.data)
	store.dispatch({
		type: "UPLOAD_IMAGE",
		payload: res.data.user,
	});
	return res;
};

export const updateUser = async (user) => {
	const res = await axios.put(API_URL_2 + "users/update", user, {
		headers: {
			Authorization: GET_HEADER(),
		},
	});
	store.dispatch({
		type: "UPDATE_USER",
		payload: res.data[0],
	});
	return res.data[0];
};

export const deleteUser = async () => {
	const res = await axios.delete(API_URL_2 + "users/delete", {
		headers: {
			Authorization: GET_HEADER(),
		},
	});
	store.dispatch({
		type: "DELETE_USER",
	});
	localStorage.removeItem("authToken");
	return res;
};

export const sendRecoverEmail = async (email) => {
	const res = await axios.post(API_URL_2 + "users/password/forgotten", { email });
	return res;
};

export const recoverPassword = async (token, password) => {
	const res = await axios.post(API_URL_2 + "users/password/reset", { token, password });
	return res;
};

export const confirmMail = async () => {
	const res = await axios.get(API_URL_2 + "users/confirm-mail", {
		headers: {
			Authorization: GET_HEADER(),
		},
	});
	return res;
};

export const confirmedEmail = async (token) => {
	const res = await axios.post(
		API_URL_2 + "users/mail-confirmed",
		{ token },
		{
			headers: {
				Authorization: GET_HEADER(),
			},
		}
	);
	store.dispatch({
		type: "UPDATE_USER",
		payload: res.data[0],
	});
	return res;
};
