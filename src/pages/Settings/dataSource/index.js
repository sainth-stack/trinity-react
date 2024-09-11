import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Make sure to create and include your CSS file
import { read, utils } from "xlsx";

const DataSource = () => {
  const [roomFile, setRoomFile] = useState(null);
  const [harvestFile, setHarvestFile] = useState(null);
  const [flowerFile, setFlowerFile] = useState(null);

  const handleRoomFileChange = (e) => {
    setRoomFile(e.target.files[0]);
  };

  const handleHarvestFileChange = (e) => {
    setHarvestFile(e.target.files[0]);
  };

  const handleFlowerData = (e) => {
    setFlowerFile(e.target.files[0]);
  };

  const uploadHarvestFile = async () => {
    if (!harvestFile) return;
    const formData = new FormData();
    formData.append("file", harvestFile);
    formData.append('email', localStorage.getItem('email'));
    try {
      await axios.post(
        "https://cannatwin.com/api/harvestfileupload/",
        formData
      );
      alert("Harvest file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading harvest file:", error);
      alert("Error uploading harvest file");
    }
  };

  const handleFileUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryString = evt.target.result;
      const workbook = read(binaryString, { type: 'binary' });

      // Initialize a single array to store data from all sheets
      const allData = [];

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const rawData = utils.sheet_to_json(sheet, { header: 1 });

        // Extract headers and data rows
        const headers = rawData[0];
        const dataRows = rawData.slice(1);

        // Convert data rows to objects with header keys
        const jsonData = dataRows.map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });

        // Append the data for the current sheet to allData
        allData.push(...jsonData);
      });

      console.log(allData);
      localStorage.setItem('curerooms', JSON.stringify(allData));
    };
    reader.readAsBinaryString(file);
  };




  const uploadFlowerFile = async () => {
    try {
      // await axios.post(
      //   "http://127.0.0.1:8000/api/fileupload/flower",
      //   formData
      // );
      handleFileUpload(flowerFile)
      alert("Flower file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading harvest file:", error);
      alert("Error uploading harvest file");
    }
  };


  const uploadRoomFile = async () => {
    if (!roomFile) return;
    const formData = new FormData();
    formData.append('file', roomFile);
    formData.append('email', localStorage.getItem('email'));
    try {
      const res = await axios.post('https://cannatwin.com/api/fileupload/', formData);
      alert('Room file uploaded successfully!');
      setRoomFile(null)
    } catch (error) {
      console.error('Error uploading room file:', error);
      alert('Error uploading room file');
    }
  };
  return (
    <div className="data-source-container">
      <div className="upload-section">
        <h2>Room Data</h2>
        <input
          type="file"
          accept=".csv,.xlsx,.xls" // Adjust accepted file types as needed
          onChange={handleRoomFileChange}
        />
        <button onClick={uploadRoomFile} disabled={!roomFile}>
          Upload Room Data
        </button>
      </div>

      <div className="upload-section">
        <h2>Harvest Data</h2>
        <input
          type="file"
          accept=".csv,.xlsx,.xls" // Adjust accepted file types as needed
          onChange={handleHarvestFileChange}
        />
        <button onClick={uploadHarvestFile} disabled={!harvestFile}>
          Upload Harvest Data
        </button>
      </div>
      <div className="upload-section">
        <h2>Cure Rooms</h2>
        <input
          type="file"
          accept=".csv,.xlsx,.xls" // Adjust accepted file types as needed
          onChange={handleFlowerData}
        />
        <button onClick={uploadFlowerFile} disabled={!flowerFile}>
          Upload Cure Rooms
        </button>
      </div>
    </div>
  );
};

export default DataSource;
