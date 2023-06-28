import {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {lobbyServerHistoryApi} from "../../api/lobbyServerApi.js";
import {getBeginWeek, getEndWeek} from "../../utils/date.js";

function wrapText(text, wrapLength) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (currentLine.length + word.length <= wrapLength) {
            currentLine += word + ' ';
        } else {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        }
    }

    lines.push(currentLine.trim());

    return lines.join('\n');
}


export default ({title,rowId})=>{
    const chartRef = useRef(null);
    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        lobbyServerHistoryApi({
            rowId: rowId,
            startDate: getBeginWeek(),
            endDate: getEndWeek()
        }).then((resp)=>{
            // console.log(resp.data)
            const dateData = resp.data.map(item=>item.date.slice(5)) || []
            const maxconnectionsData = resp.data.map(item=>item.maxconnections) || []
            const connectedData = resp.data.map(item=>item.connected) || []

            chart.setOption({
                // 在这里设置图表的选项
                title: {
                    text: `${wrapText(title, 15)}`,
                    textStyle: {
                        fontSize: 14,
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['connected', 'maxconnections']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: dateData,
                    // axisLabel: {
                    //     rotate: 45
                    // }
                },
                yAxis: {},
                series: [
                    {
                        name: 'connected',
                        type: 'line',
                        data: connectedData
                    },
                    {
                        name: 'maxconnections',
                        type: 'line',
                        data: maxconnectionsData
                    },
                ]
            });
        })

        return () => {
            chart.dispose();
        };
    }, []);

    return (
        <div ref={chartRef} style={{ width: '100%', height: 400 }}></div>
    );
}