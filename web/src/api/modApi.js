import {http} from "../utils/http.js";

export async function queryModsApi(modIds) {
    const url = "/lobby/mod/query"
    const response = await http.post(url, {
        "mod_ids": modIds
    })
    return response.data
}