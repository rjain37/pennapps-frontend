import React, { useState } from "react";
import CSVDataTable from "/components/CSVDataTable.tsx";

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [message, setMessage] = useState(""); // Track user's input message

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target.result;
        parseCSV(csvText);
      };

      reader.readAsText(file);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",");
    const parsedData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");

      if (currentLine.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = currentLine[j].trim();
        }
        parsedData.push(row);
      }
    }

    setCsvData(parsedData);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // Handle sending the message here (you can use state or another method)
      // For now, let's just log it to the console
      console.log("User said:", message);
      setMessage(""); // Clear the message input
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <input type="file" onChange={handleFileChange} accept=".csv" />
      </div>
      <CSVDataTable data={csvData} />

      <input
        type="text"
        placeholder="Enter your text..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
      <div id="output"></div>
    </div>
  );
};

export default App;
