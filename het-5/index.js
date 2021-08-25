const express = require('express');
const app = express();
const session = require('express-session');
const API = require('./router/router');
const port = process.env.PORT || 3000;
const { join } = require('path');

app.use('/', express.static(join(__dirname, 'client')));

app.use(session({
    secret: 'kiralyEzAKurzus',
    resave: false,
    saveUninitialized: true
}));

app.use('/api', API);
app.get('/', (req, res, next) => {
    res.sendFile(join(__dirname, 'client/index.html'))
})
app.get('/after-increase', (req, res, next) => {
    res.sendFile(join(__dirname, 'client/increased.html'));
})
app.get('/after-reset', (req, res, next) => {
    res.sendFile(join(__dirname, 'client/reset.html'));
})

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port: ${port}`);
});
