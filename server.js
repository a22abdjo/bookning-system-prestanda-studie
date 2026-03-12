
const express = require("express");
const path = require("path");
const { getBookingsHistory, searchBookingsByName } = require("./mysql");

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

app.get("/api/mysql/history", async (req, res) => {
    try {
      const data = await getBookingsHistory();
      res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "MySQL history error"});
    } 
});

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

app.post("/api/mysql/book", async (req, res) => {
    try {
      const name = req.query.name || "";  

      const data = await searchBookingsByName(name);

      res.json({
        message: "bookings created in MySQL",
        insertId: result.insertId
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "MySQL booking error"});
    } 
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost${PORT}`);
});