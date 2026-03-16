//Hantering av MongoDB connection och queries för bokning system

const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient (uri);

//Hämta boknings historik
async function getMongoBookingsHistory() {
    await client.connect();

    const db = client.db("Exarbete1");
    const collection = db.collection("bookings");

    const data = await collection 
        .find({})
        .sort({booking_date: -1 })
        .limit(100)
        .toArray();

    return data;
}

//Sök bokning genom namn
async function searchMongoBookingsByName(name) {
    await client.connect();

    const db = client.db("Exarbete1");
    const collection = db.collection("bookings");

    const data = await collection.find({
        name: { $regex: name, $options: "i" }
    }).toArray();

    return data;
}

//Skapa ny bokning
async function createMongoBooking(name, facility, bookingDate, status = "confirmed") {
    await client.connect();

    const db = client.db("Exarbete1");
    const collection = db.collection("bookings");

    const result = await collection.insertOne({
        name,
        facility,
        booking_date: bookingDate,
        status
    });

    return result;
}

module.exports = {
    getMongoBookingsHistory,
    searchMongoBookingsByName,
    createMongoBooking
};

