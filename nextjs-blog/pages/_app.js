
import React, { useState } from "react";
import CSVDataTable from "/components/CSVDataTable.tsx";
import Link from 'next/link';
import '../styles/globals.css';

const App = () => {
	const [csvData, setCsvData] = useState([]);
	const [messages, setMessages] = useState([{ id: 1, text: 'Hello!', bot: true }]);
  
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
  
	const handleSendMessage = (text) => {
	  if (text.trim() !== "") {
		const newMessage = { id: messages.length + 1, text, bot: false };
		setMessages([...messages, newMessage]);
		for (let i = 0; i < messages.length; i++) {
		  console.log(messages[i]);
		}
	  }
	};
  
	const handleBotMessage = (text) => {
	  if (text.trim() !== "") {
		const newMessage = { id: messages.length + 1, text, bot: true };
		setMessages([...messages, newMessage]);
		for (let i = 0; i < messages.length; i++) {
		  console.log(messages[i]);
		}
	  }
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
	<h1> Welcome </h1>
	<div style={{ marginBottom: '15px' }}>
	  <label
		htmlFor="file-upload"
		style={{
		  display: 'block',
		  padding: '10px',
		  backgroundColor: '#0074e4',
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
  
	<div className="chatbox">
		<div className="messages">
		  {messages.map((message) => (
			<div key={message.id} className={(message.bot ? "botMessage" : "personMessage")}>
			  {message.text}
			</div>
		  ))}
		</div>
		<div className="input-area">
		  <input
			type="text"
			placeholder="Type your message..."
			onKeyDown={(e) => {
			  if (e.key === 'Enter') {
				handleSendMessage(e.target.value);
				e.target.value = '';
			  }
			}}
		  />
		</div>
	  </div>
  </div>
  
	);
  };
  
  export default App;