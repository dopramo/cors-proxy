// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow all origins to access this server

// Endpoint for proxying requests
app.get('/proxy', async (req, res) => {
    const { url } = req.query;
    
    // If URL is not provided, send an error
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        // Make the request to the original URL
        const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });

        // Send back the response from the target server
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the URL' });
    }
});

app.listen(port, () => {
    console.log(`CORS proxy server running on http://localhost:${port}`);
});
