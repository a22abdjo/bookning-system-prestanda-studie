
async function loadHistory() {
    const start = performance.now();

    const response = await fetch("/api/mysql/history");
    const data = await response.json();

    const stop = performance.now();
    const totalTime = stop - start;

    document.getElementById("time").textContent = `Responstid (mysql history): ${totalTime.toFixed(2)} ms`;

   renderResults(data);
}

async function searchBookings() {
    const searchName = document.getElementById("searchName").value;

      const start = performance.now();

    const response = await fetch(`/api/mysql/search?name=${encodeURIComponent(searchName)}`);
    const data = await response.json();

    const stop = performance.now();
    const totalTime = stop - start;

    document.getElementById("time").textContent = `Responstid (mysql search): ${totalTime.toFixed(2)} ms`;

    renderResults(data);
}

async function createBooking() {
    const name = document.getElementById("name").value;
    const facility = document.getElementById("facility").value;
    const bookingDate = document.getElementById("bookingDate").value;

    const start = performance.now();

    const response = await fetch("/api/mysql/book", {
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

    document.getElementById("time").textContent = `Responstid (mysql booking): ${totalTime.toFixed(2)} ms`;

    renderResults([data]);
}

function renderResults(data) {
    const resultList = document.getElementById("result");
    resultList.innerHTML = "";

    if (Array.isArray(data)) {
        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = JSON.stringify(item);
            resultList.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = JSON.stringify(data);
        resultList.appendChild(li);
    }
}