import React, { useState } from "react";
import CSVDataTable from "/components/CSVDataTable.tsx";
import Link from 'next/link';

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
      console.log(message);
    }
  };
  
  function Home() {
    return (
      <div>
        <h1>AnalyzeAI</h1>
        <p>Welcome to AnalyzeAI.</p>
        <Link href="/about">Go to About</Link>
      </div>
    ); // PLACEHOLDER - repeat for other pages!
  }

  return (
<div style={{ 
  maxWidth: '1200px', 
  margin: '0 auto', 
  padding: '20px', 
  backgroundColor: '#3CB043', 
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
  borderRadius: '10px',
  textAlign: 'center',
  fontFamily: "'Montserrat', sans-serif"
}}>
  <h1> Title </h1>
  <div style={{ marginBottom: '15px' }}>
    <label
      htmlFor="file-upload"
      style={{
        display: 'block',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
    >
      Choose File
    </label>
    <input 
      type="file" 
      id="file-upload"
      onChange={handleFileChange} 
      accept=".csv"
      style={{
        display: 'none', // Hide the actual file input
      }}
    />
  </div>
  <CSVDataTable data={csvData} />

<input
  type="text"
  placeholder="Enter your query..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  style={{
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    width: '90%',
    marginBottom: '10px',
    marginTop: '20px',
  }}
/>
<button
  onClick={handleSendMessage}
  style={{
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  }}
>
  Send!
</button>
</div>

  );
};

export default App;