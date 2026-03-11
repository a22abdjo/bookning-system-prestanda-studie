async function loadBookings(dbType) {
    const start = performance.now();

    const response = await fetch(`/api/test?db=${dbType}`);
    const data = await response.json();

    const stop = performance.now();
    const totalTime = stop - start;

    document.getElementById("time").textContent = `Responstid (${dbType}): ${totalTime.toFixed(2)} ms`;

    const resultList = document.getElementById("result");
    resultList.innerHTML = "";

    const li = document.createElement("li");
    li.textContent = data.message;
    resultList.appendChild(li);

}