import World from "./World.jsx";

export default ({data}) => {

    return (
        <>
            <div style={{
                padding: '16px'
            }}>
                <h3>主世界</h3>
                <div><span>ip: {data.__addr}:{data.port}</span></div>
                <div><span>steamid: {data.steamid}</span></div>
            </div>
            {data.secondariesJson !== "" &&
                <div style={{
                    maxHeight: 240,
                    overflowY: 'auto',
                    padding: '0px 16px 16px 16px'
                }}>
                    <World secondariesJson={data.secondariesJson}/>
                </div>
            }
        </>
    )

}