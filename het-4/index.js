const express = require('express');
const app = express();
const routesApi = require('./router/router');
const port = process.env.PORT || 3000;

app
    .use(express.json())
    .use(express.urlencoded({
        extended: true
    }))
    .use('/api', routesApi)

    .get('*', function (req, res) {
        res.send('Hello! This is a RESTful API inplementation.');
    })

const server = app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
