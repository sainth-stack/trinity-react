import './index.css'

import React, { useEffect, useState } from 'react';
import { LineChart } from "../Twin/LineCHart";
import GroupedBarChart from './barChart'
import { harvestdata } from './data';
const generateRandomData = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
};
const generateConstantData = (length, value) => {
    return Array.from({ length }, () => value);
};

const data = {
    labels: Array.from({ length: 70 }, (_, i) => `${i + 1}`),
    datasets: []
};
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export const NewHarvest = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatches, setSelectedBatches] = useState([]);
    const [graphData, setGraphData] = useState([])
    const [selectedValue, setSelectedValue] = useState('sep');
    const [finalHB, setFinalHB] = useState([])

    useEffect(() => {
        const data = harvestdata.map((item, index) => {
            return {
                ...item,
                hb: item["Harvest Batch"],
                id: index + 1
            }
        })
        setFinalHB(data)
    }, [])

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };
    // const allBatches = [
    //     { id: 1, hb: 'HB1', b: '13%', p: '23%', t: '25%', yield: 2000, gPlant: 130, gSqft: 250 },
    //     { id: 2, hb: 'HB2', b: '13%', p: '23%', t: '25%', yield: 2200, gPlant: 200, gSqft: 220 },
    //     { id: 3, hb: 'HB3', b: '13%', p: '23%', t: '25%', yield: 1000, gPlant: 350, gSqft: 300 },
    //     { id: 4, hb: 'HB4', b: '13%', p: '23%', t: '25%', yield: 3000, gPlant: 220, gSqft: 400 },
    //     // { hb: 'HB5', bpt: '9%', yield: 4200, gPlant: 250, gSwift: 500, sqft: 18 },
    //     // { hb: 'HB6', bpt: '13%', yield: 2000, gPlant: 130, gSwift: 250, sqft: 7 },
    //     // { hb: 'HB7', bpt: '23%', yield: 2200, gPlant: 200, gSwift: 220, sqft: 9 },
    //     // { hb: 'HB8', bpt: '43%', yield: 1000, gPlant: 350, gSwift: 300, sqft: 12 },
    //     // { hb: 'HB9', bpt: '30%', yield: 3000, gPlant: 220, gSwift: 400, sqft: 17 },
    //     // { hb: 'HB10', bpt: '9%', yield: 4200, gPlant: 250, gSwift: 500, sqft: 18 },
    // ];
    const handleCheckboxChange = (batch) => {
        const isChecked = selectedBatches.filter((item) => item.hb === batch.hb).length > 0;
        let updData = isChecked
            ? selectedBatches.filter((selectedBatch) => selectedBatch.hb !== batch.hb)
            : [...selectedBatches, batch]
        const finData = updData.sort((a, b) => a.id - b.id)
        updData = finData[0] !== undefined ? finData : [];
        setSelectedBatches(updData);
        setBatches((prevBatches) => [...updData]);
        if (selectedValue == 'sep') {
            const finData = []
            updData?.map((item) => {
                finData.push(...[
                    { label: `${item?.hb} - ecin`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                    { label: `${item?.hb} - ecout`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                    { label: `${item?.hb} - g/sqft`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                    { label: `${item?.hb} - temp`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                    { label: `${item?.hb} - humidity`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                    { label: `${item?.hb} - light intensity`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                    { label: `${item?.hb} - co2`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                    // { label: `${item?.hb} - g/sqft(avg)`, data: generateConstantData(70,66), borderColor: 'red', borderDash: [4, 2],pointRadius: 0,pointStyle: 'line'}
                ],)
            })
            setGraphData({ ...data, datasets: finData })
        } else {
            const finData = []
            finData.push(...[
                { label: `ecin`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                { label: `ecout`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                { label: ` g/sqft`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                { label: `temp`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                { label: `humidity`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                { label: `light intensity`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                { label: `co2`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
                { label: `avg-g/sqft`, data: generateConstantData(70, 66), borderColor: 'red', borderDash: [4, 2], pointRadius: 0, pointStyle: 'line' }
            ],)
            setGraphData({ ...data, datasets: finData })
        }
    };
    useEffect(() => {
        if (batches.length > 0) {
            handleCheckboxChange({ hb: null })
        }
    }, [selectedValue])

    const optionsl = {
        // responsive: true,
        maintainAspectRatio: false, // Allow horizontal scrolling
        plugins: {
            legend: {
                position: 'top',
                align: selectedValue == 'sep' ? 'start' : 'start',
                display: true,
                labels: {
                    boxWidth: 30,
                    padding: 20, // Adjust the padding between legend items
                },
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
                    text: '',
                    color: 'black',
                    fontWeight: 700,
                    padding: 5
                },
                grid: {
                    display: false
                }
            }
        },

    };
    return (
        <div className="p-2 mt-4">
            <div className="row">
                <div className="col-md-3" >
                    <h2 className='heading1'>Harvest Batches</h2>
                    <ul className="list-group overflow-auto" style={{ maxHeight: '300px' }}>
                        {finalHB.map((batch) => (
                            <li key={batch.id} className="list-group-item">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`batch-${batch.hb}`}
                                        checked={selectedBatches.filter((item) => item.hb === batch.hb).length > 0}
                                        onChange={() => handleCheckboxChange(batch)}
                                    />
                                    <label className="form-check-label" htmlFor={`batch-${batch.id}`}>
                                        {batch.hb}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-9">
                    <h2 className='heading1'>Plants</h2>
                    <div className="table-container" style={{ maxHeight: '300px', overflowY: 'auto', display: 'block' }}>
                        <table className="table">
                            <thead className="sticky-top" >
                                <tr>
                                    <th>HB</th>
                                    <th>Bud</th>
                                    <th>Popcorn</th>
                                    <th>Shake/Trim</th>
                                    <th>Yield</th>
                                    <th>g/plant</th>
                                    <th>g/Sqft</th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto" style={{ maxHeight: '300px' }}>
                                {batches.map((batch) => (
                                    <tr key={batch.hb}>
                                        <td>{batch.hb}</td>
                                        <td>{batch.b}</td>
                                        <td>{batch.p}</td>
                                        <td>{batch.t}</td>
                                        <td>{batch.yield}</td>
                                        <td>{batch.gPlant}</td>
                                        <td>{batch.gSqft}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mb-2 mt-2" >
                    <h2 className='heading1'>Inputs</h2>
                    {batches.length > 0 && <div className='card' style={{ width: '100%', overflowX: 'auto' }}>
                        <div class="radio-container">
                            <div class="radio-option">
                                <input type="radio" id="html" name="type" value="sep" checked={selectedValue === 'sep'}
                                    onChange={handleRadioChange} />
                                <label for="html">Separated</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" id="css" name="type" value="com" checked={selectedValue === 'com'}
                                    onChange={handleRadioChange} />
                                <label for="css">Combined</label>
                            </div>
                        </div>
                        <div style={{ minWidth: `${70 * 50}px`, minHeight: '50vh' /* Set the desired minimum width based on the number of days */ }}>
                            <LineChart data={graphData} height={50} options={{
                                ...optionsl
                            }} />
                        </div>
                    </div>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mb-2" >

                    {batches.length > 0 && <>
                        <h2 className='heading1'>BPT Detail</h2>
                        <div className='card' style={{ width: '100%', overflowX: 'auto', maxHeight: '50vh' }}>
                            <GroupedBarChart selBatches={selectedBatches} />
                        </div>
                    </>}
                </div>
            </div>
        </div>
    );
};
