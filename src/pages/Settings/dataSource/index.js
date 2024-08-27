import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Make sure to create and include your CSS file

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
    setHarvestFile(e.target.files[0]);
  };

  const uploadHarvestFile = async () => {
    if (!harvestFile) return;
    const formData = new FormData();
    formData.append("file", harvestFile);
    formData.append('email', "kingrevi@gmail.com");
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


  const uploadFlowerFile = async () => {
    if (!harvestFile) return;
    const formData = new FormData();
    formData.append("file", harvestFile);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/fileupload/flower",
        formData
      );
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
    formData.append('email', "kingrevi@gmail.com");
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
        <h2>Upload Room Data</h2>
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
        <h2>Upload Harvest Data</h2>
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
        <h2>Upload Flower Data</h2>
        <input
          type="file"
          accept=".csv,.xlsx,.xls" // Adjust accepted file types as needed
          onChange={handleFlowerData}
        />
        <button onClick={uploadFlowerFile} disabled={!harvestFile}>
          Upload Flower Data
        </button>
      </div>
    </div>
  );
};

export default DataSource;
