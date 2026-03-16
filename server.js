
const {
    getMongoBookingsHistory,
    searchMongoBookingsByName,
    createMongoBooking
} = require("./mongo");


const express = require("express");
const path = require("path");

const { 
    getBookingsHistory, searchBookingsByName, createBooking 
} = require("./mysql");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/test", (req, res) => {
    const dbType = req.query.db || "unknown";

    res.json({
        message: `API works with ${dbType}`
    });
});

//Server API History MySQL och MongoDB
app.get("/api/mysql/history", async (req, res) => {
    try {
      const data = await getBookingsHistory();
      res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "MySQL history error"});
    } 
});

app.get("/api/mongo/history", async (req, res) => {
    try {
      const data = await getMongoBookingsHistory();
      res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Mongo history error"});
    } 
});

//Server API Seacrh MySQL och MongoDB
app.get("/api/mysql/search", async (req, res) => {
    try {
      const name = req.query.name || "";  
      const data = await searchBookingsByName(name);
      res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "MySQL search error"});
    } 
});

app.get("/api/mongo/search", async (req, res) => {
    try {
      const name = req.query.name || "";  
      const data = await searchMongoBookingsByName(name);
      res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Mongo search error"});
    } 
});


//Server API Book MySQL och MongoDB
app.post("/api/mysql/book", async (req, res) => {
    try {
      const { name, facility, booking_date } = req.body || {};

      if (!name || !facility || !booking_date) {
        return res.status(400).json ({
            error: "name, facility and booking_date are required"
        });
      }

      const result = await createBooking(name, facility, booking_date);

      res.json({
        message: "Bookings created in MySQL",
        insertId: result.insertId
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "MySQL booking error"});
    } 
});

app.post("/api/mongo/book", async (req, res) => {
    try {
      const { name, facility, booking_date } = req.body || {};

      if (!name || !facility || !booking_date) {
        return res.status(400).json ({
            error: "name, facility and booking_date are required"
        });
      }

      const result = await createBooking(name, facility, booking_date);

      res.json({
        message: "Bookings created in MongoDB",
        insertId: result.insertId
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "MongoDB booking error"});
    } 
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});