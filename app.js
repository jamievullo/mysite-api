const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendGrid/mail');
const app = express();
require('dotenv').config();
const api_key = process.env.REACT_APP_API_KEY

console.log(process.env)

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Change later to only allow our server
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/api', (req, res, next) => {
    res.send('API Status: Running')
});

app.post('/api/email', (req, res, next) => {

    console.log(req.body);

    sendGrid.setApiKey(api_key);
    const msg = {
        to: 'jvullo01@gmail.com',
        // name: req.body.name,
        from: req.body.email,
        subject: 'jamievullo.com website Contact',
        text: `${req.body.message}---${req.body.name}---${req.body.email}` 
    }

    sendGrid.send(msg)
        .then(result => {
            res.status(200).json({
                success: true
            });
        })
        .catch(err => {
            console.log('error: ', err);
            res.status(401).json({
                success: false
            });

        });
});


app.listen(3030, '0.0.0.0');