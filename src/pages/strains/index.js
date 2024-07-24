import { useState } from "react";
import './index.css';
import DatePicker from 'react-datepicker';
import { Radar } from 'react-chartjs-2';
import { Chart, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

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
                        { strain: "Strain 1", data: [100, 50, 100, 50] }
                    ]
                },
                {
                    room: "Room 2", strains: [
                        { strain: "Strain 2", data: [80, 50, 90, 30] }
                    ]
                }
            ]
        },
        {
            facility: "Facility 2", rooms: [
                {
                    room: "Room 3", strains: [
                        { strain: "Strain 3", data: [60, 50, 90, 50] }
                    ]
                },
                {
                    room: "Room 4", strains: [
                        { strain: "Strain 4", data: [20, 50, 0, 50] }
                    ]
                }
            ]
        }
    ]
    const [data, setData] = useState(defaultData);

    const [plantTags, setPlanttags] = useState([
        { label: 'Room1', value: "Room1" },
        { label: 'Room2', value: "Room2" }
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

        // Filter by facility
        if (facility !== "All") {
            filtered = filtered.filter(d => d.facility === facility);
        }

        // Filter by room
        if (tag !== "All") {
            filtered = filtered.map(facilityData => ({
                ...facilityData,
                rooms: facilityData.rooms.filter(room => room.room === tag)
            }));
        }

        // Filter by strain
        if (strain !== "All") {
            filtered = filtered.map(facilityData => ({
                ...facilityData,
                rooms: facilityData.rooms.map(room => ({
                    ...room,
                    strains: room.strains.filter(strainObj => strainObj.strain === strain)
                }))
            }));
        }

        // Update the data with the filtered results
        setData(filtered);
    };


    const onSelect = (e) => {
        setTag(e.target.value);
    };

    const onSelectFacility = (e) => {
        const selectedFacility = e.target.value;
        const facilityRooms = data.find(d => d.facility === selectedFacility)?.rooms || [];

        setPlanttags(facilityRooms.map(room => ({ label: room.room, value: room.room })));
        setFacility(selectedFacility);
    };

    const getRadarData = (roomData) => {
        return {
            labels: ['PPFD', 'Temp', 'PPM', 'Hum'], // Adjust labels as needed
            datasets: [
                {
                    label: `${roomData.room}, ${facility}`,
                    data: normalizeData(roomData.strains[0].data), // Ensure data is normalized
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const normalizeData = (data) => {
        const maxValue = Math.max(...data);
        return data.map(value => (value / maxValue) * 100);
    };

    const radarOptions = () => {
        return {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100, // Ensure the radar chart scales up to 100
                    ticks: {
                        stepSize: 20, // Adjust step size for readability
                        callback: (value, index, values) => index === values.length - 1 ? value : '' // Show only the maximum label
                    }
                }
            }
        };
    };

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
                                        <Radar data={getRadarData(room)} options={radarOptions()} />
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
