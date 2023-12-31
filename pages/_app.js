// pages/_app.js
import React, {useEffect, useState} from "react";
import Image from 'next/image';

import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';

import CSVDataTable from "/components/CSVDataTable.tsx";

import '../styles/globals.css';
import img1 from '../images/iris1.png';
import img2 from '../images/iris2.png';
import img4 from '../images/iris4.png';
import img5 from '../images/iris5.png';

const App = () => {
	const BACKEND_URL = "http://10.251.158.187:8000";

	const [csvData, setCsvData] = useState([]);
	const [messages, setMessages] = useState([{ id: 1, text: 'Hello! Welcome to the world of this personal, smart, and powerful data analysis tool!', bot: true }]);
	const [analysisAnswer, setAnalysisAnswer] = useState("");
	const [showImages, setShowImages] = useState(false);
	const [userId, setUserId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetch(`${BACKEND_URL}/`)
			.then(response => response.json())
			.then(data => {
				console.log(data); // Log the parsed data.
			})
			.catch(error => {
				console.error("Error fetching data:", error);
			});
	}, []); // The empty array ensures this effect runs only once when the component mounts.

	useEffect(() => {
		// Check if a user_id cookie is already set
		let currentUserId = Cookies.get('user_id');

		// If not, generate a new UUID and set it as a cookie
		if (!currentUserId) {
			currentUserId = uuidv4();
			Cookies.set('user_id', currentUserId, { expires: 30, sameSite: 'None'});
		}
		setUserId(currentUserId);
	}, []); // empty array as second argument so it only runs once

	const handleFileChange = async (event) => {
		const file = event.target.files[0];

		if (file) {
			const formData = new FormData();
			formData.append('file', file);

			// Get the user_id from the cookie
			const currentUserId = Cookies.get('user_id');

			setIsLoading(true);  // Start loading before the upload

			try {
				const response = await fetch(`${BACKEND_URL}/upload/csv/`, {
					method: 'POST',
					body: formData,
					headers: {
						'user-id': currentUserId
					},
				});

				// After successfully uploading the file
				if (response.ok) {
					// Get the analysis
					try {
						const fileId = await response.json();
						console.log("File uploaded with UUID:", fileId);

						// Make the new API call
						const analysisResponse = await fetch(`${BACKEND_URL}/analyze/${fileId}`, {
							headers: {
								'user-id': userId
							},
						});

						if (!analysisResponse.ok) {
							throw new Error(`Error getting analysis: ${analysisResponse.statusText}`);
						}

						const analysisData = await analysisResponse.json();
						setAnalysisAnswer(analysisData.answer);

						setShowImages(true);

						console.log("Received encoded images:", analysisData.files);
					} catch (error) {
						console.error("Error getting file analysis:", error);
					}
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			} finally {
				setIsLoading(false);  // Stop loading after the analysis is complete or an error occurs
			}
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

	const handleSendMessage = async (text) => {
		if (text.trim() !== "") {
			const newMessage = { id: messages.length + 1, text, bot: false };
			setMessages(prevMessages => [...prevMessages, newMessage]);

			// Get the user_id and file_id from cookies
			const currentUserId = Cookies.get('user_id');
			const fileId = Cookies.get('file_id');

			try {
				const response = await fetch(`${BACKEND_URL}/chat/${fileId}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'user-id': currentUserId
					},
					body: JSON.stringify(text)
				});

				if (!response.ok) {
					const errorData = await response.json();
					console.error('Server response:', errorData);
					throw new Error(`Server error: ${response.statusText}`);
				}

				const data = await response.json();
				handleBotMessage(data.answer);
			} catch (error) {
				console.error("Error getting response from chatbot:", error);
			}
		}
	};

	const handleBotMessage = (text) => {
		const newMessage = { id: messages.length + 1, text, bot: true };
		setMessages([...messages, newMessage]);
	};

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
	  <div id="imageAnalysis">
		  <h2>Machine Learning Analysis</h2>
		  {isLoading ? (
			  <p>Loading...</p>
		  ) : showImages ? (
			  <>
				  <p>{analysisAnswer}</p>
				  <Image src={img1} alt="iris1" width="800" height="600" /><br></br>
				  <Image src={img2} alt="iris2" width="800" height="600" /><br></br>
				  <Image src={img4} alt="iris4" width="800" height="600" /><br></br>
				  <Image src={img5} alt="iris5" width="800" height="600" /><br></br>
			  </>
		  ) : (
			  <p>Upload file to learn more</p>
		  )}
	  </div>
  </div>

	);
  };

export default App;
