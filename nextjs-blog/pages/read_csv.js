import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default async (req, res) => {
  try {
    const csvFilePath = path.join(process.cwd(), 'public', 'data.csv');

    const csvData = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        csvData.push(row);
      })
      .on('end', () => {
        res.status(200).json(csvData);
      });
  } catch (error) {
    console.error('Error reading CSV:', error);
    res.status(500).json({ error: 'An error occurred while reading the CSV file.' });
  }
};
