import { LineChart } from "./LineCHart";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useRef, useState } from "react";
import './index.css'
import { addDays } from 'date-fns';
import moment from 'moment';
import { read, utils } from 'xlsx'
import { CustomLegend } from "../../components/CustomLegend";
import axios from "axios";
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
    const [excelData, setExcelData] = useState([]);
    const [toDate, setToDate] = useState(new Date("2024-04-01"));
    const [fromDate, setFromDate] = useState(new Date("2024-04-30"));
    const [tag, setTag] = useState("room1")
    const [facility, setFacility] = useState('facility1')
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
        label: 'Room1', value: "room1"
    }
    ])

    const facilitys = [{
        label: 'Facility 1', value: "facility1"
    },
        // {
        //     label: 'Facility 2', value: "Facility 2"
        // },
        // {
        //     label: 'Facility 3', value: "Facility 3"
        // }
    ]

    const onSelect = (e) => {
        setTag(e.target.value)
    }

    const onSelectfacility = (e) => {
        if (e.target.value === 'Facility 1') {
            setPlanttags([{
                label: 'Room1', value: "room1"
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

    const parseDateTime = (date, time) => {
        try {
            // Assuming the date is in MM/DD/YYYY format and time is in HH.mm format
            const [month, day, year] = date.split('/');
            const [hours, minutes] = time.split('.').map(Number);
            return new Date(year, month - 1, day, hours, minutes);
        } catch (error) {
            console.error("Error parsing date and time:", error);
            return null;
        }
    };

    const groupDataByDay = (data) => {
        const groupedData = {};
        data.forEach(obj => {
            const date = parseDateTime(obj["Date"], obj["Time"]);
            if (date) {
                const day = date.toISOString().split('T')[0]; // Extracting YYYY-MM-DD
                if (!groupedData[day]) {
                    groupedData[day] = [];
                }
                groupedData[day].push(obj);
            }
        });
        return groupedData;
    };


    const calculateAverages = (groupedData) => {
        const averages = {};
        for (const day in groupedData) {
            const dayData = groupedData[day];
            const total = {
                "Ch:1 - Temperature (°C)": 0,
                "Ch:2 - RH (%)": 0,
                "CO2": 0,
                "LSI (Red)": 0,
                count: 0
            };

            dayData.forEach(obj => {
                total["Ch:1 - Temperature (°C)"] += parseFloat(obj["Ch:1 - Temperature (°C)"]);
                total["Ch:2 - RH (%)"] += parseFloat(obj["Ch:2 - RH (%)"]);
                total["CO2"] += parseFloat(obj["CO2"]);
                total["LSI (Red)"] += parseFloat(obj["LSI (Red)"]);
                total.count++;
            });

            averages[day] = {
                "Average Temperature (°C)": total["Ch:1 - Temperature (°C)"] / total.count,
                "Average RH (%)": total["Ch:2 - RH (%)"] / total.count,
                "Average CO2": total["CO2"] / total.count,
                "Average LSI (Red)": total["LSI (Red)"] / total.count,
            };
        }
        return averages;
    };

    useEffect(() => {
        if (excelData) {
            console.log(excelData)
            const formattedData = excelData?.slice(1)?.map(row => ({
                "Facility": row[0],
                "Room": row[1],
                "Date": row[2],
                "Time": row[3],
                "Ch:1 - Temperature (°C)": row[4],
                "Ch:2 - RH (%)": row[5],
                "Dew Point (°C)": row[6],
                "CO2": row[7],
                "LSI (Red)": row[8]
            }));
            const datanew = groupDataByDay(formattedData);
            console.log(datanew)
            const averages = calculateAverages(datanew);
            const labels = [];
            const temp = [];
            const humidity = [];
            const lsi = [];
            const co2 = [];
            const vpd = [];

            Object.keys(averages).map((item) => {
                const keys = Object.keys(averages[item]);
                labels.push(item);
                temp.push(averages[item][keys[0]]);
                humidity.push(averages[item][keys[1]]);
                vpd.push(averages[item][keys[1]] / averages[item][keys[0]]);
                co2.push(averages[item][keys[2]]);
                lsi.push(averages[item][keys[3]]);
            });

            const data1 = {
                labels: labels,
                datasets: [
                    {
                        hidden: false,
                        label: "Temperature",
                        data: temp,
                        borderColor: '#88CCEE',
                        backgroundColor: '#88CCEE',
                        yAxisID: 'y1',
                    },
                    {
                        hidden: false,
                        label: "Humidity",
                        data: humidity,
                        borderColor: '#44AA99',
                        backgroundColor: '#44AA99',
                        yAxisID: 'y1',
                    },
                    {
                        hidden: false,
                        label: 'CO2',
                        data: co2,
                        borderColor: '#332288',
                        backgroundColor: '#332288',
                        yAxisID: 'y',
                    },
                    {
                        hidden: false,
                        label: 'LSI (Red)',
                        data: lsi,
                        borderColor: '#999933',
                        backgroundColor: '#999933',
                        yAxisID: 'y',
                    },
                    {
                        hidden: true,
                        label: 'VPD',
                        data: vpd,
                        borderColor: '#DDCC77',
                        backgroundColor: '#DDCC77',
                        yAxisID: 'y',
                    },
                ],
            };
            setData2(data1);
        }
    }, [excelData]);


    const getDataSets = (diff, strain) => {
        const dataSets = [
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
        const data = JSON.parse(localStorage.getItem('room'))
        if (data) {
            setExcelData(data)
        } else {
            uploadHarvestFile()
        }

    }, [])

    const getDate = (newDate) => {
        const date = new Date(newDate);

        // Extract the month, day, and year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        // Format the date as MM/DD/YYYY
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate

    }
    const uploadHarvestFile = async () => {
        const formData = new FormData();
        console.log(toDate, fromDate)
        formData.append('facility', facility);
        formData.append('room', tag);
        formData.append('to_date', getDate(toDate));
        formData.append('from_date', getDate(fromDate));

        try {
            const res = await axios.post('https://cannatwin.com/api/getroomsdata/', formData);
            console.log(res)
            // alert('Harvest file uploaded successfully!');
        } catch (error) {
            console.error('Error uploading harvest file:', error);
            // alert('Error uploading harvest file');
        }
    };


    // const handleFileUpload = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onload = (evt) => {
    //         const binaryString = evt.target.result;
    //         const workbook = read(binaryString, { type: 'binary' });
    //         const sheetName = workbook.SheetNames[0];
    //         const sheet = workbook.Sheets[sheetName];
    //         const data = utils.sheet_to_json(sheet, { header: 1 });
    //         const formattedData = data?.slice(1)?.map(row => ({
    //             "Facility": row[0],
    //             "Room": row[1],
    //             "Date": row[2],
    //             "Time": row[3],
    //             "Ch:1 - Temperature (°C)": row[4],
    //             "Ch:2 - RH (%)": row[5],
    //             "Dew Point (°C)": row[6],
    //             "CO2": row[7],
    //             "LSI (Red)": row[8]
    //         }));
    //         setExcelData(formattedData);
    //     };

    //     reader.readAsBinaryString(file);
    // };

    // const inputFileRef = useRef(null);

    // const onBtnClick = () => {
    //     /*Collecting node-element and performing click*/
    //     inputFileRef.current.click();
    // }



    const toggleDataset = (index) => {
        const updatedDatasets = data2?.datasets?.map((dataset, i) => {
            if (i === index) {
                return {
                    ...dataset,
                    hidden: !dataset.hidden,
                };
            }
            return dataset;
        });

        // Find the indices of LSI, CO2, and VPD datasets
        const lsiIndex = updatedDatasets.findIndex(dataset => dataset.label === 'LSI (Red)');
        const co2Index = updatedDatasets.findIndex(dataset => dataset.label === 'CO2');
        const vpdIndex = updatedDatasets.findIndex(dataset => dataset.label === 'VPD');

        // Check if either LSI or CO2 is not hidden
        const lsiHidden = updatedDatasets[lsiIndex]?.hidden;
        const co2Hidden = updatedDatasets[co2Index]?.hidden;

        // Ensure VPD visibility is correctly toggled when LSI and CO2 are both hidden
        if (lsiHidden && co2Hidden && vpdIndex !== -1) {
            updatedDatasets[vpdIndex] = {
                ...updatedDatasets[vpdIndex],
                hidden: !updatedDatasets[vpdIndex].hidden, // Toggle VPD visibility
            };
        } else if (vpdIndex !== -1) {
            updatedDatasets[vpdIndex] = {
                ...updatedDatasets[vpdIndex],
                hidden: true, // Ensure VPD is hidden when either LSI or CO2 is visible
            };
        }

        setData2({ datasets: updatedDatasets, labels: data2.labels });
    };



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
                        {/* <div className="ms-2 mt-4">
                            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} ref={inputFileRef} />
                            <button className="btn btn-primary" style={{ alignContent: 'center', alignItems: 'center', height: '40px' }} onClick={onBtnClick}>
                                upload
                            </button>
                        </div> */}
                    </div>
                </div>
                {/* <div className={`col-12 gradient-color card shadow rounded m-1 p-1 border-0 me-3`} style={{ height: '450px' }}>
                    <Heading title="Overall Cultivation" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data} options={true} />
                </div> */}

                {excelData?.length > 0 ? <div className={`col-12 gradient-color card shadow rounded m-1 p-1 border-0 me-3`} style={{ height: 'fit-content' }}>
                    <Heading title="Overall Cultivation" data={[]} employees={[]} />
                    <hr />
                    <CustomLegend datasets={data2} toggleDataset={toggleDataset} />
                    <LineChart data={data2} options={true} />
                </div> : <div style={{
                    display: "flex", justifyContent: "center", fontWeight: 400, fontSize: '20px'
                }}>No Data Found</div>}
            </div>
        </div>
    )
}