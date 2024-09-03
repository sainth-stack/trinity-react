import React, { useState, useEffect } from 'react';
import FilterBar from './components/filter';
import FacilitySection from './components/facilitySection';
import './index.css';
import axios from 'axios';
import PrepLoader from '../../components/prep-loader/loader';

export const Photosynthesis = () => {
    const [toDate, setToDate] = useState(new Date("2023-01-01"));
    const [fromDate, setFromDate] = useState(new Date("2023-01-10"));
    const [tag, setTag] = useState("All");
    const [strain, setStrain] = useState("All");
    const [facility, setFacility] = useState('All');
    const [loading, setLoading] = useState(false)
    const [finData, setFinData] = useState([])


    const transformData = (data) => {
        // Group by facility and room, then structure the data
        const summary = data.reduce((acc, item) => {
            const facility = item.Facility;
            const room = item.Room;

            if (!acc[facility]) {
                acc[facility] = { rooms: {} };
            }

            if (!acc[facility].rooms[room]) {
                acc[facility].rooms[room] = {
                    data: {
                        PPFD: { value: 0, min: 0, max: 2000 },
                        Temp: { value: 0, min: 0, max: 100 },
                        PPM: { value: 0, min: 0, max: 2000 },
                        Hum: { value: 0, min: 0, max: 100 }
                    }
                };
            }

            // Accumulate values
            acc[facility].rooms[room].data.PPFD.value += item.CO2;
            acc[facility].rooms[room].data.Temp.value += item["Ch:1 - Temperature   (°C)"];
            acc[facility].rooms[room].data.PPM.value += item["LSI (Red)"];
            acc[facility].rooms[room].data.Hum.value += item["Ch:2 - RH   (%)"];

            return acc;
        }, {});

        // Convert the summary into the desired format
        return Object.keys(summary).map(facility => ({
            facility,
            rooms: Object.keys(summary[facility].rooms).map(room => ({
                room,
                data: {
                    PPFD: {
                        value: summary[facility].rooms[room].data.PPFD.value / data.length, // Example average calculation
                        min: 0,
                        max: 2000
                    },
                    Temp: {
                        value: summary[facility].rooms[room].data.Temp.value / data.length, // Example average calculation
                        min: 0,
                        max: 100
                    },
                    PPM: {
                        value: summary[facility].rooms[room].data.PPM.value / data.length, // Example average calculation
                        min: 0,
                        max: 2000
                    },
                    Hum: {
                        value: summary[facility].rooms[room].data.Hum.value / data.length, // Example average calculation
                        min: 0,
                        max: 100
                    }
                }
            }))
        }));
    };


    const [data, setData] = useState([]);

    const checkApi = async () => {
        try {
            setLoading(true)
            const response = await axios.get(
                `https://cannatwin.com/api/getroomsdata/?email=kingrevi@gmail.com`,
                fromDate,
                toDate,
            );
            setLoading(false)
            console.log(response.data[0])
            setFinData(response?.data[0])
            const transformedData = transformData(response?.data[0]);
            setData(transformedData)
            return response?.data[0]
        } catch (error) {
            setLoading(false)
            console.error("Error uploading room file:", error);
            alert("Error uploading room file", error);
        }
    };

    useEffect(() => {
        checkApi();
    }, []);

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
        let filtered = data;

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
            {loading ? <PrepLoader /> : <div>
                {data?.length > 0 ? <FacilitySection groupedByFacility={groupedByFacility} /> : "No Data Found"}
            </div>}
        </div>
    );
};
