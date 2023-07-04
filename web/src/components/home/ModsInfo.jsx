import {useEffect, useState} from "react";
import {queryModsApi} from "../../api/modApi.js";
import {Image, Tooltip} from "antd";

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
    for (let i = 0; i < mods.length; i++) {
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
                mods.forEach(mod => {
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
                {mods.map(mod => <div
                    key={mod.modid}
                    style={{
                        color: 'rgba(0, 0, 0, 0.45)',
                        fontSize: '16px'
                    }}>
                    <a
                        target={'_blank'}
                        href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.modid}`}
                        key="list-loadmore-edit"
                        rel="noreferrer">
                        <Tooltip title="点击进入订阅页">
                            <Image preview={false} width={46.8} src={mod.image}/>
                        </Tooltip>
                    </a>
                    {/*
                        {mod.isClientDownload ?
                        <Tooltip title="必须安装才能进入">
                            <Image preview={false} width={22}
                                   src={'https://dst.liuyh.com/static/img/dstui/icon/apply_skins.png'}/>
                        </Tooltip> : ''}
                    <a
                        target={'_blank'}
                        href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.modid}`}
                        key="list-loadmore-edit"
                        style={{
                            background: 'url(https://dst.liuyh.com/static/img/dstui/icon_button_normal.png)'
                        }} rel="noreferrer">
                        <Tooltip title="点击进入订阅页">
                            <Image preview={false} width={22}
                                   src={'https://dst.liuyh.com/static/img/dstui/icon/update.png'}/>
                        </Tooltip>
                    </a>

                    */}

                    <div>{mod.name}</div>
                </div>)}
            </div>
        </>
    )
}