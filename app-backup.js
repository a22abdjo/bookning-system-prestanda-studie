
async function loadHistory(dbType) {
    const start = performance.now();

    let url = "";
    if (dbType === "mysql") {
        url = "/api/mysql/history";
    } else {
        url = "/api/mongo/history";
    }

    const response = await fetch(url);
    const data = await response.json();

    const stop = performance.now();
    const totalTime = stop - start;

    document.getElementById("time").textContent = `Responstid (${dbType} history): ${totalTime.toFixed(2)} ms`;

   renderResults(dbType, data);
}

async function searchBookings(dbType) {
    const searchName = 
       dbType === "mysql"
          ? document.getElementById("searchNameMysql").value
          : document.getElementById("searchNameMongo").value;

      const start = performance.now();

      let url = "";
      if (dbType === "mysql") {
        url = `/api/mysql/search?name=${encodeURIComponent(searchName)}`;
    } else {
        url = `/api/mongo/search?name=${encodeURIComponent(searchName)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    const stop = performance.now();
    const totalTime = stop - start;

    document.getElementById("time").textContent = `Responstid (${dbType} search): ${totalTime.toFixed(2)} ms`;

    renderResults(dbType, data);
}

async function createBooking(dbType) {
    const name = 
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

    const start = performance.now();

    let url = "";

     if (dbType === "mysql") {
        url = '/api/mysql/book';
    } else {
        url = '/api/mongo/book';
    }

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

    const stop = performance.now();
    const totalTime = stop - start;

    document.getElementById("time").textContent = `Responstid (${dbType} booking): ${totalTime.toFixed(2)} ms`;

    renderResults(dbType, [data]);
}

function renderResults(dbType, data) {
    const resultList = 
        dbType === "mysql"
            ? document.getElementById("resultMysql")
            : document.getElementById("resultMongo");

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

function downloadBrowserResultsToCSV(){
    let csv = "Test,Database,Operation,Duration(ms),Status\n";

    browserTestResults.forEach(item => {
        csv += `${item.test}, ${item.database}, ${item.operation}, ${item.duration}, ${item.status}\n`;
    });

    

    const blob = new Blob([], { type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "browser-performance-results.csv";
    link.click();

    URL.revokeObjectURL(url);
}