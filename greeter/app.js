const express = require('express');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 3000;
const { join } = require('path');

app.set('view engine', 'ejs');
app.use('/', express.static(join(__dirname, 'assets')));

app.use(session({
    secret: 'glk64a31sdfg654616w585484185vasdf15646sd5f4v5ad1fvb3a2df1bdfgdfg',
    resave: false,
    saveUninitialized: true
}));


app.get('/', (req, res, next) => {
    res.render('index');
})

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port: ${port}`);
});