const JSON_PATH = "http://localhost:5000/results";

const REFRESH_INTERVAL = 60 * 1000;

window.addEventListener("DOMContentLoaded", () => {
  fetchRegionData();
  setInterval(fetchRegionData, REFRESH_INTERVAL);
});

async function fetchRegionData() {
  try {
    const res = await fetch(JSON_PATH);
    const json = await res.json();
    const data = json.data_main[0].data;
    const table = document.getElementById("regionTableBody");
    table.innerHTML = "";

    data.forEach(entry => {
      const registered = parseInt(entry.v6);
      const voted = parseInt(entry.v8);
      const valid = parseInt(entry.v10_2);
      const invalid = parseInt(entry.v11_2);
      const turnout = registered ? ((voted / registered) * 100).toFixed(2) : "0.00";

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.v1}</td>
        <td>${registered.toLocaleString()}</td>
        <td>${voted.toLocaleString()}</td>
        <td>${valid.toLocaleString()}</td>
        <td>${invalid.toLocaleString()}</td>
        <td>${turnout}%</td>
      `;
      table.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading region summary:", err);
  }
}
