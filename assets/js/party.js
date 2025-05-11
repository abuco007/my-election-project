const JSON_PATH = "http://localhost:5000/results";

const REFRESH_INTERVAL = 60 * 1000;

window.addEventListener("DOMContentLoaded", () => {
  fetchPartyResults();
  setInterval(fetchPartyResults, REFRESH_INTERVAL);
});

async function fetchPartyResults() {
  try {
    const res = await fetch(JSON_PATH);
    const json = await res.json();
    const data = json.data_main[1].data;

    const container = document.getElementById("partyResultsContainer");
    container.innerHTML = "";

    const groupedByMunicipality = {};

    data.forEach(entry => {
      const city = entry.v1;
      if (!groupedByMunicipality[city]) {
        groupedByMunicipality[city] = [];
      }
      groupedByMunicipality[city].push(entry);
    });

    Object.entries(groupedByMunicipality).forEach(([city, entries]) => {
      const section = document.createElement("section");
      section.className = "party-block fade-in";
      section.innerHTML = `<h2>${city}</h2>`;

      entries.forEach(entry => {
        const card = document.createElement("div");
        card.className = "party-card";

        card.innerHTML = `
          <p><strong>${entry.v3}</strong></p>
          <p>Valid Votes (Inside): ${parseInt(entry.v5).toLocaleString()}</p>
          <p>Valid Votes (Outside): ${parseInt(entry.v5_1).toLocaleString()}</p>
          <p>Total: ${parseInt(entry.v5_2).toLocaleString()}</p>
        `;

        section.appendChild(card);
      });

      container.appendChild(section);
    });
  } catch (err) {
    console.error("Error loading party results:", err);
  }
}
