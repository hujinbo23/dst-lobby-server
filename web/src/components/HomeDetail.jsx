import {dstRoles} from "../utils/dst.js";
import {Image} from "antd";
import HistoryLineChart from "./chart/HistoryLineChart.jsx";
import ModsInfo from "./home/ModsInfo.jsx";

const H3Style = ({title}) => {
    return (
        <div style={{
            marginBottom: '15px',
            marginTop: '-10px'
        }}>
            <h3 style={{
                lineHeight: '40px',
                color: '#454545'
            }}>
                <b style={{
                    background: "#f6f6f6",
                    borderRadius: '16px',
                    height: '18px',
                    fontSize: '18px',
                    color: '#2254f4',
                    padding: '8px 16px',
                    lineHeight: '18px',
                    overflow: 'hidden',
                }}>#{title}</b>
            </h3>
        </div>
    )
}

const H4Style = ({title}) => {
    return (
        <b style={{
            display: 'inline-block',
            borderBottom: '4px solid #2254f4',
            margin: '4px 0px'
        }}>{title}</b>
    )
}

const marginCss = {
    marginTop: '8px'
}

export default ({home}) => {
    return (
        <>
            <div style={{
                height: 540,
                overflowY: 'auto',
            }}>
                <div className="box-border p-4 ">
                    <div style={marginCss}>
                        <H3Style title={home.name}/>
                        <div style={{
                            padding: '16px'
                        }}>
                            <h3 style={{
                                lineHeight: '12px',
                                color: '#454545'
                            }}>
                                <H4Style title={"描述"}/>
                            </h3>
                            <p style={{color: '#aaaebb'}}>
                                {home.desc}
                            </p>

                            <h3 style={{lineHeight: '40px;color: #454545'}}>
                                <H4Style title={"世界直连"}/>
                                <p className="text-blue-600">c_connect("{home.__addr}", {home.port})</p>
                            </h3>
                        </div>
                    </div>
                    <div style={marginCss}>
                        <H3Style title={"其他信息"}/>
                        <div style={{padding: '16px'}}>
                        <span className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                            <span>服主: <span style={{color: '#2254f4'}}>{home.host}</span></span>
                            <span>版本: <span style={{color: '#2254f4'}}>{home.v}</span></span>
                            <span>模式: <span style={{color: '#2254f4'}}>{home.mode}</span> </span>
                            <span>天数: <span style={{color: '#2254f4'}}>{home.dayData.day}</span></span>
                            <span>季节: <span
                                style={{color: '#2254f4'}}>{home.season}{`(${home.dayData.dayselapsedinseason + 1}/${home.dayData.dayselapsedinseason + home.dayData.daysleftinseason})`}</span></span>
                        </span>
                        </div>
                    </div>

                    <div style={marginCss}>
                        <H3Style title={"在线玩家"}/>
                        <div style={{padding: '16px'}}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {home.playerList.map(item => <div style={{display: 'flex'}}>
                                    {/*<img className="ant-image-img"*/}
                                    {/*     src={dstRoles[item.prefab] || dstRoles.mod}*/}
                                    {/*     width="36.8" alt={"xxx"}/>*/}

                                    <a
                                        target={'_blank'}
                                        href={`https://steamcommunity.com/profiles/${item.netID}`}
                                        key="list-loadmore-edit" rel="noreferrer">
                                        <Image preview={false} width={36.8}
                                               src={dstRoles[item.prefab] || dstRoles.mod}/>
                                    </a>

                                    <span style={{
                                        marginLeft: '8px',
                                        color: `#${item.colour}`
                                    }}>
                                    {item.name}
                                </span>
                                </div>)}
                            </div>
                        </div>
                    </div>

                    <div style={marginCss}>
                        <H3Style title={"历史人数"}/>
                        <div style={{padding: '16px'}}>
                            <HistoryLineChart title={home.name} rowId={home.__rowId}/>
                        </div>
                    </div>

                    <div style={marginCss}>
                        <H3Style title={"模组"}/>
                        <div style={{padding: '16px'}}>
                            <ModsInfo modsInfo={home.mods_info} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}