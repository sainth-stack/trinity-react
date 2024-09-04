import "./index.css";

import React, { useEffect, useRef, useState } from "react";
import GroupedBarChart from "./barChart";
import { InputData } from "./InputData";
import axios from "axios";
import PrepLoader from "../../components/prep-loader/loader";

const generateRandomData = (length, value) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
};
const generateConstantData = (length, value) => {
  return Array.from({ length }, () => value);
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export const NewHarvest = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [harvestData, setHarvestData] = useState([]);
  const [graphData, setGraphData] = useState({
    labels: [],
  });
  const [loadingR, setLoadingR] = useState(false);
  const [loadingH, setLoadingH] = useState(false);
  const [selectedValue, setSelectedValue] = useState("sep");
  const [finalHB, setFinalHB] = useState([]);
  const [avg, setAvg] = useState({});

  const getRoomsData = async () => {
    console.log("get rooms api called");
    try {
      setLoadingR(true);
      const response = await axios.get(
        `https://cannatwin.com/api/getroomsdata/?email=${localStorage.getItem('email')}`
      );
      setLoadingR(false);
      return response?.data[0];
    } catch (error) {
      setLoadingR(false);
      console.error("Error uploading room file:", error);
    }
  };
  const getHarvestData = async () => {
    try {
      setLoadingH(true);
      const response = await axios.get(
        `https://cannatwin.com/api/getharvestdata/?email=${localStorage.getItem('email')}`
      );
      setLoadingH(false);
      return response?.data[0];
    } catch (error) {
      setLoadingH(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const room = await getRoomsData();
      const formattedRoomData = room?.slice(1)?.map((row) => ({
        Facility: row["Facility"],
        Room: row["Room"],
        Date: row["Date"],
        Time: row["Time"],
        "Ch:1 - Temperature (°C)": row["Ch:1 - Temperature (°C)"],
        "Ch:2 - RH (%)": row["Ch:2 - RH (%)"],
        "Dew Point (°C)": row["Dew Point (°C)"],
        CO2: row["CO2"],
        "LSI (Red)": row["LSI (Red)"],
      }));
      setRoomData(formattedRoomData);

      const harvest = await getHarvestData();

      const data = harvest?.map((item, index) => {
        return {
          ...item,
          hb: item["Harvest Batch"],
          id: index + 1,
        };
      });
      setFinalHB(data);
      setAvg(calculateAverages(roomData));
      setHarvestData(harvest);
    };
    fetchData();
  }, []);

  const calculateAverages = (data) => {
    const total = data?.reduce(
      (acc, curr) => {
        acc.temperature += parseFloat(curr["Ch:1 - Temperature (°C)"]);
        acc.rh += parseFloat(curr["Ch:2 - RH (%)"]);
        acc.dewPoint += parseFloat(curr["Dew Point (°C)"]);
        acc.co2 += curr.CO2;
        acc.lsi += curr.LSI;
        return acc;
      },
      { temperature: 0, rh: 0, dewPoint: 0, co2: 0, lsi: 0 }
    );

    const length = data?.length;

    return {
      avgTemp: parseFloat(total?.temperature / length)?.toFixed(2),
      avgHum: parseFloat(total?.rh / length)?.toFixed(2),
      avgDew: parseFloat(total?.dewPoint / length)?.toFixed(2),
      avgCo2: parseFloat(total?.co2 / length)?.toFixed(2),
      avgLsi: parseFloat(total?.lsi / length)?.toFixed(2),
    };
  };

  const calculateAverages2 = (groupedData) => {
    const averages = {};
    for (const day in groupedData) {
      const dayData = groupedData[day];
      const total = {
        "Ch:1 - Temperature (°C)": 0,
        "Ch:2 - RH (%)": 0,
        CO2: 0,
        LSI: 0,
        count: 0,
      };

      dayData.forEach((obj) => {
        total["Ch:1 - Temperature (°C)"] += parseFloat(
          obj["Ch:1 - Temperature (°C)"]
        );
        total["Ch:2 - RH (%)"] += parseFloat(obj["Ch:2 - RH (%)"]);
        total["CO2"] += parseFloat(obj["CO2"]);
        total["LSI"] += parseFloat(obj["LSI"]);
        total.count++;
      });

      averages[day] = {
        "Average Temperature (°C)":
          total["Ch:1 - Temperature (°C)"] / total.count,
        "Average RH (%)": total["Ch:2 - RH (%)"] / total.count,
        "Average CO2": total["CO2"] / total.count,
        "Average LSI": total["LSI"] / total.count,
      };
    }
    return averages;
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const parseDateTime = (date, time) => {
    try {
      // Assuming the date is in MM/DD/YYYY format and time is in HH.mm format
      const [month, day, year] = date.split("/");
      const [hours, minutes] = time.split(".").map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    } catch (error) {
      console.error("Error parsing date and time:", error);
      return null;
    }
  };

  const groupDataByDay = (data) => {
    const groupedData = {};
    data.forEach((obj) => {
      const date = new Date(obj["Date"]);
      const day = date.toISOString().split("T")[0]; // Extracting YYYY-MM-DD
      if (!groupedData[day]) {
        groupedData[day] = [];
      }
      groupedData[day].push(obj);
    });
    return groupedData;
  };

  const handleCheckboxChange = (batch) => {
    const isChecked =
      selectedBatches.filter((item) => item.hb === batch.hb).length > 0;
    let updData = isChecked
      ? selectedBatches.filter((selectedBatch) => selectedBatch.hb !== batch.hb)
      : [...selectedBatches, batch];
    const finData = updData.sort((a, b) => a.id - b.id);
    updData = finData[0] !== undefined ? finData : [];
    setSelectedBatches(updData);
    setBatches((prevBatches) => [...updData]);
    if (selectedValue == "sep") {
      const finData = [];
      const labels = [];
      const datanew = groupDataByDay(roomData);
      const averages = calculateAverages2(datanew);
      const temp = [];
      const humidity = [];
      const lsi = [];
      const co2 = [];
      // const vpd=[]
      Object.keys(averages).map((item) => {
        const keys = Object.keys(averages[item]);
        labels.push(item);
        temp.push(averages[item][keys[0]]);
        humidity.push(averages[item][keys[1]]);
        co2.push(averages[item][keys[2]]);
        lsi.push(averages[item][keys[3]]);
      });
      updData?.map((item) => {
        if (roomData) {
          finData.push(
            ...[
              {
                label: `${item?.hb} - ecin`,
                data: generateRandomData(17),
                borderColor: getRandomColor(),
                backgroundColor: getRandomColor(),
                yAxisID: "y",
                fill: false,
              },
              {
                label: `${item?.hb} - ecout`,
                data: generateRandomData(17),
                borderColor: getRandomColor(),
                backgroundColor: getRandomColor(),
                yAxisID: "y",
                fill: false,
              },
              {
                label: `${item?.hb} - temp`,
                data: temp,
                borderColor: "#88CCEE",
                backgroundColor: "#88CCEE",
                yAxisID: "y",
                fill: false,
              },
              {
                label: `${item?.hb} - hum`,
                data: humidity,
                borderColor: "#44AA99",
                backgroundColor: "#44AA99",
                yAxisID: "y",
                fill: false,
              },
              {
                label: `${item?.hb} - co2`,
                data: co2,
                borderColor: "#332288",
                backgroundColor: "#332288",
                yAxisID: "y1",
                fill: false,
              },
              {
                label: `${item?.hb} - lsi`,
                data: lsi,
                borderColor: "#999933",
                backgroundColor: "#999933",
                yAxisID: "y1",
                fill: false,
              },
              {
                label: `${item?.hb} - g/sqft`,
                data: generateConstantData(17, item["g/sqft."]),
                borderColor: getRandomColor(),
                backgroundColor: getRandomColor(),
                yAxisID: "y1",
                fill: false,
              },
            ]
          );
        }
        // finData.push(...[
        //     { label: `${item?.hb} - ecin`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
        //     { label: `${item?.hb} - ecout`, data: generateRandomData(70), borderColor: getRandomColor(), fill: false },
        //     { label: `${item?.hb} - g/sqft`, data: item['g/sqft'], borderColor: getRandomColor(), fill: false },
        //     { label: `${item?.hb} - temp`, data: generateRandomData(70, avg?.avgTemp), borderColor: getRandomColor(), fill: false },
        //     { label: `${item?.hb} - humidity`, data: generateRandomData(70, avg?.avgHum), borderColor: getRandomColor(), fill: false },
        //     { label: `${item?.hb} - light intensity`, data: generateRandomData(70, avg?.avgLsi), borderColor: getRandomColor(), fill: false },
        //     { label: `${item?.hb} - co2`, data: generateRandomData(70, avg?.avgCo2), borderColor: getRandomColor(), fill: false },
        //     // { label: `${item?.hb} - g/sqft(avg)`, data: generateConstantData(70,66), borderColor: 'red', borderDash: [4, 2],pointRadius: 0,pointStyle: 'line'}
        // ],)
      });
      setGraphData((prev) => {
        return {
          labels: [...labels],
          datasets: [...finData],
        };
      });
    } else {
      const finData = [];
      const labels = [];
      const datanew = groupDataByDay(roomData);
      const averages = calculateAverages2(datanew);
      const temp = [];
      const humidity = [];
      const lsi = [];
      const co2 = [];
      // const vpd=[]
      Object.keys(averages).map((item) => {
        const keys = Object.keys(averages[item]);
        labels.push(item);
        temp.push(averages[item][keys[0]]);
        humidity.push(averages[item][keys[1]]);
        co2.push(averages[item][keys[2]]);
        lsi.push(averages[item][keys[3]]);
      });
      if (roomData) {
        finData.push(
          ...[
            {
              label: `ecin`,
              data: generateRandomData(17),
              borderColor: getRandomColor(),
              backgroundColor: getRandomColor(),
              yAxisID: "y",
              fill: false,
            },
            {
              label: `ecout`,
              data: generateRandomData(17),
              borderColor: getRandomColor(),
              backgroundColor: getRandomColor(),
              yAxisID: "y",
              fill: false,
            },
            {
              label: `temp`,
              data: temp,
              borderColor: "#88CCEE",
              backgroundColor: "#88CCEE",
              yAxisID: "y",
              fill: false,
            },
            {
              label: `hum`,
              data: humidity,
              borderColor: "#44AA99",
              backgroundColor: "#44AA99",
              yAxisID: "y",
              fill: false,
            },
            {
              label: `co2`,
              data: co2,
              borderColor: "#332288",
              backgroundColor: "#332288",
              yAxisID: "y1",
              fill: false,
            },
            {
              label: `lsi`,
              data: lsi,
              borderColor: "#999933",
              backgroundColor: "#999933",
              yAxisID: "y1",
              fill: false,
            },
            {
              label: `g/sqft`,
              data: generateConstantData(17, 80),
              borderColor: getRandomColor(),
              backgroundColor: getRandomColor(),
              yAxisID: "y1",
              fill: false,
            },
          ]
        );
      }
      setGraphData((prev) => {
        return {
          labels: [...labels],
          datasets: [...finData],
        };
      });
    }
  };

  useEffect(() => {
    if (batches.length > 0) {
      handleCheckboxChange({ hb: null });
    }
  }, [selectedValue]);
  return (
    <div>
      {(harvestData?.length > 0 && roomData?.length > 0) && (
        <div className="p-2 mt-1">
          <div className="row">
            <div className="col-md-3">
              <h2 className="heading1">Harvest Batches</h2>
              <ul
                className="list-group overflow-auto"
                style={{ maxHeight: "300px" }}
              >
                {finalHB?.map((batch) => (
                  <li key={batch.id} className="list-group-item">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`batch-${batch.hb}`}
                        checked={
                          selectedBatches.filter((item) => item.hb === batch.hb)
                            .length > 0
                        }
                        onChange={() => handleCheckboxChange(batch)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`batch-${batch.id}`}
                      >
                        {batch.hb}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-9">
              <h2 className="heading1">Plants</h2>
              <div
                className="table-container"
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  display: "block",
                }}
              >
                <table className="table">
                  <thead className="sticky-top">
                    <tr>
                      <th
                        style={{ minWidth: "200px", border: "1px solid black" }}
                      >
                        Harvest Batch
                      </th>
                      <th colSpan="2" style={{ border: "1px solid black" }}>
                        Bud
                      </th>
                      <th colSpan="2" style={{ border: "1px solid black" }}>
                        Popcorn
                      </th>
                      <th colSpan="2" style={{ border: "1px solid black" }}>
                        Shake/Trim
                      </th>
                      <th style={{ border: "1px solid black" }}>
                        Total Weight (g)
                      </th>
                      <th style={{ border: "1px solid black" }}>g/plant</th>
                      <th style={{ border: "1px solid black" }}>g/Sqft</th>
                    </tr>
                    <tr>
                      <th style={{ border: "1px solid black" }}></th>
                      <th style={{ border: "1px solid black" }}>g</th>
                      <th style={{ border: "1px solid black" }}>%</th>
                      <th style={{ border: "1px solid black" }}>g</th>
                      <th style={{ border: "1px solid black" }}>%</th>
                      <th style={{ border: "1px solid black" }}>g</th>
                      <th style={{ border: "1px solid black" }}>%</th>
                      <th style={{ border: "1px solid black" }}></th>
                      <th style={{ border: "1px solid black" }}></th>
                      <th style={{ border: "1px solid black" }}></th>
                    </tr>
                  </thead>
                  <tbody
                    className="overflow-auto"
                    style={{ maxHeight: "300px" }}
                  >
                    {batches.map((batch) => {
                      const totalWeight =
                        parseFloat(batch["Wet Weight"]) -
                        parseFloat(batch["Waste"]);
                      const budWeight = parseFloat(batch["Bud (g)"]);
                      const popcornWeight = parseFloat(batch["Popcorn (g)"]);
                      const shakeTrimWeight = parseFloat(
                        batch["Shake/Trim (g)"]
                      );
                      const budPercentage = parseFloat(batch["Bud %"]) * 100;
                      const popcornPercentage =
                        parseFloat(batch["Popcorn %"]) * 100;
                      const shakeTrimPercentage =
                        parseFloat(batch["Shake/Trim %"]) * 100;

                      return (
                        <tr key={batch.hb}>
                          <td style={{ border: "1px solid black" }}>
                            {batch.hb}
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {budWeight.toFixed(2)}
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {budPercentage.toFixed(0)}%
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {popcornWeight.toFixed(2)}
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {popcornPercentage.toFixed(0)}%
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {shakeTrimWeight.toFixed(2)}
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {shakeTrimPercentage.toFixed(0)}%
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {totalWeight.toFixed(2)}
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {parseFloat(batch["g/plant"]).toFixed(2)}
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {parseFloat(batch["g/sqft."]).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-2 mt-2">
              <h2 className="heading1">Inputs</h2>
              {batches?.length > 0 && (
                <InputData
                  {...{ batches, handleRadioChange, selectedValue, graphData }}
                />
              )}
            </div>
          </div>
          <div className="row mt-3 mb-2">
            <div className="col-md-12 mb-2">
              {batches.length > 0 && (
                <>
                  <h2 className="heading1">BPT Detail</h2>
                  <div
                    className="card"
                    style={{
                      minWidth: "800px",
                      overflowX: "auto",
                      height: "fit-content",
                    }}
                  >
                    <GroupedBarChart selBatches={selectedBatches} height={80} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {!loadingH && !loadingR ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: 400,
            fontSize: "20px",
          }}
        >
          {!(harvestData?.length === 0 && roomData?.length === 0) &&
            "Upload Rooms and Harvest data"}
        </div>
      ) : <PrepLoader />}
    </div>
  );
};
