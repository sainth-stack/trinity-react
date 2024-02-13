import { LineChart } from "./LineCHart";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";
import './index.css'
import { addDays } from 'date-fns';
import moment from 'moment';

export const Humidity = () => {
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
        ],
    };
    const [data, setData] = useState(data1)
    const [toDate, setToDate] = useState(new Date("2023-01-01"));
    const [fromDate, setFromDate] = useState(new Date("2023-02-19"));
    const [tag, setTag] = useState("1A4000312A000F2B0000012395(Blue Dream)")
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
        label: '1A4000312A000F2B0000012395(Blue Dream)', value: "1A4000312A000F2B0000012395(Blue Dream)"
    },
    {
        label: '1A4000312A000F2B0000012396(Soure Diesel)', value: "1A4000312A000F2B0000012396(Soure Diesel)"
    },
    {
        label: '1A4000312A000F2B0000012397(Golden Goat)', value: "1A4000312A000F2B0000012397(Golden Goat)"
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
        for (let i = 1; i <= diff + 1; i++) {
            addConstant(`${moment(addDays(toDate, i)).format("YYYY-MM-DD")}`);
        }
        console.log(constantsArray)
        return constantsArray
    }

    const getRandomData = (diff,avg) => {
        const max = 60;
        const min = 40;
        const randomNumbers = [];
        for (let i = 0; i <= diff; i++) {
            randomNumbers.push(avg ? avg:Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return randomNumbers
    }

    const getDataSets = (diff) => {
        const dataSets = [
            // {
            //     label: 'reading1',
            //     data: getRandomData(diff),
            //     borderColor: 'rgb(255, 99, 132)',
            //     backgroundColor: 'rgba(108, 97, 91, 0.8)',
            // },
            {
                label: 'strain',
                data: getRandomData(diff),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            // {
            //     label: 'reading3',
            //     data: getRandomData(diff),
            //     borderColor: 'rgba(53, 162, 235, 0.5)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
            // {
            //     label: 'reading4',
            //     data: getRandomData(diff),
            //     borderColor: 'rgba(155, 88, 53, 0.8)',
            //     backgroundColor: 'rgba(155, 88, 53, 0.8)',
            // },
            // {
            //     label: 'reading5',
            //     data: getRandomData(diff),
            //     borderColor: 'rgba(61, 155, 53, 0.8)',
            //     backgroundColor: 'rgba(61, 155, 53, 0.8)',
            // },
            {
                label: 'average',
                data: getRandomData(diff, 51),
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgb(145, 56, 49)',
            },
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
                datasets: getDataSets(differenceInDays),
            };
            setData(data1)
        } else if (tag == "1A4000312A000F2B0000012396") {
            const labels1 = getLabels(toDate, differenceInDays)
            const data1 = {
                labels: labels1,
                datasets: getDataSets(differenceInDays),
            };
            setData(data1)
        } else {
            const labels1 = getLabels(toDate, differenceInDays)
            const data1 = {
                labels: labels1,
                datasets: getDataSets(differenceInDays),
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
                <label>
                    <span className="mb-2">Choose a Plant Tag:</span>
                    <select className="select-css mb-4" onChange={(e) => onSelect(e)} value={tag}>
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
                <div className="d-flex mb-2" style={{alignItems:'center'}}>
                    <div className="me-2">
                        <span>To:</span>
                        <DatePicker selected={toDate} onChange={date => setToDate(date)} />
                    </div>
                    <div>
                        <span>From:</span>
                        <DatePicker selected={fromDate} onChange={date => setFromDate(date)} />
                    </div>
                    <div className="ms-2">
                        <button className="btn btn-primary" onClick={() => handleFilter()}>submit</button>
                    </div>
                </div>
                <div className={`col gradient-color card shadow rounded m-1 p-1 border-0 me-3 tempChart`} style={{height:"450px"}}>
                    <Heading title="Overall Cultivation Humidity" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data} />
                </div>
            </div>
        </div>
    )
}