import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import moment from 'moment';

export const FormatData = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert('Please upload a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Process the data
      const processedData = processData(jsonData);

      // Convert processed data back to a worksheet
      const newWorksheet = XLSX.utils.json_to_sheet(processedData);
      const newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');

      // Convert the workbook to a binary string
      const wbout = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'binary' });

      // Create a blob from the binary string
      const blob = new Blob([s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a link element, set its href to the blob URL, and trigger a download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'updated-data.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    reader.readAsArrayBuffer(file);
  };

  const processData = (data) => {
    // Extract the dates from the data
    const dates = data.map(row => moment(row.Date, 'M/D/YYYY, h:mm:ss A', true)).filter(date => date.isValid());

    if (dates.length === 0) return data;

    // Determine the old and new date ranges
    const oldStartDate = moment(dates[0]);
    const oldEndDate = moment(dates[dates.length - 1]);
    const newStartDate = moment('4/1/2024', 'M/D/YYYY');
    const newEndDate = moment('4/30/2024', 'M/D/YYYY');
    const newInterval = 30; // minutes

    // Generate new dates within the new range at the specified interval
    const newDates = [];
    let currentDate = newStartDate.clone();

    while (currentDate <= newEndDate) {
      newDates.push(currentDate.clone());
      currentDate.add(newInterval, 'minutes');
    }

    // Map old data to new dates, ensuring the new dates cover the entire range
    return data.map((row, index) => {
      if (index < newDates.length) {
        row.Date = newDates[index].format('M/D/YYYY, h:mm:ss A');
      }
      return row;
    });
  };

  // Helper function to convert a string to an ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  };

  return (
    <div>
      <h1>Format Excel Data</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Process and Download</button>
    </div>
  );
};
