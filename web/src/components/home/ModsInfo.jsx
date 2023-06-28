import {useEffect, useState} from "react";
import {queryModsApi} from "../../api/modApi.js";
import {dstRoles} from "../../utils/dst.js";
import {Image} from "antd";

function handleModsInfo(modsInfo) {
    if (modsInfo === undefined || modsInfo === null || modsInfo.length < 4) {
        return []
    }
    let arr = []
    for (let i = 0; i < modsInfo.length; i = i + 5) {
        //workshop-
        arr.push({
            "modId": modsInfo[i].slice(9),
            "name": modsInfo[i + 1],
            "newVersion": modsInfo[i + 2],
            "currVersion": modsInfo[i + 3],
            "isClientDownload": modsInfo[i + 4],
            "image": "xxxx"
        })
    }
    return arr
}

function findMod(mods, modId) {

    for (let i=0;i <mods.length;i++) {
        if (mods[i].publishedfileid === modId) {
            return mods[i]
        }
    }
    return {}
}

export default ({modsInfo}) => {

    const [mods, setMods] = useState(handleModsInfo(modsInfo))
    useEffect(() => {
        queryModsApi(mods.map(mod => mod.modId))
            .then(resp => {
                console.log(resp)
                let newMods = []
                mods.forEach(mod=>{
                    mod.image = findMod(resp.data, mod.modId).preview_url
                    newMods.push(mod)
                })

                setMods(newMods)
            })
    }, [])
    return (
        <>
            <div className="text-base font-medium pb-2">数量: {mods.length}</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {mods.map(mod => <div style={{
                    color: 'rgba(0, 0, 0, 0.45)',
                    fontSize: '16px'
                }}><Image preview={false} width={36.8} src={mod.image}/>
                    <div>{mod.name}</div>
                </div>)}
            </div>
        </>
    )
}