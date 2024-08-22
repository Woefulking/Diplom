import {$authHost} from "./index";


export const selectAll = async (price) => {
    const {data} = await $authHost.post('api/example/select', {price})
    return data
}

export const getTableInfo = async (tableName) => {
    const {data} = await $authHost.post('api/example/getTableData', {tableName})
    return data
}

export const selectWhere = async (sql) => {
    const {data} = await $authHost.post('api/example/selectWhere', {sql})
    return data
}