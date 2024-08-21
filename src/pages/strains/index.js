import React, { useState, useEffect } from 'react';
import FilterBar from './components/filter';
import FacilitySection from './components/facilitySection';
import './index.css';

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
                                PPFD: { value: 1000, min: 0, max: 2000 },
                                Temp: { value: 50, min: 0, max: 100 },
                                PPM: { value: 1000, min: 0, max: 2000 },
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
                        {
                            strain: "Strain 3", data: {
                                PPFD: { value: 1200, min: 0, max: 2000 },
                                Temp: { value: 50, min: 0, max: 100 },
                                PPM: { value: 1300, min: 0, max: 2000 },
                                Hum: { value: 40, min: 0, max: 100 },
                            }
                        }
                    ]
                },
                {
                    room: "Room 2", strains: [
                        {
                            strain: "Strain 4", data: {
                                PPFD: { value: 400, min: 0, max: 2000 },
                                Temp: { value: 30, min: 0, max: 100 },
                                PPM: { value: 400, min: 0, max: 2000 },
                                Hum: { value: 20, min: 0, max: 100 },
                            }
                        }
                    ]
                }
            ]
        }
    ]
    const [data, setData] = useState(defaultData);

    const [plantTags, setPlantTags] = useState([
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

        // Filter by room
        if (tag !== "All") {
            filtered = filtered.map(facilityData => ({
                ...facilityData,
                rooms: facilityData.rooms.filter(room => room.room === tag)
            })).filter(facilityData => facilityData.rooms.length > 0);
        }

        // Filter by strain
        if (strain !== "All") {
            filtered = filtered.map(facilityData => ({
                ...facilityData,
                rooms: facilityData.rooms.map(room => ({
                    ...room,
                    strains: room.strains.filter(s => s.strain === strain)
                })).filter(room => room.strains.length > 0)
            })).filter(facilityData => facilityData.rooms.length > 0);
        }

        // Log filtered data
        console.log('Filtered data:', filtered);

        setData(filtered);
    };

    // Call handleFilter on component mount to ensure default data is shown
    useEffect(() => {
        handleFilter();
    }, []);

    const groupedByFacility = data.reduce((acc, facility) => {
        if (!acc[facility.facility]) {
            acc[facility.facility] = [];
        }
        acc[facility.facility].push(...facility.rooms);
        return acc;
    }, {});

    return (
        <div>
            <FilterBar
                facilities={facilities}
                plantTags={plantTags}
                strains={strains}
                facility={facility}
                tag={tag}
                strain={strain}
                toDate={toDate}
                fromDate={fromDate}
                setFacility={setFacility}
                setTag={setTag}
                setStrain={setStrain}
                setToDate={setToDate}
                setFromDate={setFromDate}
                handleFilter={handleFilter}
            />
            <FacilitySection groupedByFacility={groupedByFacility} />
        </div>
    );
};
