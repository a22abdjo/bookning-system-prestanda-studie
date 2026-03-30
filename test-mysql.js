const mysql = require("mysql2/promise");

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Mysql.12345",
            database: "ExarbetePrototype1"
        });

        console.log("MySQL connection works");

        const [rows] = await connection.query("SELECT * FROM bookings LIMIT 5");
        console.log(rows);

        await connection.end();
    } catch (error) {
        console.error("Connection failed:");
        console.error(error);
    }
}

testConnection();