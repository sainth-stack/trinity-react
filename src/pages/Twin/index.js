import { LineChart } from "./LineCHart";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";
import './index.css'
import { addDays } from 'date-fns';
import moment from 'moment';

export const Twin = () => {
    const labels1 = ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05']
    const data1 = {
        labels: labels1,
        datasets: [
            {
                label: 'reading1',
                data: [60, 68, 69, 65, 63, 66, 64],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(108, 97, 91, 0.8)',
            },
            {
                label: 'reading2',
                data: [67, 69, 66, 69, 68, 70, 71],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'reading3',
                data: [67, 69, 66, 69, 68, 65, 64],
                borderColor: 'rgba(53, 162, 235, 0.5)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'reading4',
                data: [69, 70, 66, 69, 70, 73, 70],
                borderColor: 'rgba(155, 88, 53, 0.8)',
                backgroundColor: 'rgba(155, 88, 53, 0.8)',
            },
            {
                label: 'reading5',
                data: [69, 70, 68, 64, 69, 66, 65],
                borderColor: 'rgba(61, 155, 53, 0.8)',
                backgroundColor: 'rgba(61, 155, 53, 0.8)',
            },
            {
                label: 'average',
                data: [65, 65, 65, 65, 65, 65, 65],
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgb(145, 56, 49)',
            },
        ],
    };
    const [data, setData] = useState(data1)
    const [toDate, setToDate] = useState(new Date("2023-01-01"));
    const [fromDate, setFromDate] = useState(new Date("2023-02-19"));
    const [tag, setTag] = useState("Room1")
    function Heading(props) {
        return (
            <div className="d-flex justify-content-between align-items-center p-2">
                {props.icon && props.icon} <h5>{props.title}</h5>
                {props.title === "OKR Progress" && <button
                    className="text-left justify-content-start bg-green text-light"
                    style={{ borderRadius: "4px", textTransform: "uppercase" }}
                // onClick={() => {
                //     props.setOrderModalShow3(true)
                // }}
                >
                    Add OKR
                </button>}
                <div className="dropdown actionDropdown">
                    <button
                        className="btn btn-light dropdown-hide align-items-center"
                        id="dropdownMenuButton"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="fa fa-ellipsis-h pe-auto" />
                    </button>
                    <div
                        className="dropdown-menu dropdown-menu-right text-left "
                        aria-labelledby="dropdownMenuButton"
                    >
                        <button
                            className="dropdown-item text-capitalize text-left justify-content-start"
                        // onClick={() => {
                        //     downloadSheet2()
                        // }}
                        >
                            Export as Excel
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    const plantTags = [{
        label: 'Room1', value: "Room1"
    },
    {
        label: 'Room2', value: "Room2"
    },
    {
        label: 'Room3', value: "Room3"
    }
    ]

    const onSelect = (e) => {
        setTag(e.target.value)
    }


    const getLabels = (toDate, diff) => {
        const constantsArray = [];
        function addConstant(value) {
            constantsArray.push(value);
        }
        for (let i = 0; i < diff + 1; i++) {
            addConstant(`${moment(addDays(toDate, i)).format("YYYY-MM-DD")}`);
        }
        return constantsArray
    }

    const getRandomData = (diff, avg,maximum,minimum) => {
        const max = maximum || 70;
        const min = minimum || 50;
        const randomNumbers = [];
        for (let i = 0; i <= diff; i++) {
            randomNumbers.push(avg ? avg : Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return randomNumbers
    }

    const getDataSets = (diff, strain) => {
        const dataSets = [
            // {
            //     label: 'strain',
            //     data: getRandomData(diff),
            //     borderColor: 'rgb(255, 99, 132)',
            //     backgroundColor: 'rgba(108, 97, 91, 0.8)',
            // },
            {
                label: "Temperature",
                data: getRandomData(diff),
                borderColor: '#88CCEE',
                backgroundColor: '#88CCEE',
            },
            {
                label: "Humidity",
                data: getRandomData(diff,false,65,45),
                borderColor: '#44AA99',
                backgroundColor: '#44AA99',
            },
            {
                label: 'CO2',
                data: getRandomData(diff,false,300,1200),
                borderColor: '#332288',
                backgroundColor: '#332288',
            },
            {
                label: 'LSI',
                data: getRandomData(diff,false,300,1200),
                borderColor: '#999933',
                backgroundColor: '#999933',
            },
            // {
            //     label: 'average',
            //     data: getRandomData(diff, 63),
            //     // borderColor: 'rgb(255, 0, 0)',
            //     // backgroundColor: 'rgb(145, 56, 49)',
            // },
        ]
        return dataSets
    }



    const handleFilter = () => {
        const differenceInTime = fromDate.getTime() - toDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        if (tag == "1A4000312A000F2B0000012395") {
            const labels1 = getLabels(toDate, differenceInDays)
            const data1 = {
                labels: labels1,
                datasets: getDataSets(differenceInDays, 'Blue Dream'),
            };
            setData(data1)
        } else if (tag == "1A4000312A000F2B0000012396") {
            const labels1 = getLabels(toDate, differenceInDays)
            const data1 = {
                labels: labels1,
                datasets: getDataSets(differenceInDays, 'Soure Diesel'),
            };
            setData(data1)
        } else {
            const labels1 = getLabels(toDate, differenceInDays)
            const data1 = {
                labels: labels1,
                datasets: getDataSets(differenceInDays, 'Blue Dream'),
            };
            setData(data1)
        }
    }

    useEffect(() => {
        handleFilter()
    }, [])


    return (
        <div className="ms-4 me-4">
            <div className="row mt-3">
                <div style={{display:'flex',gap:'20px',marginBottom:'10px'}}>
                <label>
                    <span className="mt-1 me-1" style={{fontWeight:500}}>Room:</span>
                    <select className="select-css2" style={{minWidth:'300px'}} onChange={(e) => onSelect(e)} value={tag}>
                        <option>Select</option>
                        {
                            plantTags.map((item) => {
                                return (
                                    <option>{item.label}</option>
                                )
                            })
                        }
                    </select>
                </label>
                <div className="d-flex" style={{ alignItems: 'center' }}>
                    <div className="me-2">
                    <span className="me-1" style={{display:'block',fontWeight:500}}>Start Date:</span>
                        <DatePicker selected={toDate} onChange={date => setToDate(date)} className="select-css2"/>
                    </div>
                    <div>
                    <span className="me-1" style={{display:'block',fontWeight:500}}>End Date:</span>
                        <DatePicker selected={fromDate} onChange={date => setFromDate(date)} className="select-css2"/>
                    </div>
                    <div className="ms-2 mt-4">
                        <button className="btn btn-primary" style={{alignContent:'center',alignItems:'center',height:'40px'}} onClick={() => handleFilter()}>submit</button>
                    </div>
                </div>
                </div>
                <div className={`col gradient-color card shadow rounded m-1 p-1 border-0 me-3`} style={{ height: '450px' }}>
                    <Heading title="Overall Cultivation" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data} />
                </div>
            </div>
        </div>
    )
}