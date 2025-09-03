const express = require('express');
const app = express();
const dbConnect = require('./config/db')

const jewelleries = require('./route/jewelleryRoute')

const bodyParser = require('body-parser');

dbConnect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())


app.use('/api/v1', jewelleries)








app.listen(4545, () => {
    console.log("server started")
})