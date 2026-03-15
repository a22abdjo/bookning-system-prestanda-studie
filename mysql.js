
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Mysql.12345",
    database: "Exarbete1"
});

async function getBookingsHistory() {
    const [rows] = await pool.query(`
        SELECT id, name, facility, booking_date, status
        FROM bookings
        ORDER BY booking_date DESC
        LIMIT 100
        `);
        return rows;
}

async function searchBookingsByName(name) {
    const [rows] = await pool.query(`
        SELECT id, name, facility, booking_date, status
        FROM bookings
        WHERE name LIKE ?
        ORDER BY booking_date DESC
        LIMIT 100
        `  
        ,
        [`%${name}%`]
    );
        return rows;
}

async function createBooking(name, facility, bookingDate, status = "confirmed") {
    const [result] = await pool.query(`
        INSERT INTO bookings (name, facility, booking_date, status)
        VALUES (?, ?, ?, ?)
        `
        ,
        [name, facility, bookingDate, status]
    );
        return result;
}

module.exports = {
    getBookingsHistory,
    searchBookingsByName,
    createBooking
};



