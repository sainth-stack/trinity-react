import './index.css'
import { options, finalData, finalData2, finalData3, finalData4, finalData5, finalData6, finalData7, finalData8, bubbleOptions,humidityOptions } from './constants'
import { ApexChart } from './LineCHart'
import { useState } from 'react'
export const Harvest = () => {
    const [data, setData] = useState(finalData)
    const [data1, setData1] = useState(finalData2)
    const [data2, setData2] = useState(finalData3)
    const [data3, setData3] = useState(finalData4)

    const plantTags = [{
        label: '02/19/2023', value: "02/19/2023"
    },
    {
        label: '02/25/2023', value: "02/25/2023"
    }
    ]

    const onSelect = (e) => {
        if (e.target.value == "02/19/2023") {
            setData(finalData)
            setData1(finalData2)
            setData2(finalData3)
        } else if (e.target.value == "02/25/2023") {
            setData(finalData5)
            setData1(finalData6)
            setData2(finalData7)
        } else {
            setData(finalData)
            setData1(finalData2)
            setData2(finalData3)
        }
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
                text: 'No.of plants',
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


    return (
        <div>
            {/* <label style={{ width: '98%' }} className='m-2 me-2'>
                <span className="mb-2">Choose a Date:</span>
                <select className="select-css mb-4" onChange={(e) => onSelect(e)}>
                    <option>Select</option>
                    {
                        plantTags.map((item) => {
                            return (
                                <option>{item.label}</option>
                            )
                        })
                    }
                </select>
            </label> */}
            <div className="ms-4 me-4 d-flex">
                <div className='card m-1 p-1' style={{ minHeight: "370px", maxHeight: "385px", width: "100%" }}>
                    <h6 className="ps-2" style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Temperature vs g/plant</h6>
                    <ApexChart type='scatter' options={bubbleOptions.options} series={bubbleOptions.series} height={"330px"} width={"100%"} />
                </div>
                {/* <div className='card m-1 p-1' style={{ minHeight: "285px", maxHeight: "285px", width: "100%" }}>
                    <h6 className="ps-2" style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Strains vs g/plant</h6>
                    <ApexChart series={data1} options={{ ...options, colors: ["#ffbf00"], xaxis: gp2.xaxis, yaxis: gp2.yaxis }} height={"250px"} width={"100%"} />
                </div> */}
            </div>
            <div className="ms-4 me-4 d-flex">
                <div className='card m-1 p-1' style={{ minHeight: "370px", maxHeight: "385px", width: "100%" }}>
                    <h6 className="ps-2" style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Humidity vs g/plant</h6>
                    <ApexChart type='scatter' options={humidityOptions.options} series={humidityOptions.series} height={"330px"} width={"100%"} />
                </div>
                {/* <div className='card m-1 p-1' style={{ minHeight: "285px", maxHeight: "285px", width: "100%" }}>
                    <h6 className="ps-2" style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Strains vs g/plant</h6>
                    <ApexChart series={data1} options={{ ...options, colors: ["#ffbf00"], xaxis: gp2.xaxis, yaxis: gp2.yaxis }} height={"250px"} width={"100%"} />
                </div> */}
            </div>
            {/* <div className="ms-4 me-4 d-flex">
                <div className='card m-1 p-1' style={{ minHeight: "285px", maxHeight: "285px", width: "100%" }}>
                    <h6 className="ps-2" style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Strains vs grams</h6>
                    <ApexChart series={data2} options={{ ...options, colors: ["#3dc7d1"], xaxis: gp3.xaxis, yaxis: gp3.yaxis }} height={"250px"} width={"100%"} />
                </div>
                <div style={{ minHeight: "265px", maxHeight: "265px", width: "100%" }}>
                    <ApexChart type='scatter' options={bubbleOptions.options} series={bubbleOptions.series} height={"250px"} width={"100%"} />
                </div>
            </div> */}
        </div>
    )
}