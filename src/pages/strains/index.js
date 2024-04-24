import { LineChart } from "../Twin/LineCHart";
import { useEffect, useState } from "react";
import './index.css'
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import moment from 'moment';

export const Strains = () => {
    const labels1 = ['01-04-2023', '01-05-2023', '01-06-2023', '01-07-2023', '01-08-2023']
    const [toDate, setToDate] = useState(new Date("2023-01-01"));
    const [fromDate, setFromDate] = useState(new Date("2023-01-10"));
    const data1 = {
        labels: labels1,
        datasets: [
            {
                label: 'reading1',
                data: [71, 71.6, 70.3, 70.5, 71.2],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(108, 97, 91, 0.8)',
            }
        ],
    };
    const data2 = {
        labels: labels1,
        datasets: [
            {
                label: 'reading1',
                data: [65, 70, 73, 63, 69],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(108, 97, 91, 0.8)',
            }
        ],
    };
    const data3 = {
        labels: labels1,
        datasets: [
            {
                label: 'reading1',
                data: [73, 65, 70, 69, 71],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(108, 97, 91, 0.8)',
            }
        ],
    };
    const data4 = {
        labels: labels1,
        datasets: [
            {
                label: 'reading1',
                data: [64, 70, 75, 63, 70],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(108, 97, 91, 0.8)',
            }
        ],
    };
    const data5 = {
        labels: labels1,
        datasets: [
            {
                label: 'reading1',
                data: [60, 65, 75, 70, 64],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(108, 97, 91, 0.8)',
            }
        ],
    };
    const data6 = {
        labels: labels1,
        datasets: [
            {
                label: 'reading1',
                data: [72, 70, 75, 63, 60],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(108, 97, 91, 0.8)',
            }
        ],
    };
    const [data, setData] = useState(data1)
    const [finalData, setFinalData] = useState(true)
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
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
                    text: 'Temperature',
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

    const handleFilter = () => {
        console.log(finalData)
        if (finalData) {
            const differenceInTime = fromDate.getTime() - toDate.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            const labels1 = getLabels(toDate, differenceInDays)
            const data1 = {
                labels: labels1,
                datasets: getDataSets(differenceInDays, 'Blue Dream'),
            };
            return data1
        }
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

    const getRandomData = (diff, avg) => {
        const max = 80;
        const min = 60;
        const randomNumbers = [];
        for (let i = 0; i <= diff+1; i++) {
            randomNumbers.push(avg ? avg : Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return randomNumbers
    }

    const getDataSets = (diff, strain) => {
        const dataSets = [
            {
                label: strain,
                data: getRandomData(diff),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
        return dataSets
    }

    useEffect(() => {
        setFinalData(true)
    }, [finalData])

    return (
        <div className="p-3">
            <div className="d-flex mb-2" style={{alignItems:'center'}}>
                <div className="me-2">
                    <span className="labelHeading">To:</span>
                    <DatePicker selected={toDate} onChange={date => setToDate(date)} />
                </div>
                <div>
                    <span className="labelHeading">From:</span>
                    <DatePicker selected={fromDate} onChange={date => setFromDate(date)} />
                </div>
                <div className="ms-2">
                    <button className="btn btn-primary" onClick={() => handleFilter()}>submit</button>
                </div>
            </div>
            <div className="row">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0`} >
                    <h5 className="mt-2 mb-4">Blue Dream Temperature {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart height={120} data={handleFilter()} options={options} />
                </div>
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <h5 className="mt-2 mb-4">Sour Diesel Temperature {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart height={120} data={handleFilter()} options={options} />
                </div>
            </div>
            <div className="row">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0`}>
                    <h5 className="mt-2 mb-4">Golden Goat Temperature {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart height={120} data={handleFilter()} options={options} />
                </div>
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <h5 className="mt-2 mb-4">MAC Temperature {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart height={120} data={handleFilter()} options={options} />
                </div>
            </div>
            <div className="row">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0`}>
                    <h5 className="mt-2 mb-4">Double Tahoe Temperature {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart height={120} data={handleFilter()} options={options} />
                </div>
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <h5 className="mt-2 mb-4">Space Queen Temperature {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart height={120} data={handleFilter()} options={options} />
                </div>
            </div>
        </div>
    )
}