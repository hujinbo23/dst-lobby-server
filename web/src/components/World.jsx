import {Card, Form, Space} from "antd";

export default (props) => {
    const {secondariesJson} = props
    const secondaries = JSON.parse(secondariesJson)
    return (
        <>
            <h3>从世界</h3>
            <h4>层数: {Object.keys(secondaries).length}</h4>
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