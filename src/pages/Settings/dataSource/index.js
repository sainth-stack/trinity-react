<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Make sure to create and include your CSS file

const DataSource = () => {
  const [roomFile, setRoomFile] = useState(null);
  const [harvestFile, setHarvestFile] = useState(null);
=======
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Make sure to create and include your CSS file
import { read, utils } from 'xlsx';

const DataSource = () => {
    const [roomFile, setRoomFile] = useState(null);
    const [harvestFile, setHarvestFile] = useState(null);
    const [flowerFile, setFlowerFile] = useState(null);
>>>>>>> a980bd254d7401f47eff5b6215ca79240d2d1dd8

  const handleRoomFileChange = (e) => {
    setRoomFile(e.target.files[0]);
  };

  const handleHarvestFileChange = (e) => {
    setHarvestFile(e.target.files[0]);
  };

<<<<<<< HEAD
  const uploadRoomFile = async () => {
    if (!roomFile) return;
    const formData = new FormData();
    formData.append("file", roomFile);

    try {
      await axios.post("http://127.0.0.1:8000/api/fileupload/room", formData);
      alert("Room file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading room file:", error);
      alert("Error uploading room file");
    }
  };
=======
    const handleFlowerFileChange = (e) => {
        setFlowerFile(e.target.files[0]);
    };

    const handleFileUpload = (file, type) => {
        const reader = new FileReader();

        reader.onload = (evt) => {
            const binaryString = evt.target.result;
            const workbook = read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = utils.sheet_to_json(sheet, { header: 1 });

            localStorage.setItem(type, JSON.stringify(data));
        };

        reader.readAsBinaryString(file);
    };

    const uploadRoomFile = async () => {
        if (!roomFile) return;
        const formData = new FormData();
        formData.append('file', roomFile);
        try {
            // await axios.post('http://18.143.175.41:5000/api/fileupload/room', formData);
            alert('Room file uploaded successfully!');
            handleFileUpload(roomFile, 'room');
            setRoomFile(null);
        } catch (error) {
            console.error('Error uploading room file:', error);
            alert('Error uploading room file');
        }
    };
>>>>>>> a980bd254d7401f47eff5b6215ca79240d2d1dd8

  const uploadHarvestFile = async () => {
    if (!harvestFile) return;
    const formData = new FormData();
    formData.append("file", harvestFile);

<<<<<<< HEAD
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/fileupload/harvest",
        formData
      );
      alert("Harvest file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading harvest file:", error);
      alert("Error uploading harvest file");
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
    </div>
  );
=======
        try {
            // await axios.post('http://18.143.175.41:5000/api/fileupload/harvest', formData);
            alert('Harvest file uploaded successfully!');
            handleFileUpload(harvestFile, 'harvest');
            setHarvestFile(null);
        } catch (error) {
            console.error('Error uploading harvest file:', error);
            alert('Error uploading harvest file');
        }
    };

    const uploadFlowerFile = async () => {
        if (!flowerFile) return;
        const formData = new FormData();
        formData.append('file', flowerFile);

        try {
            // await axios.post('http://18.143.175.41:5000/api/fileupload/flower', formData);
            alert('Flower file uploaded successfully!');
            handleFileUpload(flowerFile, 'flower');
            setFlowerFile(null);
        } catch (error) {
            console.error('Error uploading flower file:', error);
            alert('Error uploading flower file');
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
                    onChange={handleFlowerFileChange}
                />
                <button onClick={uploadFlowerFile} disabled={!flowerFile}>
                    Upload Flower Data
                </button>
            </div>
        </div>
    );
>>>>>>> a980bd254d7401f47eff5b6215ca79240d2d1dd8
};

export default DataSource;
