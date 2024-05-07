import { LineChart } from "./LineCHart";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useRef, useState } from "react";
import './index.css'
import { addDays } from 'date-fns';
import moment from 'moment';
import { read, utils } from 'xlsx'
import { data50 } from './data'
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
    const [data2, setData2] = useState(data1)
    const [excelData, setExcelData] = useState(null);
    const [toDate, setToDate] = useState(new Date("2024-01-31"));
    const [fromDate, setFromDate] = useState(new Date("2024-02-27"));
    const [tag, setTag] = useState("Room1")
    const [facility, setFacility] = useState('Facility 1')
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

    const [plantTags, setPlanttags] = useState([{
        label: 'Room1', value: "Room1"
    }, {
        label: 'Room2', value: "Room2"
    }
    ])

    const facilitys = [{
        label: 'Facility 1', value: "Facility 1"
    },
    {
        label: 'Facility 2', value: "Facility 2"
    },
    {
        label: 'Facility 3', value: "Facility 3"
    }
    ]

    const onSelect = (e) => {
        setTag(e.target.value)
    }

    const onSelectfacility = (e) => {
        if (e.target.value === 'Facility 1') {
            setPlanttags([{
                label: 'Room1', value: "Room1"
            },
            {
                label: 'Room2', value: "Room2"
            }
            ])
        } else if (e.target.value === 'Facility 2') {
            setPlanttags([{
                label: 'Room3', value: "Room3"
            },
            {
                label: 'Room4', value: "Room4"
            }
            ])
        }
        else if (e.target.value === 'Facility 3') {
            setPlanttags([{
                label: 'Room5', value: "Room5"
            },
            {
                label: 'Room6', value: "Room6"
            }
            ])
        }
        setFacility(e.target.value)
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

    const getRandomData = (diff, avg, maximum, minimum) => {
        const max = maximum || 70;
        const min = minimum || 50;
        const randomNumbers = [];
        for (let i = 0; i <= diff; i++) {
            randomNumbers.push(avg ? avg : Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return randomNumbers
    }

    const groupDataByDay = (data) => {
        function excelSerialDateToJSDate(serial) {
            const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
            const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Excel's epoch date

            // Calculate the number of milliseconds corresponding to the Excel date
            const milliseconds = (serial - 1) * millisecondsPerDay; // Subtracting 1 to account for Excel's epoch starting on December 30, 1899

            // Create a new Date object by adding the milliseconds to the Excel epoch date
            const jsDate = new Date(excelEpoch.getTime() + milliseconds);

            return jsDate;
        }
        const groupedData = {};
        data.forEach(obj => {
            const milliseconds = excelSerialDateToJSDate(obj["Date-Time (MST)"]);
            const date = new Date(milliseconds);
            date.setDate(date.getDate() + 1);
            const day = date.toISOString().split('T')[0]; // Extracting YYYY-MM-DD
            if (!groupedData[day]) {
                groupedData[day] = [];
            }
            groupedData[day].push(obj);
        });
        return groupedData;
    };

    const calculateAverages = (groupedData) => {
        const averages = {};
        for (const day in groupedData) {
            const dayData = groupedData[day];
            const averageObj = {};
            Object.keys(dayData[0]).forEach(key => {
                if (key !== "Date-Time (MST)") { // Exclude Date-Time from averaging
                    const sum = dayData.reduce((acc, obj) => acc + obj[key], 0);
                    averageObj[key] = sum / dayData.length;
                }
            });
            averages[day] = averageObj;
        }
        return averages;
    };

    useEffect(() => {
        if (excelData) {
            const datanew = groupDataByDay(excelData)
            const averages = calculateAverages(datanew);
            const labels = []
            const temp = []
            const humidity = []
            // const vpd=[]
            Object.keys(averages).map((item) => {
                const keys = Object.keys(averages[item])
                labels.push(item);
                temp.push(averages[item][keys[1]])
                humidity.push(averages[item][keys[2]])
            })
            const data1 = {
                labels: labels,
                datasets: [
                    {
                        label: "Temperature",
                        data: temp,
                        borderColor: '#88CCEE',
                        backgroundColor: '#88CCEE',
                        yAxisID: 'y',
                    },
                    {
                        label: "Humidity",
                        data: humidity,
                        borderColor: '#44AA99',
                        backgroundColor: '#44AA99',
                        yAxisID: 'y',
                    },
                    // {
                    //     label: "VPD",
                    //     data: getRandomData(30, false, 35, 45),
                    //     borderColor: '#DDCC77',
                    //     backgroundColor: '#DDCC77',
                    //     yAxisID: 'y1',
                    // },
                    // {
                    //     label: 'CO2',
                    //     data: getRandomData(2300, false, 300, 1200),
                    //     borderColor: '#332288',
                    //     backgroundColor: '#332288',
                    //     yAxisID: 'y',
                    // },
                    // {
                    //     label: 'LSI',
                    //     data: getRandomData(2500, false, 300, 1200),
                    //     borderColor: '#999933',
                    //     backgroundColor: '#999933',
                    //     yAxisID: 'y',
                    // }
                ],
            };
            setData2(data1)
        }
    }, [excelData]);

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
                yAxisID: 'y1',
            },
            {
                label: "Humidity",
                data: getRandomData(diff, false, 65, 45),
                borderColor: '#44AA99',
                backgroundColor: '#44AA99',
                yAxisID: 'y1',
            },
            {
                label: "VPD",
                data: getRandomData(diff, false, 35, 45),
                borderColor: '#DDCC77',
                backgroundColor: '#DDCC77',
                yAxisID: 'y1',
            },
            {
                label: 'CO2',
                data: getRandomData(diff, false, 300, 1200),
                borderColor: '#332288',
                backgroundColor: '#332288',
                yAxisID: 'y',
            },
            {
                label: 'LSI',
                data: getRandomData(diff, false, 300, 1200),
                borderColor: '#999933',
                backgroundColor: '#999933',
                yAxisID: 'y',
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
        console.log(fromDate, toDate)
        console.log(data2)
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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const binaryString = evt.target.result;
            const workbook = read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = utils.sheet_to_json(sheet, { header: 1 });
            const formattedData = data?.slice(1)?.map(row => ({
                "#": row[0],
                "Ch:1 - Temperature (°C)": row[2],
                "Ch:2 - RH (%)": row[3],
                "Date-Time (MST)": row[1],
                "Dew Point (°C)": row[4]
            }));

            setExcelData(formattedData);

        };

        reader.readAsBinaryString(file);
    };

    const inputFileRef = useRef(null);

    const onBtnClick = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    }

    console.log(data2)

    return (
        <div className="ms-4 me-4">
            <div className="row mt-3">
                <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                    <label>
                        <span className="labelHeading" style={{ fontWeight: 500 }}>Facilities:</span>
                        <select className="select-css2" style={{ minWidth: '300px' }} onChange={(e) => onSelectfacility(e)} value={facility}>
                            <option>Select</option>
                            {
                                facilitys.map((item) => {
                                    return (
                                        <option>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </label>
                    <label>
                        <span className="labelHeading" style={{ fontWeight: 500 }}>Room:</span>
                        <select className="select-css2" style={{ minWidth: '300px' }} onChange={(e) => onSelect(e)} value={tag}>
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
                            <span style={{ display: 'block', fontWeight: 500 }} className="labelHeading">To:</span>
                            <DatePicker selected={toDate} onChange={date => setToDate(date)} className="select-css2" />
                        </div>
                        <div>
                            <span style={{ display: 'block', fontWeight: 500 }} className="labelHeading">From:</span>
                            <DatePicker selected={fromDate} onChange={date => setFromDate(date)} className="select-css2" />
                        </div>
                        <div className="ms-2 mt-4">
                            <button className="btn btn-primary" style={{ alignContent: 'center', alignItems: 'center', height: '40px' }} onClick={() => handleFilter()}>submit</button>
                        </div>
                        <div className="ms-2 mt-4">
                            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} ref={inputFileRef} />
                            <button className="btn btn-primary" style={{ alignContent: 'center', alignItems: 'center', height: '40px' }} onClick={onBtnClick}>
                                upload
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`col-12 gradient-color card shadow rounded m-1 p-1 border-0 me-3`} style={{ height: '450px' }}>
                    <Heading title="Overall Cultivation" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data} options={true} />
                </div>

                <div className={`col-12 gradient-color card shadow rounded m-1 p-1 border-0 me-3`} style={{ height: '450px' }}>
                    <Heading title="Overall Cultivation" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data2} />
                </div>
            </div>
        </div>
    )
}