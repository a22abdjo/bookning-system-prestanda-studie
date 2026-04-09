//First simple automated test for MySQL history

const fs = require("fs");
console.log("SCRIPT STARTED");

const results = [];
const TEST_COUNT = 500; // Increase amount of automated tests here!

async function measureRequest(database, operation, url, testNumber, options= {}) {
        const start = performance.now();

        const response = await fetch(url, options);
        const data = await response.json();

        const end = performance.now();
        const duration = end - start;

        results.push({
            test: testNumber,
            database,
            operation,
            duration: duration.toFixed(2),
            status: response.status
        });

        console.log(`${database} ${operation} test ${testNumber}: ${duration.toFixed(2)} ms`);
        return data;
}

async function runHistoryTests() {
    for (let i = 0; i < TEST_COUNT; i++) {
        await measureRequest("mysql","history", "http://localhost:3000/api/mysql/history", i + 1);
        await measureRequest("mongo","history", "http://localhost:3000/api/mongo/history", i + 1);
    }

    console.log("\nAll results:");
    console.log(results);
}

async function runSearchTests() {
    const searchName = "Abbe";

    for (let i = 0; i < TEST_COUNT; i++) {
        await measureRequest(
            "mysql",
            "search",
             `http://localhost:3000/api/mysql/search?name=${encodeURIComponent(searchName)}`,
            i+1
        );

        await measureRequest(
            "mongo",
            "search", 
            `http://localhost:3000/api/mongo/search?name=${encodeURIComponent(searchName)}`,
            i+1
        );
    }
}

async function runBookingTests() {
    for (let i = 0; i < TEST_COUNT; i++) {
        await measureRequest(
            "mysql",
            "booking",
            "http://localhost:3000/api/mysql/book",
            i+1,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: `Auto MySQL User ${i+1}`,
                    facility: "Sporthall",
                    booking_date: "2026-12-01"
                })
            }
        );

        await measureRequest(
            "mongo",
            "booking",
            "http://localhost:3000/api/mongo/book",
            i+1,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: `Auto Mongo User ${i+1}`,
                    facility: "Sporthall",
                    booking_date: "2026-12-01"
                })
            }
        );
    }
}

function saveResultsToCSV(){
    let csv = "Test,Database,Operation,Duration(ms),Status\n";

    results.forEach(item => {
        csv += `${item.test}, ${item.database}, ${item.operation}, ${item.duration}, ${item.status}\n`;
    });

    fs.writeFileSync("performance-results.csv", csv);
}

function calculateAverage(database, operation) {
    const filtered = results.filter(
        item => item.database === database && item.operation === operation
    );

    if (filtered.length ===0) {
        return 0;
    }

    const total = filtered.reduce((sum, item) => sum + Number(item.duration), 0);
    return (total / filtered.length).toFixed(2);
}

async function runTests() {
    await runHistoryTests();
    await runSearchTests();
    await runBookingTests();

    console.log("\nAll results:");
    console.log(results);

    saveResultsToCSV();
    console.log("Saved Results to performance-results.csv");

    console.log(`MySQL history avg: ${calculateAverage("mysql", "history")}ms`);
    console.log(`Mongo history avg: ${calculateAverage("mongo", "history")}ms`);
    console.log(`MySQL search avg: ${calculateAverage("mysql", "search")}ms`);
    console.log(`Mongo search avg: ${calculateAverage("mongo", "search")}ms`);
    console.log(`MySQL booking avg: ${calculateAverage("mysql", "booking")}ms`);
    console.log(`Mongo booking avg: ${calculateAverage("mongo", "booking")}ms`);
    
}

runTests().catch(error => {
    console.error("Test failed:");
    console.error(error);
});