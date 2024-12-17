const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com';

// Route to handle story generation
app.post('/generate-story', async (req, res) => {
    const { keywords, genre, tone, length } = req.body;

    // Construct the story prompt
    const prompt = `Create a ${tone} short story in the ${genre} genre. Include the following keywords: ${keywords.join(", ")}. The story should be approximately ${length} words long.`;

    try {
        // API Request to Google Gemini
        const response = await axios.post(
            `${GEMINI_API_URL}/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // Extract the story from the API response
        const story =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";
        
        // Send the story back to the client
        res.status(200).json({ story: story.trim() });
    } catch (error) {
        console.error('Error generating story:', error?.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to generate story',
            details: error?.response?.data || error.message
        });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
