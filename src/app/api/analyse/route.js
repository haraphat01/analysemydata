// pages/api/analyze.js
import formidable from 'formidable';
import fs from 'fs';
import xlsx from 'xlsx';
import pdf from 'pdf-parse';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Parse the incoming form data
    const form = new formidable.IncomingForm();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.file;
    const analysisType = fields.analysisType;
    const additionalParams = JSON.parse(fields.additionalParams);

    // Read and process the file
    let data;
    if (file.mimetype.includes('excel')) {
      const workbook = xlsx.readFile(file.filepath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      data = xlsx.utils.sheet_to_json(sheet);
    } else if (file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(file.filepath);
      const pdfData = await pdf(dataBuffer);
      data = pdfData.text; // You might need more sophisticated PDF parsing depending on your needs
    } else {
      throw new Error('Unsupported file type');
    }

    // Prepare data for Claude AI
    const prompt = `Analyze the following data using ${analysisType} analysis. 
    Additional parameters: ${JSON.stringify(additionalParams)}
    Data: ${JSON.stringify(data)}
    Please provide a comprehensive report including:
    1. Introduction: Brief overview of the analysis type and its purpose
    2. Methodology: Describe the statistical method used
    3. Results: Detailed findings from the analysis
    4. Data Visualization: Suggestions for appropriate charts or graphs (describe them in detail)
    5. Interpretation: Explain the meaning of the results in context
    6. Conclusion: Summarize the key takeaways
    7. Limitations: Any potential limitations of the analysis
    8. References: Cite relevant statistical sources or methods used

    Format the report using Markdown syntax for headers, lists, and emphasis.`;

    // Send data to Claude AI for analysis
    const claudeResponse = await axios.post('https://api.anthropic.com/v1/chat/completions', {
      model: "claude-3-opus-20240229",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY
      }
    });

    const analysis = claudeResponse.data.choices[0].message.content;

    // Generate a unique ID for this analysis
    const analysisId = Date.now().toString(36) + Math.random().toString(36).substr(2);

    // Store the analysis result (in a real application, you'd use a database)
    // For this example, we'll use the file system
    fs.writeFileSync(`./public/analyses/${analysisId}.json`, JSON.stringify({ analysis, analysisType }));

    res.status(200).json({ analysisId });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
}