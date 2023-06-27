import { Tabs } from 'antd';
import HomeOverView from "./HomeOverView.jsx";
import HomePlayers from "./HomePlayers.jsx";
import HomeModInfo from "./HomeModInfo.jsx";
import HomeWorld from "./HomeWorld.jsx";


export default (props) => {
    const {data} = props
    const players = data.playerList || []
    const home = data
    const mods = data.mods_info || {}
    const items = [
        {
            label: '概要',
            key: '1',
            children: (<div>{<HomeOverView home={home}/>}</div>)
        },
        {
            label: '玩家',
            key: '2',
            children: (<div>{<HomePlayers players={players} />}</div>)
        },
        {
            label: '世界',
            key: '3',
            children: (<div>{<HomeWorld data={data} />}</div>)
        },
        {
            label: 'MOD',
            key: '4',
            children: (<div>{<HomeModInfo mods={mods} />}</div>)
        }
    ]

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                centered
                items={items}
            />
        </>
    )
}
