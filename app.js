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

// The app's real routes get the SPA shell with a 200; anything else gets the
// same shell with a 404, so the app still renders its not-found page without
// a crawler indexing it. Keep in step with src/app/app.routes.ts and
// netlify.toml.
const appRoute = /^\/(about|works(\/[^/]+)?)?\/?$/;

app.get('/projects', (req, res) => res.redirect(301, '/works'));

// Archived projects, by slug and by numeric id. They were public and in the
// sitemap, so they redirect rather than falling through to a 200 not-found.
// Keep in step with netlify.toml.
const archived = {
    'talk360-payment-platform': '/works/talk360-shared-commerce-foundation',
    '9616': '/works/talk360-shared-commerce-foundation',
    'desrio': '/works',
    '9618': '/works',
    'sapphital': '/works',
    '9620': '/works',
};

app.get('/works/:id', (req, res, next) => {
    const target = archived[req.params.id.toLowerCase()];
    return target ? res.redirect(301, target) : next();
});

app.get('*', (req, res) => {
    res.status(appRoute.test(req.path) ? 200 : 404).sendFile(path.join(browserDist, 'index.html'));
})

app.listen(process.env.PORT || 8080);