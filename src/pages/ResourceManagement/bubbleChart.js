import React from 'react';
import ReactBubbleChart from 'react-bubble-chart';
import './styles.css'
// import Actions          from '../Actions';
import Bubble from '../../assets/images/bubblechart.png'
var colorLegend = [
    //reds from dark to light
    { color: "#67000d", text: 'Negative', textColor: "#ffffff" }, "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2",
    //neutral grey
    { color: "#f0f0f0", text: 'Neutral' },
    // blues from light to dark
    "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", { color: "#08306b", text: 'Positive', textColor: "#ffffff" }
];

var tooltipProps = [{
    css: 'symbol',
    prop: '_id'
}, {
    css: 'value',
    prop: 'value',
    display: 'Last Value'
}, {
    css: 'change',
    prop: 'colorValue',
    display: 'Change'
}];

export const BubbleChartE = () => {
    const data = [
        {
            _id: 1,
            value: 20,
            colorValue: 'red',
            selected: false
        }
    ]
    return (
        // <ReactBubbleChart
        //     className="my-cool-chart"
        //     colorLegend={colorLegend}
        //     data={data}
        //     selectedColor="#737373"
        //     selectedTextColor="#d9d9d9"
        //     fixedDomain={{ min: -1, max: 1 }}
        //     //   onClick={Actions.doStuff.bind(Actions)}
        //     legend={true}
        //     legendSpacing={0}
        //     tooltip={true}
        //     tooltipProps={tooltipProps}
        // //   tooltipFunc={tooltipFunc}
        // />
        <img src={Bubble} alt='bubblechart' className='bubble' width={380}/>
    )
}