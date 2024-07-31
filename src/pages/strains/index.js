import { useState } from "react";
import './index.css';
import DatePicker from 'react-datepicker';
import { Radar } from 'react-chartjs-2';
import { Chart, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import FourAxisChart from "./fouraxis";

Chart.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const Photosynthesis = () => {
    const [toDate, setToDate] = useState(new Date("2023-01-01"));
    const [fromDate, setFromDate] = useState(new Date("2023-01-10"));
    const [tag, setTag] = useState("All");
    const [strain, setStrain] = useState("All");
    const [facility, setFacility] = useState('All');
    const defaultData = [
        {
            facility: "Facility 1", rooms: [
                {
                    room: "Room 1", strains: [
                        {
                            strain: "Strain 1", data: {
                                PPFD: { value: 2000, min: 0, max: 2000 },
                                Temp: { value: 50, min: 0, max: 100 },
                                PPM: { value: 2000, min: 0, max: 2000 },
                                Hum: { value: 50, min: 0, max: 100 },
                            }
                        }
                    ]
                },
                {
                    room: "Room 2", strains: [
                        {
                            strain: "Strain 2", data: {
                                PPFD: { value: 1500, min: 0, max: 2000 },
                                Temp: { value: 50, min: 0, max: 100 },
                                PPM: { value: 1300, min: 0, max: 2000 },
                                Hum: { value: 40, min: 0, max: 100 },
                            }
                        }
                    ]
                }
            ]
        },
        {
            facility: "Facility 2", rooms: [
                {
                    room: "Room 1", strains: [
                        { strain: "Strain 3", data: {
                            PPFD: { value: 1800, min: 0, max: 2000 },
                            Temp: { value: 80, min: 0, max: 100 },
                            PPM: { value: 2000, min: 0, max: 2000 },
                            Hum: { value: 60, min: 0, max: 100 },
                        } }
                    ]
                },
                {
                    room: "Room 2", strains: [
                        { strain: "Strain 4", data: {
                            PPFD: { value: 2000, min: 0, max: 2000 },
                            Temp: { value: 50, min: 0, max: 100 },
                            PPM: { value: 2000, min: 0, max: 2000 },
                            Hum: { value: 50, min: 0, max: 100 },
                        } }
                    ]
                }
            ]
        }
    ]
    const [data, setData] = useState(defaultData);

    const [plantTags, setPlanttags] = useState([
        { label: 'Room 1', value: "Room 1" },
        { label: 'Room 2', value: "Room 2" }
    ]);

    const facilities = [
        { label: 'Facility 1', value: "Facility 1" },
        { label: 'Facility 2', value: "Facility 2" },
        { label: 'Facility 3', value: "Facility 3" }
    ];

    const strains = [
        { label: 'Strain 1', value: "Strain 1" },
        { label: 'Strain 2', value: "Strain 2" },
        { label: 'Strain 3', value: "Strain 3" }
    ];

    const handleFilter = () => {
        let filtered = defaultData;
    
        // Log initial state
        console.log('Initial data:', filtered);
    
        // Filter by facility
        if (facility !== "All") {
            filtered = filtered.filter(d => d.facility === facility);
        }
    
        // Log after facility filter
        console.log('After facility filter:', filtered);
    
        // Filter by room
        if (tag !== "All") {
            filtered = filtered.map(facilityData => ({
                ...facilityData,
                rooms: facilityData.rooms.filter(room => room.room === tag)
            })).filter(facilityData => facilityData.rooms.length > 0); // Remove facilities with no matching rooms
        }
    
        // Log after room filter
        console.log('After room filter:', filtered);
    
        // Filter by strain
        if (strain !== "All") {
            filtered = filtered.map(facilityData => ({
                ...facilityData,
                rooms: facilityData.rooms.map(room => ({
                    ...room,
                    strains: room.strains.filter(strainObj => strainObj.strain === strain)
                })).filter(room => room.strains.length > 0) // Remove rooms with no matching strains
            })).filter(facilityData => facilityData.rooms.length > 0); // Remove facilities with no matching rooms
        }
    
        // Log after strain filter
        console.log('After strain filter:', filtered);
    
        // Update the data with the filtered results
        setData(filtered);
    };
    
    

    console.log(data)


    const onSelect = (e) => {
        setTag(e.target.value);
    };

    const onSelectFacility = (e) => {
        const selectedFacility = e.target.value;
        // const facilityRooms = data.find(d => d.facility === selectedFacility)?.rooms || [];

        // setPlanttags(facilityRooms.map(room => ({ label: room.room, value: room.room })));
        setFacility(selectedFacility);
    };
    const normalize = (value, min, max) => ((value - min) / (max - min)) * 100;

    const getRadarData = (roomData) => {
        console.log(roomData?.strains[0])
        return {
            labels: ['PPFD', 'Temp', 'PPM', 'Hum'],
            datasets: [
                {
                    label: 'Room 1, All',
                    data: [
                        normalize(roomData?.strains[0]?.data?.PPFD.value, roomData?.strains[0]?.data?.PPFD.min, roomData?.strains[0]?.data?.PPFD.max),
                        normalize(roomData?.strains[0]?.data?.Temp.value, roomData?.strains[0]?.data?.Temp.min, roomData?.strains[0]?.data?.Temp.max),
                        normalize(roomData?.strains[0]?.data?.PPM.value, roomData?.strains[0]?.data?.PPM.min, roomData?.strains[0]?.data?.PPM.max),
                        normalize(roomData?.strains[0]?.data?.Hum.value, roomData?.strains[0]?.data?.Hum.min, roomData?.strains[0]?.data?.Hum.max),
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                    pointStyle: 'rectRot', // Diamond shape
                },
            ],
        };
    };


    const getOptions = (originalData) => {
        const options = {
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                            // Custom tick labels for specific ranges
                            if (value === 0) return '0';
                            if (value === 25) return '500';
                            if (value === 50) return '1000';
                            if (value === 75) return '1500';
                            if (value === 100) return '2000';
                            return value;
                        },
                        stepSize: 25, // Adjust the step size to match your intervals
                    },
                    pointLabels: {
                        fontSize: 14,
                        callback: function (value) {
                            const axisMin = originalData[value].min;
                            const axisMax = originalData[value].max;
                            return `${value} (${axisMin}-${axisMax})`;
                        },
                    },
                    angleLines: {
                        display: true,
                    },
                    grid: {
                        display: true,
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const datasetLabel = context.dataset.label || '';
                            const value = context.raw;
                            const originalValue = Object.values(originalData)[context.dataIndex].value;
                            return `${datasetLabel}: ${originalValue} (${value.toFixed(2)})`;
                        },
                    },
                },
            },
        };
        return options
    }



    const groupedByFacility = data.reduce((acc, facilityData) => {
        acc[facilityData.facility] = facilityData.rooms;
        return acc;
    }, {});

    return (
        <div className="p-3">
            <div className="d-flex mb-2" style={{ alignItems: 'center' }}>
                <label>
                    <span className="labelHeading" style={{ fontWeight: 500 }}>Facilities:</span>
                    <select className="select-css2" style={{ minWidth: '200px' }} onChange={onSelectFacility} value={facility}>
                        <option>All</option>
                        {facilities.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span className="labelHeading" style={{ fontWeight: 500 }}>Room:</span>
                    <select className="select-css2" style={{ minWidth: '200px' }} onChange={onSelect} value={tag}>
                        <option value="ntg">All</option>
                        {plantTags.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span className="labelHeading" style={{ fontWeight: 500 }}>Strain:</span>
                    <select className="select-css2" style={{ minWidth: '200px' }} onChange={(e) => setStrain(e.target.value)} value={strain}>
                        <option>All</option>
                        {strains.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="labelHeading">To:</span>
                    <DatePicker selected={toDate} onChange={date => setToDate(date)} className="select-css2" />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="labelHeading">From:</span>
                    <DatePicker selected={fromDate} onChange={date => setFromDate(date)} className="select-css2" />
                </label>
                <div className="ms-2 mt-4">
                    <button className="btn btn-primary" onClick={handleFilter}>Submit</button>
                </div>
            </div>
            <div className="facility-section">
                {Object.entries(groupedByFacility).map(([facilityName, rooms]) => (
                    <div key={facilityName} className="facility-box">
                        <h3>{facilityName}</h3>
                        <div className="rooms-section">
                            {rooms.map(room => (
                                <div key={room.room} className="room-box">
                                    <h4>{room.room}</h4>
                                    <div className="radar-chart-container" style={{ width: '400px', height: '400px' }}>
                                        <Radar data={getRadarData(room)} options={getOptions(room?.strains[0]?.data)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
