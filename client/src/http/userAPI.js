import { $host, $authHost } from "./index";
import jwtDecode from "jwt-decode";

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const registration = async (login, password, surName, name, patronymic, group) => {
    const {data} = await $host.post('api/user/registration', {login, password, surName, name, patronymic, group})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const setLabMark = async (mark, labNumber, id) => {
    const {data} = await $authHost.post('api/user/setMark', {mark, labNumber, id})
    return data
}

export const getUserInfo = async (id) => {
    const {data} = await $authHost.post('api/user/getUserInfo', {id})
    return data
}

export const getAllMarks = async (id) => {
    const {data} = await $authHost.post('api/user/getAllMarks', {id})
    return data
}

