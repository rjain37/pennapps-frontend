
import React, { useState } from "react";
import CSVDataTable from "/components/CSVDataTable.tsx";
import '../styles/globals.css';
import img1 from '../images/iris1.png';
import img2 from '../images/iris2.png';
import img4 from '../images/iris4.png';
import img5 from '../images/iris5.png';
import Image from 'next/image';

const App = () => {
	const [csvData, setCsvData] = useState([]);
	const [messages, setMessages] = useState([{ id: 1, text: 'Hello! Welcome to the world of this personal, smart, and powerful data analysis tool!', bot: true }]);
	const [showImages, setShowImages] = useState(false);
  
	const handleFileChange = (event) => {
		setShowImages(true);
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
	var classname = showImages ? '' : 'hidden';
  
	return (
  <div style={{ 
	maxWidth: '1200px', 
	margin: '0 auto', 
	padding: '20px', 
	backgroundColor: '#a181e0', 
	boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
	borderRadius: '10px',
	textAlign: 'center',
	fontFamily: "'Montserrat', sans-serif",
	justifyContent: 'center'
  }}>
	<h1 style={{ fontFamily: "'Montserrat', sans-serif" }}> Welcome to DataDaddy</h1>
	<div style={{ marginBottom: '15px' }}>
	  <label
		htmlFor="file-upload"
		style={{
		  display: 'block',
		  padding: '10px',
		  backgroundColor: '#D4EDDF',
		  color: 'black',
		  border: '1px solid #ccc',
		  borderRadius: '5px',
		  cursor: 'pointer',
		  transition: 'background-color 0.3s',
		  fontFamily: "'Montserrat', sans-serif"
		}}
	  >
		Choose Files
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
  
	<center><div className="chatbox">
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
			placeholder="Enter your query..."
			onKeyDown={(e) => {
			  if (e.key === 'Enter') {
				handleSendMessage(e.target.value);
				e.target.value = '';
			  }
			}}
		  />
		</div>
	  </div></center>
	  
	  <div id = "imageAnalysis" className={classname}>
			<h2>Machine Learning Analysis</h2>
			<p>Here are some of the most important features of your data:</p>
			<Image src={img1} alt="iris1" width="800" height="600" /><br></br>
			<Image src={img2} alt="iris2" width="800" height="600" /><br></br>
			<Image src={img4} alt="iris4" width="800" height="600" /><br></br>
			<Image src={img5} alt="iris5" width="800" height="600" /><br></br>
	  </div>
  </div>
  
	);
  };
  
  export default App;