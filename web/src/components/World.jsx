import {Card, Form, Space} from "antd";

export default (props) => {
    const {secondariesJson} = props
    let json = "{}"
    if (secondariesJson !== null && secondariesJson !== undefined && secondariesJson !== "") {
        json = secondariesJson
    }
    console.log()
    const secondaries = JSON.parse(json)
    return (
        <>
            <div className="text-base font-medium pb-2">层数: {Object.keys(secondaries).length}</div>
            {Object.keys(secondaries).map(key => (
                <div key={key}>
                    <Card bordered={false} style={{
                        backgroundColor: '#F0F2F5'
                    }}>
                        <div>
                            <spn>世界Id: {secondaries[key].id}</spn>
                        </div>
                        <div>
                            <spn>世界Ip: {secondaries[key].__addr}:{secondaries[key].port}</spn>
                        </div>
                        <div>
                            <spn>steam: {secondaries[key].steamid}</spn>
                        </div>
                    </Card>
                    <br/>
                </div>
            ))}
        </>
    )
}