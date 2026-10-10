const express = require('express');

const path = require('path');

const compression = require('compression');

const app = express();

app.use(compression());

// Angular's application builder emits the browser bundle into dist/portfolio/
// browser; serving dist/portfolio itself returned nothing but a directory
// holding the prerender manifest.
const browserDist = path.join(__dirname, 'dist', 'portfolio', 'browser');

app.use(express.static(browserDist));

app.get('*', (req, res) => {
    res.sendFile(path.join(browserDist, 'index.html'));
})

app.listen(process.env.PORT || 8080);