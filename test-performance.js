//First simple automated test for MySQL history

console.log("SCRIPT STARTED");

const results = [];
const TEST_COUNT = 100; // börja litet

async function runMySQLHistoryTests() {
    for (let i = 0; i < TEST_COUNT; i++) {
        console.log(`Running test ${i + 1}`);

        const start = performance.now();

        const response = await fetch("http://localhost:3000/api/mysql/history");
        const data = await response.json();

        const end = performance.now();
        const duration = end - start;

        results.push({
            test: i + 1,
            database: "mysql",
            operation: "history",
            duration: duration.toFixed(2),
            rows: data.length
        });

        console.log(`Test ${i + 1}: ${duration.toFixed(2)} ms`);
    }

    console.log("\nAll results:");
    console.log(results);
}

runMySQLHistoryTests().catch(error => {
    console.error("Test failed:");
    console.error(error);
});