//First simple automated test for MySQL history

console.log("SCRIPT STARTED");

const results = [];
const TEST_COUNT = 5; // börja litet

async function measureRequest(database, operation, url, testNumber) {
        const start = performance.now();

        const response = await fetch(url);
        const data = await response.json();

        const end = performance.now();
        const duration = end - start;

        results.push({
            test: testNumber,
            database,
            operation,
            duration: duration.toFixed(2),
            rows: Array.isArray(data) ? data.length : 0
        });

        console.log(`${database} ${operation} test ${testNumber}: ${duration.toFixed(2)} ms`);

}

async function runHistoryTests() {
    for (let i = 0; i < TEST_COUNT; i++) {
        await measureRequest("mysql","history", "http://localhost:3000/api/mysql/history", i + 1);
        await measureRequest("mongo","history", "http://localhost:3000/api/mongo/history", i + 1);
    }

    console.log("\nAll results:");
    console.log(results);
}

runHistoryTests().catch(error => {
    console.error("Test failed:");
    console.error(error);
});