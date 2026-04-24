// Frontend logic for the booking system.
// Handles API calls, resposne time measurement, rendering of result.
// Browser-based automated performance tests.

// Fetch booking history from the selected database and measure repsosne time. 
async function loadHistory(dbType) {
    const start = performance.now(); // Start Measuring before sending the API request. 

    let url = "";
    if (dbType === "mysql") {
        url = "/api/mysql/history";
    } else {
        url = "/api/mongo/history";
    }

    const response = await fetch(url); // Send request to the backend endpoint for the selected database. 
    const data = await response.json();

    const stop = performance.now();
    const totalTime = stop - start; // Calculate total response time in milliseconds. 

    document.getElementById("time").textContent = `Responstid (${dbType} history): ${totalTime.toFixed(2)} ms`;

   renderResults(dbType, data);
}

//Search bookings by name in the selected database and measure response time.
async function searchBookings(dbType) {

    const searchName = // Get Search input from the correct form depending on database type.
       dbType === "mysql"
          ? document.getElementById("searchNameMysql").value
          : document.getElementById("searchNameMongo").value;

      const start = performance.now();

      let url = ""; // Select the corrrect API endpoint for MySQL or MongoDB.
      if (dbType === "mysql") {
        url = `/api/mysql/search?name=${encodeURIComponent(searchName)}`;
    } else {
        url = `/api/mongo/search?name=${encodeURIComponent(searchName)}`;
    }

    const response = await fetch(url); // Send search request to backend and convert the response to JSON. 
    const data = await response.json();

    const stop = performance.now();
    const totalTime = stop - start;

    document.getElementById("time").textContent = `Responstid (${dbType} search): ${totalTime.toFixed(2)} ms`;

    renderResults(dbType, data);
}

// Create a new booking in the selected database and measure response time. 
async function createBooking(dbType) {

    const name = // Read booking form values from either the MySQL or MongoDB panel. 
       dbType === "mysql"
          ? document.getElementById("nameMysql").value
          : document.getElementById("nameMongo").value;

    const facility = 
       dbType === "mysql"
          ? document.getElementById("facilityMysql").value
          : document.getElementById("facilityMongo").value;

    const bookingDate = 
       dbType === "mysql"
          ? document.getElementById("bookingDateMysql").value
          : document.getElementById("bookingDateMongo").value;

    // Log payload to verify that frontend data is sent correctly to backend.       
    console.log("Booking payload", {
        dbType,
        name,
        facility,
        bookingDate
    });

    const start = performance.now();

    let url = "";

     if (dbType === "mysql") {
        url = '/api/mysql/book';
    } else {
        url = '/api/mongo/book';
    }

    // Send booking data to backend API as JSON. 
    const response = await fetch(url, {
        method: "POST",
        headers: {
             "Content-Type": "application/json"    
        },
        body: JSON.stringify({
            name,
            facility,
            booking_date: bookingDate        
        })
    });

    const data = await response.json();

    // Stop the test if the backend returns an error response. 
    if (!response.ok) {
        console.error("Booking failed:", data);
        throw new Error(data.error || "Booking request failed");
    }

    const stop = performance.now();
    const totalTime = stop - start;

    document.getElementById("time").textContent = `Responstid (${dbType} booking): ${totalTime.toFixed(2)} ms`;

    renderResults(dbType, [data]); // render the created booking or backend response in the correct result panel. 
}

// Render returned database results in the corresponding UI panel. 
function renderResults(dbType, data) {
    const resultList = 
        dbType === "mysql"
            ? document.getElementById("resultMysql")
            : document.getElementById("resultMongo");

    // Clear previous results before displaying new data. 
    resultList.innerHTML = ""; 

    if (Array.isArray(data)) {
        data.forEach(item => {
            const li = document.createElement("li");
            
            if (item.name) {
                li.textContent =
                    `${item.name} | ${item.facility} | ${item.booking_date} | ${item.status}`;
            }else {
               li.textContent = JSON.stringify(item);  
            }

            resultList.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = JSON.stringify(data);
        resultList.appendChild(li);
    }
}

// Seed random function used to make browser-based tests reproducible. 
function jsf32(a, b, c, d) {
  a |= 0; b |= 0; c |= 0; d |= 0;
  var t = a - (b << 23 | b >>> 9) | 0;
  a = b ^ (c << 16 | c >>> 16) | 0;
  b = c + (d << 11 | d >>> 21) | 0;
  b = c + d | 0;
  c = d + t | 0;
  d = a + t | 0;
  return (d >>> 0) / 4294967296;
}

Math.random = function() {
    var ran=jsf32(0xF1EA5EED,Math.randSeed+6871,Math.randSeed+1889,Math.randSeed+56781);
    Math.randSeed+=Math.floor(ran*37237);
    return(ran)
}

Math.setSeed = function(seed){
    Math.randSeed=seed;
    for(var i=0;i<7;i++) Math.random();
}

var origRandom = Math.random;
Math.randSeed = Math.floor(Date.now());

// Test data used to automatically fill forms during browser-based tests.
const testFacilities = [
    "Sporthall",
    "Konferensrum",
    "Mötesrum",
    "Idrottshall",
    "Lokal A",
    "Lokal B"
];

const testNames = [
    "Anna Svensson",
    "Peter Karlsson",
    "Maria Andersson",
    "Jhon Doe",
    "Sara Ali",
    "Lina Berg"
];

// Select a random item from array.
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate() {
    const day = Math.floor(Math.random() * 28) + 1;
    return `2026-12-${String(day).padStart(2, "0")}`;
}

const browserTestResults = [];


// Automatic fill the booking form with automated test data. 
function fillBookingForm(dbType) {
    const randomName = getRandomItem(testNames) + " " + Math.floor(Math.random() * 1000);
    const randomFacility = getRandomItem(testFacilities);
    const randomDate = getRandomDate();  
        
    // Fill the correct form depending on selected database.
     if (dbType === "mysql") {
        document.getElementById("nameMysql").value = randomName;
        document.getElementById("facilityMysql").value = randomFacility;
        document.getElementById("bookingDateMysql").value = randomDate;
    } else {
        document.getElementById("nameMongo").value = randomName;
        document.getElementById("facilityMongo").value = randomFacility;
        document.getElementById("bookingDateMongo").value = randomDate;
    }

    return {
        name: randomName,
        facility: randomFacility,
        bookingDate: randomDate
    };
}

// Automatically fill the search field with generated test data. 
function fillSearchForm(dbType) {
    const randomName = getRandomItem(testNames).split(" ")[0]; 
        
     if (dbType === "mysql") {
        document.getElementById("searchNameMysql").value = randomName;
    } else {
        document.getElementById("searchNameMongo").value = randomName;
    }

    return randomName;
}

// Run one browser-based booking test and store the measure result.
async function runOneBookingBrowserTest(dbType) {
    fillBookingForm(dbType);

    const start = performance.now();

    // Try to execute the booking request and store the result as success or failed. 
    try {
        await createBooking(dbType);

        const end = performance.now();
        const duration = end - start;

        browserTestResults.push({
            database: dbType,
            operation: "booking",
            duration: duration.toFixed(2),
            status: "success"
        });

    console.log(`${dbType} booking test: ${duration.toFixed(2)} ms`);
    } catch (error) {
        const end = performance.now();
        const duration = end - start;

        browserTestResults.push({
            database: dbType,
            operation: "booking",
            duration: duration.toFixed(2),
            status:"failed"
        });
        console.error(`${dbType} booking failed: ${error.message}`);

    }
}

// Run one browser-based search test and store the measured result. 
async function runOneSearchBrowserTest(dbType) {
    fillSearchForm(dbType);

    const start = performance.now();

    try {
        await searchBookings(dbType);

        const end = performance.now();
        const duration = end - start;

        browserTestResults.push({
            database: dbType,
            operation: "search",
            duration: duration.toFixed(2),
            status: "success"
        });

    console.log(`${dbType} search test: ${duration.toFixed(2)} ms`);
    } catch (error) {
        const end = performance.now();
        const duration = end - start;

        // Save measured search response time for later analysis
        browserTestResults.push({
            database: dbType,
            operation: "search",
            duration: duration.toFixed(2),
            status:"failed"
        });
        console.error(`${dbType} search failed: ${error.message}`);

    }
}

// Run one browser-based history test and store the measured result. 
async function runOneHistoryBrowserTest(dbType) {
    const start = performance.now();

    try {
        await loadHistory(dbType);

        const end = performance.now();
        const duration = end - start;

        browserTestResults.push({
            database: dbType,
            operation: "history",
            duration: duration.toFixed(2),
            status: "success"
        });

    console.log(`${dbType} history test: ${duration.toFixed(2)} ms`);
    } catch (error) {
        const end = performance.now();
        const duration = end - start;

        // Save measured history response time for later analysis
        browserTestResults.push({
            database: dbType,
            operation: "history",
            duration: duration.toFixed(2),
            status:"failed"
        });
        console.error(`${dbType} history failed: ${error.message}`);

    }
}

// Run a full browser-based test sequence for both databases.
// Each iteration testing Search, Booking and History for MySQL and MongoDB. 
async function runBrowserTests(testCount = 3, seed = 12345) {

    Math.setSeed(seed); // Use a fixed seed to make test data reproducible.
    browserTestResults.length = 0; // Clear test results before starting a new test run.

    for (let i = 0; i < testCount; i++) {
        console.log(`Running browser test round ${i + 1}/${testCount}`);

        await runOneHistoryBrowserTest("mysql");
        await runOneHistoryBrowserTest("mongo");

        await runOneSearchBrowserTest("mysql");
        await runOneSearchBrowserTest("mongo");

        await runOneBookingBrowserTest("mysql");
        await runOneBookingBrowserTest("mongo");
    }
    
    console.log("Browser-based tests completed");
    console.log(browserTestResults);
}

// Export collected browser-based test results to a CSV file for analysis.
function downloadBrowserResultsToCSV(){
    let csv = "Test,Database,Operation,Duration(ms),Status\n"; // Create CSV header row. 

    // Add each measured test result as one row in the CSV file. 
    browserTestResults.forEach(item => {
        csv += `${item.test ??""},${item.database},${item.operation},${item.duration},${item.status}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;"}); // Create downloadable CSV file from generated CSV string.
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "kanaries-data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

