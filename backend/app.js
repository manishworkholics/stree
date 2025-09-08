const express = require('express');
const app = express();
const dbConnect = require('./config/db')

const jewelleries = require('./route/jewelleryRoute')
const bookings = require('./route/bookingRoute');
const lehengaRoutes = require("./route/lehengaRoutes");
const billRoutes = require("./route/billRoutes");
const reportRoutes = require("./route/reportRoutes");

const bodyParser = require('body-parser');


dbConnect();
const path = require("path");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use('/api/jewelleries', jewelleries)
app.use('/api/bookings', bookings)
app.use("/api/lehengas", lehengaRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/reports", reportRoutes);






app.listen(4545, () => {
    console.log("server started")
})