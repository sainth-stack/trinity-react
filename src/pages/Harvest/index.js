import './index.css'
import { options, finalData, finalData2, finalData3, finalData4, finalData5, finalData6, finalData7, finalData8, bubbleOptions, humidityOptions } from './constants'
import { ApexChart } from './LineCHart'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react'
import { LineChart } from "../Twin/LineCHart";
import { addDays } from 'date-fns';
import moment from 'moment';

export const Harvest = () => {
    const data1l = {
        labels: ['04-29-2023', '05-03-2023', '06-05-2023'],
        datasets: [{
            label: 'Ideal Temperature',
            data: [66, 68, 62],
            borderColor: '#332288',
            backgroundColor: '#332288',
        },
        {
            label: 'Ideal Humidity',
            data: [57, 52, 55],
            borderColor: '#88CCEE',
            backgroundColor: '#88CCEE',
        },
        {
            label: 'g/plant',
            data: [399, 468, 646.8],
            borderColor: '#44AA99',
            backgroundColor: '#44AA99',
        },
        {
            label: 'Quality',
            data: [2.45, 1.78, 2.00],
            borderColor: 'rgb(255,165,0)',
            backgroundColor: 'rgb(255,165,0)',
        },
        {
            label: 'Perforamnce',
            data: [977.55, 833.04, 1293.60],
            borderColor: '#999933',
            backgroundColor: '#999933',
        }],
    };
    const [finData, setFinData] = useState(data1l)
    const [data, setData] = useState(finalData)
    const [data1, setData1] = useState(finalData2)
    const [data2, setData2] = useState(finalData3)
    const [data3, setData3] = useState(finalData4)
    const [toDate, setToDate] = useState(new Date("2023-02-19"));
    const [fromDate, setFromDate] = useState(new Date("2023-01-6"));
    const [tag, setTag] = useState("Blue Dream")
    const [activitys, setActivity] = useState('All')
    const handleFilter = (min, max) => {
        if (finalData) {
            const differenceInTime = fromDate.getTime() - toDate.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            const labels1 = getLabels(toDate, differenceInDays)
            const data1 = {
                labels: labels1,
                datasets: getDataSets(differenceInDays, min, max),
            };
            return data1
        }
    }
    const getDataSets = (diff, min, max) => {
        const dataSets = [
            {
                label: 'Blue Dream',
                data: getRandomData(diff, min, max),
                borderColor: '#332288',
                backgroundColor: '#332288',
            },
            {
                label: 'Sour Diesel',
                data: getRandomData(diff, min, max),
                borderColor: '#88CCEE',
                backgroundColor: '#88CCEE',
            },
            {
                label: 'Golden Goat',
                data: getRandomData(diff, min, max),
                borderColor: '#44AA99',
                backgroundColor: '#44AA99',
            },
            {
                label: 'Cereal Milk',
                data: getRandomData(diff, min, max),
                borderColor: '#117733',
                backgroundColor: '#117733',
            },
            {
                label: 'Ghost Train Haze',
                data: getRandomData(diff, min, max),
                borderColor: '#999933',
                backgroundColor: '#999933',
            },
            {
                label: 'Wedding cake',
                data: getRandomData(diff, min, max),
                borderColor: '#DDCC77',
                backgroundColor: '#DDCC77',
            },
        ]
        return dataSets
    }
    const getLabels = (toDate, diff) => {
        const constantsArray = [];
        function addConstant(value) {
            constantsArray.push(value);
        }
        for (let i = 0; i <= diff + 1; i++) {
            addConstant(`${moment(addDays(toDate, i)).format("YYYY-MM-DD")}`);
        }
        console.log(constantsArray)
        return constantsArray
    }

    const getRandomData = (diff, min, max) => {
        const maxi = max ? max : 80;
        const mini = min ? min : 60;
        const randomNumbers = [];
        for (let i = 0; i <= diff + 1; i++) {
            randomNumbers.push(max === 30 ? generateRandomNumber1() : Math.floor(Math.random() * (maxi - mini + 1)) + mini);
        }
        return randomNumbers
    }

    const generateRandomNumber1 = () => {
        var randomFactor = Math.floor(Math.random() * 3);
        // Map the random factor to 10, 20, or 30
        var result = 10 + randomFactor * 10;
        return result;
    }
    const gp1 = {
        xaxis: {
            title: {
                text: 'Strains',
                floating: true,
                size: '10px'
            },
        },
        yaxis: {
            title: {
                text: 'plants',
                size: '10px'
            },
        },
    }
    const gp2 = {
        xaxis: {
            title: {
                text: 'Strains',
                floating: true,
            },
        },
        yaxis: {
            title: {
                text: 'g/plant',
            },
        },
    }
    const gp3 = {
        xaxis: {
            title: {
                text: 'Strains',
                floating: true,
            },
        },
        yaxis: {
            title: {
                text: 'g',
            },
        },
    }



    const options = {
        series: [{
            name: 'Plants',
            data: [48, 31, 17, 43, 26, 14, 17]
        }, {
            name: 'g/plant',
            data: [249, 213, 250, 238, 243, 273, 234]
        }, {
            name: 'g',
            data: [11952, 6603, 4250, 10234, 6318, 3822, 3978]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val
                }
            }
        }
    };

    const optionsl = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                    color: 'black',
                    fontWeight: 700,
                    padding: 5
                },
                grid: {
                    display: false,
                }
            },
            y: {
                title: {
                    display: true,
                    text: '',
                    color: 'black',
                    fontWeight: 700,
                    padding: 5
                },
                grid: {
                    display: false
                }
            }
        }
    };

    const data2l = {
        labels: ['04-29-2023', '05-03-2023', '06-05-2023'],
        datasets: [{
            label: 'Blue Dream',
            data: [40, 48, 52],
            borderColor: '#332288',
            backgroundColor: '#332288',
        },
        {
            label: 'Double Tahoe',
            data: [50, 43, 48],
            borderColor: '#88CCEE',
            backgroundColor: '#88CCEE',
        },
        {
            label: 'OG Kush',
            data: [50, 49, 53],
            borderColor: '#44AA99',
            backgroundColor: '#44AA99',
        },
        {
            label: 'Jilly Bean',
            data: [57, 43, 45],
            borderColor: '#117733',
            backgroundColor: '#117733',
        },
        {
            label: 'Sour Diesel',
            data: [40, 45, 41],
            borderColor: '#999933',
            backgroundColor: '#999933',
        }],
    };
    const data3l = {
        labels: ['04-29-2023', '05-03-2023', '06-05-2023'],
        datasets: [{
            label: 'Blue Dream',
            data: [399, 468, 648.6],
            borderColor: '#332288',
            backgroundColor: '#332288',
        },
        {
            label: 'Double Tahoe',
            data: [420, 460, 540],
            borderColor: '#88CCEE',
            backgroundColor: '#88CCEE',
        },
        {
            label: 'OG Kush',
            data: [550, 490, 530],
            borderColor: '#44AA99',
            backgroundColor: '#44AA99',
        },
        {
            label: 'Jilly Bean',
            data: [570, 430, 550],
            borderColor: '#117733',
            backgroundColor: '#117733',
        },
        {
            label: 'Sour Diesel',
            data: [520, 450, 510],
            borderColor: '#999933',
            backgroundColor: '#999933',
        }],
    };
    const data4l = {
        labels: ['04-29-2023', '05-03-2023', '06-05-2023'],
        datasets: [{
            label: 'Blue Dream',
            data: [977.55, 833.04, 1293.60],
            borderColor: '#332288',
            backgroundColor: '#332288',
        },
        {
            label: 'Double Tahoe',
            data: [877, 830, 750],
            borderColor: '#88CCEE',
            backgroundColor: '#88CCEE',
        },
        {
            label: 'OG Kush',
            data: [800, 1200, 777],
            borderColor: '#44AA99',
            backgroundColor: '#44AA99',
        },
        {
            label: 'Jilly Bean',
            data: [1100, 700, 800],
            borderColor: '#117733',
            backgroundColor: '#117733',
        },
        {
            label: 'Sour Diesel',
            data: [600, 500, 450],
            borderColor: '#999933',
            backgroundColor: '#999933',
        }],
    };

    const plantTags = [{
        label: 'Blue Dream', value: "Blue Dream"
    },
    {
        label: 'Soure Diesel', value: "Soure Diesel"
    },
    {
        label: 'Golden Goat', value: "Golden Goat"
    }
    ]
    const activity = [{
        label: 'All', value: "All"
    },
    {
        label: 'Ideal Temperature', value: "Ideal Temperature"
    },
    {
        label: 'Ideal Humidity', value: "Ideal Humidity"
    },
    {
        label: 'g/plant', value: "g/plant"
    },
    {
        label: 'Quality', value: "Quality"
    },
    {
        label: 'Perforamnce', value: "Perforamnce"
    }
    ]
    const onSelect = (e) => {
        setTag(e.target.value)
    }
    const onSelectActivity = (e) => {
        setActivity(e.target.value)
    }

    const handleFinDataFilter = () => {
        const data =activitys ==='All'? data1l?.datasets: data1l?.datasets.filter((item) => item.label === activitys)
        setFinData({...finData,datasets:data})
    }
    return (
        <div>
            {/* <div className="d-flex mb-2">
                <div className="me-2">
                    <span>To:</span>
                    <DatePicker selected={toDate} onChange={date => setToDate(date)} />
                </div>
                <div>
                    <span>From:</span>
                    <DatePicker selected={fromDate} onChange={date => setFromDate(date)} />
                </div>
                <div className="ms-2">
                    <button onClick={() => handleFilter()}>submit</button>
                </div>
            </div>
            <div className='row p-2 gy-2 ps-4 pe-3 no-gutters'>
                <div className='col-6 card'>
                    <h6 className="ps-2 pt-2" style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>plants vs Strains</h6>
                    <ApexChart series={data} options={{ ...options, colors: ["#ffbf00"], xaxis: gp1.xaxis, yaxis: gp1.yaxis }} height={"250px"} width={"100%"} />
                </div>
                <div className='col-6 ps-2'>
                    <div className='card'>
                        <h6 className="ps-2 pt-2" style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>g/plant vs Strains</h6>
                        <ApexChart series={data1} options={{ ...options, colors: ["#ffbf00"], xaxis: gp2.xaxis, yaxis: gp2.yaxis }} height={"250px"} width={"100%"} />
                    </div>
                </div>
                <div className='col-6 card'>
                    <h6 className="ps-2 pt-2" style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>g vs Strains</h6>
                    <ApexChart series={data2} options={{ ...options, colors: ["#ffbf00"], xaxis: gp3.xaxis, yaxis: gp3.yaxis }} height={"250px"} width={"100%"} />
                </div>
            </div> */}
            <div className='row p-2 gy-2 ps-4 pe-3 no-gutters'>
                <div className='d-flex w-100' style={{ width: '100%' }}>
                    <div className='d-flex justify-content-center' style={{ width: '100%' }}>
                        <span className="mb-2 mt-2" style={{ width: '20%' }}>Choose a Strain</span>
                        <select className="select-css mb-2 ms-1" onChange={(e) => onSelect(e)} value={tag}>
                            {
                                plantTags.map((item) => {
                                    return (
                                        <option>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='d-flex ms-2' style={{ width: '100%' }}>
                        <span className="mb-2 mt-1" style={{ width: '65px' }}>Activity</span>
                        <select className="select-css mb-2" onChange={(e) => onSelectActivity(e)} value={activitys}>
                            {
                                activity.map((item) => {
                                    return (
                                        <option>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="ms-2">
                        <button className='btn btn-primary' onClick={() => handleFinDataFilter()}>submit</button>
                    </div>
                </div>
                <div className='col-6 card'>
                    <h5 className="mt-2 mb-4"></h5>
                    <LineChart data={finData} height={120} options={{
                        ...optionsl, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: '',
                                    color: 'black',
                                    fontWeight: 700,
                                    padding: 5
                                },
                                grid: {
                                    display: false
                                }
                            }

                        }
                    }} />
                </div>
                {/* <div className='col-6 ps-2'>
                    <div className='card p-2'>
                        <h5 className="mt-1 mb-4">Average Humidity</h5>
                        <LineChart data={data2l} height={120} options={{
                            ...optionsl, scales: {
                                ...options.scales,
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Humidity',
                                        color: 'black',
                                        fontWeight: 700,
                                        padding: 5
                                    },
                                    grid: {
                                        display: false
                                    }
                                }

                            }
                        }} />
                    </div>
                </div> */}
            </div>
            {/* <div className='row p-2 gy-2 ps-4 pe-3 no-gutters'>
                <div className='col-6 card'>
                    <h5 className="mt-2 mb-4">Average g/plant</h5>
                    <LineChart data={data3l} height={120} options={{
                        ...optionsl, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: 'g/plant',
                                    color: 'black',
                                    fontWeight: 700,
                                    padding: 5
                                },
                                grid: {
                                    display: false
                                }
                            }

                        }
                    }} />
                </div>
                <div className='col-6 ps-2'>
                    <div className='card p-2'>
                        <h5 className="mt-1 mb-4">Average Quality(Value)</h5>
                        <LineChart data={data4l} height={120} options={{
                            ...optionsl, scales: {
                                ...options.scales,
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Value',
                                        color: 'black',
                                        fontWeight: 700,
                                        padding: 5
                                    },
                                    grid: {
                                        display: false
                                    }
                                }

                            }
                        }} />
                    </div>
                </div>
            </div> */}
        </div>
    )
}