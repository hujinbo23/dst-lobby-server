import React, { useState } from 'react';

import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Image, Skeleton, Typography } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';

import {lobbyServerDetailApi, lobbyServerListApi} from "../api/lobbyServerApi.js";
import World from "./World.jsx";
import HomeDetail from "./HomeDetail.jsx";

const {Paragraph} = Typography;
const { Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const SeasonsEnum ={
    spring: "春天",
    summer: "夏天",
    autumn: "秋天",
    winter: "冬天",
}

const GameModEnum = {
    relaxed: "轻松",
    endless: "无尽",
    survival: "标准",
    wilderness: "荒野",
    lightsout: "永夜",
    lavaarena: "熔炉",
    quagmire: "暴食",
    OceanFishing: "海钓",
    starvingfloor: "闯关"
}

// eslint-disable-next-line react-refresh/only-export-components
const PlatformsEnum = {
    1:"Steam",
    2:"PSN",
    4:"Rail",
    16:"XBone",
    32:"Switch",
}

export default () => {

    const [openHomeDetail, setOpenHomeDetail] = useState(false);

    // 对话框的loading
    const [loading, setLoading] = useState(true);

    // 房间信息
    const [homeInfo, setHomeInfo] = useState({});

    const [openWorld, setOpenWorld] = useState(false);
    const [world, setWorld] = useState("")

    const viewHomeDetail = (record) => {
        setOpenHomeDetail(true);
        lobbyServerDetailApi({
            rowId: record.__rowId,
            region: record.region
        }).then(response => {
            setLoading(false)
            if (response.code === 200) {
                setHomeInfo(response.data)
            }
        })
    }

    const columns = [
        {
            title: '房间名',
            dataIndex: 'name',
            key: 'name',
            width: 320,
            copyable: true,
            render: (_, record) => [
                (<div>
                    <Button type="link" onClick={() => {
                        viewHomeDetail(record)
                    }}>
                        <Text style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            {record.name}
                        </Text>
                        <ShareAltOutlined />
                        </Button>
                </div>)
            ],
        },
        {
            title: '当前人数',
            search: false,
            width: 100,
            key: 'maxconnections',
            render: (text, record, _, action) => (
                <div>{record.connected}/{record.maxconnections}
                    <Image
                        preview={false}
                        width={20}
                        src="https://dst.liuyh.com/static/img/dstui/icon/players.png"
                    />
                </div>
            ),
            sorter: (a, b) => b.connected - a.connected,
        },
        {
            title: '游戏模式',
            key: 'mode',
            width: 100,
            valueEnum: GameModEnum,
            render: (text, record, _, action) => (<div>{GameModEnum[record.mode]}</div>),
        },
        {
            title: '季节',
            key: 'season',
            dataIndex: 'season',
            width: 100,
            valueEnum: SeasonsEnum,
            render: (text, record, _, action) => (<div>
                {record.season === 'spring' && (
                    // <div>春季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/spring.png"
                    />
                )}
                {record.season === 'summer' && (
                    // <div>夏季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/summer.png"
                    />
                )}
                {record.season === 'autumn' && (
                    // <div>秋季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/autumn.png"
                    />
                )}
                {record.season === 'winter' && (
                    // <div>冬季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/winter.png"
                    />
                )}

            </div>),
        },
        {
            disable: true,
            title: '密码',
            key: 'password',
            dataIndex: 'password',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            width: 100,
            valueEnum: {
                true: "有密码",
                false: "无密码",
            },
            render: (text, record, _, action) => (<div>
                {record.password === true && (
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/password.png"
                    />
                    // <LockOutlined />
                )}
            </div>),
        },
        {
            title: '平台',
            key: 'platform',
            valueType: 'select',
            width: 100,
            valueEnum: PlatformsEnum,
            render: (text, record, _, action) => (
                <div>
                    <span>{PlatformsEnum[record.platform]}</span>
                </div>
            )
        },
        {
            title: '地址',
            search: false,
            key: 'ip',
            width: 320,
            render: (text, record, _, action) => (
                <div>
                    <Paragraph style={{color: '#4096ff'}} copyable>
                        {`c_connect("${record.__addr}", ${record.port})`}
                    </Paragraph>
                </div>
            ),
        },
    ];


    return (
        <>
            <Modal
                getContainer={false}
                open={openWorld}
                footer={null}
                onOk={()=>{setOpenWorld(false)}}
                onCancel={()=>{setOpenWorld(false)}}
            >
                <br/>
                <div style={{
                    maxHeight: 400,
                    overflowY: 'auto',
                    padding: '16px'
                }}>
                <World secondariesJson={world}/>
                </div>
            </Modal>

            <Modal
                width={920}
                getContainer={false}
                open={openHomeDetail}
                footer={null}
                onOk={()=>{setOpenHomeDetail(false);}}
                onCancel={()=>{setOpenHomeDetail(false);setLoading(true);}}
            >
                <Skeleton title loading={loading} active>
                    {/*<div style={{ height: 500}}>*/}
                    {/*    <LobbyServerDetail data={homeInfo} />*/}
                    {/*</div>*/}
                    <br/>
                    <HomeDetail home={homeInfo} />
                </Skeleton>
            </Modal>

            <ProTable
                columns={columns}
                cardBordered
                request={async (params = {}, sort, filter) => {
                    const resp = await lobbyServerListApi(params)
                    return {
                        data: resp.data.data,
                        success: true,
                        total: resp.data.total
                    };
                }}
                scroll={{
                    x: 600,
                }}
                rowKey="__rowId"
                pagination={{
                    pageSize: 10,
                }}
                headerTitle="饥荒服务器列表"
            />
        </>
    );

};