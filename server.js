
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/test", (req, res) => {
    const dbType = req.query.db || "unknown";

    res.json({
        message: `API works with ${dbType}`
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost${PORT}`);
});