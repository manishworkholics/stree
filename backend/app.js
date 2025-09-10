const express = require('express');
const app = express();
const dbConnect = require('./config/db')
const cors = require("cors");   // ✅ add this
const path = require("path");
const bodyParser = require('body-parser');

const jewelleriesRoutes = require('./route/jewelleryRoute')
const bookingsRoutes = require('./route/bookingRoute');
const lehengaRoutes = require("./route/lehengaRoutes");
const billRoutes = require("./route/billRoutes");
const reportRoutes = require("./route/reportRoutes");
const categoryRoutes = require("./route/categoryRoutes");
const customerRoutes = require("./route/customerRoute");

dbConnect();

// ✅ Allow CORS
app.use(cors({
    origin: "*",   // allow all origins (or restrict to your frontend domain e.g. "http://localhost:3000")
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/jewelleries', jewelleriesRoutes)
app.use('/api/bookings', bookingsRoutes)
app.use("/api/lehengas", lehengaRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/customers", customerRoutes);

app.listen(4545, () => {
    console.log("server started")
})
