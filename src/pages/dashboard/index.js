import { LineChart } from "../Twin/LineCHart";
import { useEffect, useState } from "react";
import "./index.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import Select from "react-select";

const Dashboard = () => {
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [chartData, setChartData] = useState({});
  const [selectedStrains, setSelectedStrains] = useState([]);
  const [allStrains, setAllStrains] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://cannatwin.com/api/getharvestdata/?email=${localStorage.getItem('email')}`
        );
        const dataArray = response.data;

        const strainData = dataArray[0]?.reduce((acc, item) => {
          const strain = item.Strain;
          const date = moment(item.Date).format("YYYY-MM-DD");

          if (!acc[strain]) {
            acc[strain] = {};
          }

          if (!acc[strain][date]) {
            acc[strain][date] = {
              totalPlants: 0,
              totalGPerPlant: 0,
              totalYield: 0,
              totalQuality: 0,
              count: 0,
            };
          }

          acc[strain][date].totalPlants += item.Plants;
          acc[strain][date].totalGPerPlant += item["g/plant"];
          acc[strain][date].totalYield += item["Wet Weight"];
          acc[strain][date].totalQuality += item.Quality || 0;
          acc[strain][date].count += 1;

          return acc;
        }, {});

        const dates = new Set();
        const strainChartData = Object.keys(strainData).reduce((acc, strain) => {
          const strainDates = Object.keys(strainData[strain]);

          const plantsData = [];
          const gPerPlantData = [];
          const yieldData = [];
          const qualityData = [];

          strainDates.forEach((date) => {
            dates.add(date);
            const avgPlants = strainData[strain][date].totalPlants / strainData[strain][date].count;
            const avgGPerPlant = strainData[strain][date].totalGPerPlant / strainData[strain][date].count;
            const avgYield = strainData[strain][date].totalYield / strainData[strain][date].count;
            const avgQuality = strainData[strain][date].totalQuality / strainData[strain][date].count;

            plantsData.push({ date, value: avgPlants });
            gPerPlantData.push({ date, value: avgGPerPlant });
            yieldData.push({ date, value: avgYield });
            qualityData.push({ date, value: avgQuality });
          });

          acc[strain] = { plantsData, gPerPlantData, yieldData, qualityData };
          return acc;
        }, {});

        const allStrainsList = Object.keys(strainChartData);
        setAllStrains(allStrainsList);

        const sortedDates = Array.from(dates).sort();
        setFromDate(new Date(sortedDates[0]));
        setToDate(new Date(sortedDates[sortedDates.length - 1]));

        setChartData({ strainChartData, dates: sortedDates });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStrainSelection = (selectedOptions) => {
    setSelectedStrains(selectedOptions ? selectedOptions.map((option) => option.value) : []);
  };

  const commonChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: "black",
          fontWeight: 700,
          padding: 5,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
          color: "black",
          fontWeight: 700,
          padding: 5,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const getChartDataset = (metric) => {
    return selectedStrains.map((strain, index) => {
      return {
        label: strain,
        data: chartData.strainChartData[strain][metric].map((d) => d.value),
        backgroundColor: `rgba(${(index + 1) * 50},99,132,0.4)`,
        borderColor: `rgba(${(index + 1) * 50},99,132,1)`,
        fill: false,
      };
    });
  };

  const strainOptions = allStrains.map((strain) => ({ label: strain, value: strain }));

  return (
    <div className="p-3">
      <div className="d-flex mb-2 date_container">
        <div className="me-2">
          <span className="labelHeading">From:</span>
          <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
        </div>
        <div>
          <span className="labelHeading">To:</span>
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '8px' }}>
  <span className="labelHeading" style={{ marginTop: '5px' }}>Strains:</span>
  <Select
    isMulti
    options={strainOptions}
    value={strainOptions.filter((option) => selectedStrains.includes(option.value))}
    onChange={handleStrainSelection}
    placeholder="Select Strains"
    className="mb-3 multiple-calss"
    closeMenuOnSelect={false} // Keeps dropdown open until clicking outside
    hideSelectedOptions={false} // Keeps selected options in the dropdown
    isClearable={true} // Allows clearing selected options
    components={{
      MultiValue: ({ data, index }) => {
        const selectedCount = selectedStrains.length;
        if (index < 1) { // Show the first two strains
          return <span>{data.label}</span>;
        }
        if (index === 1) { // After two strains, show a summary message
          return <span>{`+${selectedCount - 2} more`}</span>;
        }
        return null; // Hide all other selected strains
      },
      MultiValueContainer: ({ children }) => children.slice(0, 3), // Ensure only two strains and the summary are rendered
    }}
  />
</div>

      </div>

      {/* Strain Multi-Select Dropdown */}

      {selectedStrains.length > 0 && (
        <>
          {/* Plants Graph */}
          <div className="row">
            <div className="col gradient-color card shadow rounded m-1 p-1" style={{ height: "fit-content" }}>
              <h5 className="mt-2 mb-4">Plants (Avg)</h5>
              <LineChart
                data={{
                  labels: chartData.dates,
                  datasets: getChartDataset("plantsData"),
                }}
                height={120}
                options={commonChartOptions}
              />
            </div>
            <div className="col gradient-color card shadow rounded m-1 p-1" style={{ height: "fit-content" }}>
              <h5 className="mt-2 mb-4">g/plant (Avg)</h5>
              <LineChart
                data={{
                  labels: chartData.dates,
                  datasets: getChartDataset("gPerPlantData"),
                }}
                height={120}
                options={commonChartOptions}
              />
            </div>
          </div>

          {/* Yield Graph */}
          <div className="row">
            <div className="col gradient-color card shadow rounded m-1 p-1" style={{ height: "fit-content" }}>
              <h5 className="mt-2 mb-4">Yield (Avg)</h5>
              <LineChart
                data={{
                  labels: chartData.dates,
                  datasets: getChartDataset("yieldData"),
                }}
                height={120}
                options={commonChartOptions}
              />
            </div>
            <div className="col gradient-color card shadow rounded m-1 p-1" style={{ height: "fit-content" }}>
              <h5 className="mt-2 mb-4">Quality (Avg)</h5>
              <LineChart
                data={{
                  labels: chartData.dates,
                  datasets: getChartDataset("qualityData"),
                }}
                height={120}
                options={commonChartOptions}
              />
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default Dashboard;
