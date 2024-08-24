import { LineChart } from "./LineCHart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { addDays } from "date-fns";
import moment from "moment";
import { read, utils } from "xlsx";
import { data50 } from "./data";
import { CustomLegend } from "../../components/CustomLegend";
import { FormatData } from "./format";
import axios from "axios";
import { baseURL } from "../../environments/urls";
export const Twin = () => {
  const labels1 = [
    "2023-10-01",
    "2023-10-02",
    "2023-10-03",
    "2023-10-04",
    "2023-10-05",
  ];
  const data1 = {
    labels: labels1,
    datasets: [
      {
        label: "reading1",
        data: [60, 68, 69, 65, 63, 66, 64],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(108, 97, 91, 0.8)",
      },
      {
        label: "reading2",
        data: [67, 69, 66, 69, 68, 70, 71],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "reading3",
        data: [67, 69, 66, 69, 68, 65, 64],
        borderColor: "rgba(53, 162, 235, 0.5)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "reading4",
        data: [69, 70, 66, 69, 70, 73, 70],
        borderColor: "rgba(155, 88, 53, 0.8)",
        backgroundColor: "rgba(155, 88, 53, 0.8)",
      },
      {
        label: "reading5",
        data: [69, 70, 68, 64, 69, 66, 65],
        borderColor: "rgba(61, 155, 53, 0.8)",
        backgroundColor: "rgba(61, 155, 53, 0.8)",
      },
      {
        label: "average",
        data: [65, 65, 65, 65, 65, 65, 65],
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgb(145, 56, 49)",
      },
    ],
  };
  const [data, setData] = useState(data1);
  const [data2, setData2] = useState(data1);
  const [excelData, setExcelData] = useState(data50);
  const [toDate, setToDate] = useState(new Date("2024-01-31"));
  const [fromDate, setFromDate] = useState(new Date("2024-02-27"));
  const [tag, setTag] = useState("Room1");
  const [facility, setFacility] = useState("Facility 1");

  /* get rooms */

  const checkApi = async () => {
    console.log("get rooms api called");
    try {
      /*    const response = await axios.post(` ${baseURL}getroomsdata/`); */

      const response = await axios.post(
        `https://cannatwin.com/api/getroomsdata/`,
        fromDate,
        toDate
      );

      alert("Room file uploaded successfully!");
      console.log("Response rooms:", response);
    } catch (error) {
      console.error("Error uploading room file:", error);
      alert("Error uploading room file", error);
    }
  };

  /*   useEffect(() => {
    getRooms();
  }, []);
 */

  function Heading(props) {
    return (
      <div className="d-flex justify-content-between align-items-center p-2">
        {props.icon && props.icon} <h5>{props.title}</h5>
        {props.title === "OKR Progress" && (
          <button
            className="text-left justify-content-start bg-green text-light"
            style={{ borderRadius: "4px", textTransform: "uppercase" }}
            // onClick={() => {
            //     props.setOrderModalShow3(true)
            // }}
          >
            Add OKR
          </button>
        )}
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

  const [plantTags, setPlanttags] = useState([
    {
      label: "Room1",
      value: "Room1",
    },
    {
      label: "Room2",
      value: "Room2",
    },
  ]);

  const facilitys = [
    {
      label: "Facility 1",
      value: "Facility 1",
    },
    {
      label: "Facility 2",
      value: "Facility 2",
    },
    {
      label: "Facility 3",
      value: "Facility 3",
    },
  ];

  const onSelect = (e) => {
    setTag(e.target.value);
  };

  const onSelectfacility = (e) => {
    if (e.target.value === "Facility 1") {
      setPlanttags([
        {
          label: "Room1",
          value: "Room1",
        },
        {
          label: "Room2",
          value: "Room2",
        },
      ]);
    } else if (e.target.value === "Facility 2") {
      setPlanttags([
        {
          label: "Room3",
          value: "Room3",
        },
        {
          label: "Room4",
          value: "Room4",
        },
      ]);
    } else if (e.target.value === "Facility 3") {
      setPlanttags([
        {
          label: "Room5",
          value: "Room5",
        },
        {
          label: "Room6",
          value: "Room6",
        },
      ]);
    }
    setFacility(e.target.value);
  };

  const getLabels = (toDate, diff) => {
    const constantsArray = [];
    function addConstant(value) {
      constantsArray.push(value);
    }
    for (let i = 0; i < diff + 1; i++) {
      addConstant(`${moment(addDays(toDate, i)).format("YYYY-MM-DD")}`);
    }
    return constantsArray;
  };

  const getRandomData = (diff, avg, maximum, minimum) => {
    const max = maximum || 70;
    const min = minimum || 50;
    const randomNumbers = [];
    for (let i = 0; i <= diff; i++) {
      randomNumbers.push(
        avg ? avg : Math.floor(Math.random() * (max - min + 1)) + min
      );
    }
    return randomNumbers;
  };

  const groupDataByDay = (data) => {
    const groupedData = {};
    data.forEach((obj) => {
      const date = new Date(obj["Date-Time (MST)"]);
      const day = date.toISOString().split("T")[0]; // Extracting YYYY-MM-DD
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

  useEffect(() => {
    if (excelData) {
      const datanew = groupDataByDay(excelData);
      console.log(datanew);
      const averages = calculateAverages(datanew);
      const labels = [];
      const temp = [];
      const humidity = [];
      const lsi = [];
      const co2 = [];
      const vpd = [];
      // const vpd=[]
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
            borderColor: "#88CCEE",
            backgroundColor: "#88CCEE",
            yAxisID: "y1",
          },
          {
            hidden: false,
            label: "Humidity",
            data: humidity,
            borderColor: "#44AA99",
            backgroundColor: "#44AA99",
            yAxisID: "y1",
          },
          // {
          //     label: "VPD",
          //     data: getRandomData(30, false, 35, 45),
          //     borderColor: '#DDCC77',
          //     backgroundColor: '#DDCC77',
          //     yAxisID: 'y1',
          // },
          {
            hidden: false,
            label: "CO2",
            data: co2,
            borderColor: "#332288",
            backgroundColor: "#332288",
            yAxisID: "y",
          },
          {
            hidden: false,
            label: "LSI",
            data: lsi,
            borderColor: "#999933",
            backgroundColor: "#999933",
            yAxisID: "y",
          },
          {
            hidden: true,
            label: "VPD",
            data: vpd,
            borderColor: "#DDCC77",
            backgroundColor: "#DDCC77",
            yAxisID: "y",
          },
        ],
      };
      setData2(data1);
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
        borderColor: "#88CCEE",
        backgroundColor: "#88CCEE",
        yAxisID: "y1",
      },
      {
        label: "Humidity",
        data: getRandomData(diff, false, 65, 45),
        borderColor: "#44AA99",
        backgroundColor: "#44AA99",
        yAxisID: "y1",
      },
      {
        label: "VPD",
        data: getRandomData(diff, false, 35, 45),
        borderColor: "#DDCC77",
        backgroundColor: "#DDCC77",
        yAxisID: "y1",
      },
      {
        label: "CO2",
        data: getRandomData(diff, false, 300, 1200),
        borderColor: "#332288",
        backgroundColor: "#332288",
        yAxisID: "y",
      },
      {
        label: "LSI",
        data: getRandomData(diff, false, 300, 1200),
        borderColor: "#999933",
        backgroundColor: "#999933",
        yAxisID: "y",
      },
      // {
      //     label: 'average',
      //     data: getRandomData(diff, 63),
      //     // borderColor: 'rgb(255, 0, 0)',
      //     // backgroundColor: 'rgb(145, 56, 49)',
      // },
    ];
    return dataSets;
  };

  const handleFilter = () => {
    const differenceInTime = fromDate.getTime() - toDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    if (tag == "1A4000312A000F2B0000012395") {
      const labels1 = getLabels(toDate, differenceInDays);
      const data1 = {
        labels: labels1,
        datasets: getDataSets(differenceInDays, "Blue Dream"),
      };
      setData(data1);
    } else if (tag == "1A4000312A000F2B0000012396") {
      const labels1 = getLabels(toDate, differenceInDays);
      const data1 = {
        labels: labels1,
        datasets: getDataSets(differenceInDays, "Soure Diesel"),
      };
      setData(data1);
    } else {
      const labels1 = getLabels(toDate, differenceInDays);
      const data1 = {
        labels: labels1,
        datasets: getDataSets(differenceInDays, "Blue Dream"),
      };
      setData(data1);
    }
  };

  useEffect(() => {
    handleFilter();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const binaryString = evt.target.result;
      const workbook = read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = utils.sheet_to_json(sheet, { header: 1 });

      const formattedData = data?.slice(1)?.map((row) => ({
        "Ch:1 - Temperature (°C)": row[1],
        "Ch:2 - RH (%)": row[2],
        "Date-Time (MST)": new Date(row[0]),
        "Dew Point (°C)": row[3],
        CO2: row[4],
        LSI: row[5],
      }));
      console.log(formattedData);
      setExcelData(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };

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
    const lsiIndex = updatedDatasets.findIndex(
      (dataset) => dataset.label === "LSI"
    );
    const co2Index = updatedDatasets.findIndex(
      (dataset) => dataset.label === "CO2"
    );
    const vpdIndex = updatedDatasets.findIndex(
      (dataset) => dataset.label === "VPD"
    );

    // Check if either LSI or CO2 is not hidden
    const lsiHidden = updatedDatasets[lsiIndex]?.hidden;
    const co2Hidden = updatedDatasets[co2Index]?.hidden;

    if ((!lsiHidden || !co2Hidden) && vpdIndex !== -1) {
      updatedDatasets[vpdIndex] = {
        ...updatedDatasets[vpdIndex],
        hidden: true, // Ensure VPD is hidden
      };
    } else if (lsiHidden && co2Hidden && vpdIndex !== -1) {
      updatedDatasets[vpdIndex] = {
        ...updatedDatasets[vpdIndex],
        hidden: false, // Ensure VPD is enabled if both LSI and CO2 are hidden
      };
    }

    setData2({ datasets: updatedDatasets, labels: data2.labels });
  };

  return (
    <div className="ms-4 me-4">
      <div className="row mt-3 ">
        <div
          style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
          className="select_container"
        >
          <div className="select_inputs d-flex ">
            <div className="mx-2">
              <span className="labelHeading" style={{ fontWeight: 500 }}>
                Facilities:
              </span>
              <select
                className="select-css2"
                style={{ minWidth: "250px" }}
                onChange={(e) => onSelectfacility(e)}
                value={facility}
              >
                <option>Select</option>
                {facilitys.map((item) => {
                  return <option>{item.label}</option>;
                })}
              </select>
            </div>
            <div>
              <span className="labelHeading" style={{ fontWeight: 500 }}>
                Room:
              </span>
              <select
                className="select-css2"
                style={{ minWidth: "250px" }}
                onChange={(e) => onSelect(e)}
                value={tag}
              >
                <option>Select</option>
                {plantTags.map((item) => {
                  return <option>{item.label}</option>;
                })}
              </select>
            </div>
          </div>
          <div
            className="d-flex date_container"
            style={{ alignItems: "center" }}
          >
            <div className="me-2">
              <span
                style={{ display: "block", fontWeight: 500 }}
                className="labelHeading"
              >
                To:
              </span>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                className="select-css2"
              />
            </div>
            <div>
              <span
                style={{ display: "block", fontWeight: 500 }}
                className="labelHeading"
              >
                From:
              </span>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                className="select-css2"
              />
            </div>
          </div>

          <div className="ms-2 mt-4 ">
            <button
              className="btn btn-primary  text-center"
              style={{
                alignContent: "center",
                alignItems: "center",
                height: "40px",
              }}
              onClick={() => handleFilter()}
            >
              submit
            </button>
          </div>
          <div className="ms-2 mt-4 ">
            <input
              type="file"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              ref={inputFileRef}
            />
            <button
              className="btn btn-primary text-center"
              style={{
                alignContent: "center",
                alignItems: "center",
                height: "40px",
              }}
              onClick={onBtnClick}
            >
              upload
            </button>
          </div>
        </div>
        {/* <div className={`col-12 gradient-color card shadow rounded m-1 p-1 border-0 me-3`} style={{ height: '450px' }}>
                    <Heading title="Overall Cultivation" data={[]} employees={[]} />
                    <hr />
                    <LineChart data={data} options={true} />
                </div> */}

        <div
          className={`col-12 overall_card gradient-color card shadow rounded m-1 p-1 border-0 me-3`}
          style={{ height: "fit-content" }}
        >
          <Heading title="Overall Cultivation" data={[]} employees={[]} />
          <hr />
          <CustomLegend datasets={data2} toggleDataset={toggleDataset} />
          <LineChart data={data2} options={true} />
        </div>
      </div>
      <div className="click_btn">
        <button onClick={checkApi}>click for test </button>
      </div>
    </div>
  );
};
