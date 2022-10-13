const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');
require('dotenv').config()

const recordRoutes = require('./server/routes/app');
const path = require('path');

const app = express();

//Log in to database
const login = process.env.LOGIN
const passwd = process.env.PASSWORD

const dbURL = `mongodb+srv://${login}:${passwd}@cluster0.ig7dx.mongodb.net/codenames?retryWrites=true&w=majority`;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false})
    .then(result => app.listen(process.env.PORT || 8080))
    .catch(err => console.log(err))
;

app.set('view engine','ejs')

app.use(express.urlencoded({extended: true,}))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/test', (req, res) => {
    res.send({ express: 'Hello World from express app' });
});

app.use('/api', recordRoutes)

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
