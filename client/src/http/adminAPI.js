import {$authHost } from "./index";

export const addGroup = async (newGroup) => {
    const {data} = await $authHost .post('api/admin/addGroup', {newGroup})
    return data
}

export const deleteGroup = async (deleteGroup) => {
    const {data} = await $authHost .post('api/admin/deleteGroup', {deleteGroup})
    return data
}

export const getMarks = async (group) => {
    const {data} = await $authHost .post('api/admin/getMarks', {group})
    return data
}