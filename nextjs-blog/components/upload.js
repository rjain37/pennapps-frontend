import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const uploadedFile = files.file;

      if (!uploadedFile) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const csvData = [];

      // read/parse the uploaded .csv file
      uploadedFile
        .pipe(csv())
        .on('data', (row) => {
          csvData.push(row);
        })
        .on('end', () => {
          // parsed .csv data sent as JSON response
          res.status(200).json(csvData);
        });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}