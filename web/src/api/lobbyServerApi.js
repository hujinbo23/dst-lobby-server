import {http} from "../utils/http.js";

export async function lobbyServerListApi(params) {
    let url = `/lobby/server/query?page=${params.current}&size=${10}`
    if (params.name !== undefined && params.name !== "") {
        url += `&name=${params.name}`
    }
    if (params.password !== undefined) {

        let password
        if (params.password === "true") {
            password = 1
        } else {
            password = 0
        }
        console.log( typeof params.password,params.password,password)
        url += `&password=${password}`
    }
    if (params.platform !== undefined && params.platform !== "") {
        url += `&platform=${params.platform}`
    }
    if (params.season !== undefined && params.season !== "") {
        url += `&season=${params.season}`
    }
    if (params.mode !== undefined && params.mode !== "") {
        url += `&mode=${params.mode}`
    }
    const response = await http.get(url)
    return response.data
}

export async function lobbyServerDetailApi(params) {
    const url = `/lobby/server/query/detail?rowId=${params.rowId}&region=${params.region}`
    const response = await http.get(url)
    return response.data
}

export async function lobbyServerHistoryApi(params) {
    const url = `/lobby/server/query/history?rowId=${params.rowId}&startDate=${new Date(new Date(params.startDate).setHours(8)).toISOString()}&endDate=${new Date(new Date(params.endDate).setHours(7+24)).toISOString()}`
    const response = await http.get(url)
    return response.data
}