
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

//Seed random function for browser-based tests

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

//Test data and help functions

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

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate() {
    const day = Math.floor(Math.random() * 28) + 1;
    return `2026-12-${String(day).padStart(2, "0")}`;
}

const browserTestResults = [];

function fillBookingForm(dbType) {
    const randomName = getRandomItem(testNames) + " " + Math.floor(Math.random() * 1000);
    const randomFacility = getRandomItem(testFacilities);
    const randomDate = getRandomDate();  
        
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


