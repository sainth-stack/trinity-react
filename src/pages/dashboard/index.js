import { LineChart } from "../Twin/LineCHart";
import { useEffect, useState } from "react";
import './index.css'
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import moment from 'moment';

const Dashboard = () => {
    const [toDate, setToDate] = useState(new Date("2023-01-01"));
    const [fromDate, setFromDate] = useState(new Date("2023-01-6"));
    const [finalData, setFinalData] = useState(true)
    const options = {
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

    useEffect(() => {
        setFinalData(true)
    }, [finalData])

    const getQualityData = () => {
        const data = handleFilter(1, 3)
        const averageData = data.datasets.reduce((average, dataset) => {
            dataset.data.forEach((value, index) => {
                if (!average[index]) {
                    average[index] = 0;
                }
                average[index] += value;
            });
            return average;
        }, []).map((sum) => sum / data.datasets.length);
        data.datasets.push({
            label: 'Average',
            data: averageData,
            borderColor: 'balck', // Choose the color for the average line
            fill: false,
        });
        return data
    }

    const getGramsData = () => {
        const data = handleFilter(5000, 15000)
        const averageData = data.datasets.reduce((average, dataset) => {
            dataset.data.forEach((value, index) => {
                if (!average[index]) {
                    average[index] = 0;
                }
                average[index] += value;
            });
            return average;
        }, []).map((sum) => sum / data.datasets.length);
        data.datasets.push({
            label: 'Average',
            data: averageData,
            borderColor: 'balck', // Choose the color for the average line
            fill: false,
        });
        return data
    }

    const getGramsPerPlantData = () => {
        const data = handleFilter(200, 400)
        const averageData = data.datasets.reduce((average, dataset) => {
            dataset.data.forEach((value, index) => {
                if (!average[index]) {
                    average[index] = 0;
                }
                average[index] += value;
            });
            return average;
        }, []).map((sum) => sum / data.datasets.length);
        data.datasets.push({
            label: 'Average',
            data: averageData,
            borderColor: 'balck', // Choose the color for the average line
            fill: false,
        });
        return data
    }

    const plantsData = () => {
        const data = handleFilter(40, 60)
        const averageData = data.datasets.reduce((average, dataset) => {
            dataset.data.forEach((value, index) => {
                if (!average[index]) {
                    average[index] = 0;
                }
                average[index] += value;
            });
            return average;
        }, []).map((sum) => sum / data.datasets.length);
        data.datasets.push({
            label: 'Average',
            data: averageData,
            borderColor: 'balck', // Choose the color for the average line
            fill: false,
        });
        return data
    }


    return (
        <div className="p-3">
            <div className="d-flex mb-2">
                <div className="me-2">
                    <span className="labelHeading">To:</span>
                    <DatePicker selected={toDate} onChange={date => setToDate(date)} />
                </div>
                <div>
                    <span className="labelHeading">From:</span>
                    <DatePicker selected={fromDate} onChange={date => setFromDate(date)} />
                </div>
                <div className="ms-2">
                    <button onClick={() => handleFilter()} className="btn btn-primary mt-1">submit</button>
                </div>
            </div>
            <div className="row">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0`} >
                    <h5 className="mt-2 mb-4">Plants {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart data={plantsData()} height={120} options={{
                        ...options, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: 'Plants',
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
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <h5 className="mt-2 mb-4">g/plants {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart data={getGramsPerPlantData()} height={120} options={{
                        ...options, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: 'g/plants',
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
            <div className="row">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0`}>
                    <h5 className="mt-2 mb-4">Yield (g) {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart data={getGramsData()} height={120} options={{
                        ...options, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: 'Yield (g)',
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
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <h5 className="mt-2 mb-4">Quality {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart data={getQualityData()} height={120} options={{
                        ...options, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: 'quantity',
                                    color: 'black',
                                    fontWeight: 700,
                                    padding: 5
                                },
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    // forces step size to be 50 units
                                    stepSize: 1,
                                    callback: function (value, index, ticks) {
                                        if (value == 1) {
                                            return 'A'
                                        } else if (value == 2) {
                                            return 'B'
                                        } else if (value == 3) {
                                            return 'C'
                                        }
                                    }
                                }
                            }

                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;