const express = require('express');
const fs = require('fs').promises; // Use async fs
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/save-template', async (req, res) => {
  try {
    const { templateId, components } = req.body;
    
    // Create the file content
    const fileData = JSON.stringify(req.body, null, 2);
    
    // Path where you want to save (e.g., in a folder called 'saved_templates')
    const filePath = path.join(__dirname, 'data', `${templateId}.json`);

    await fs.writeFile(filePath, fileData);
    
    res.status(200).json({ message: "Template saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save file" });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));