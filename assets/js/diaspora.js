const JSON_PATH = "http://localhost:5000/results";

const REFRESH_INTERVAL = 60 * 1000;

window.addEventListener("DOMContentLoaded", () => {
  fetchDiasporaData();
  setInterval(fetchDiasporaData, REFRESH_INTERVAL);
});

async function fetchDiasporaData() {
  try {
    const res = await fetch(JSON_PATH);
    const json = await res.json();
    const data = json.data_main[0].data;
    const container = document.getElementById("diasporaContainer");
    container.innerHTML = "";

    data.forEach(entry => {
      const block = document.createElement("div");
      block.className = "card fade-in";

      const zarfaTotal = parseInt(entry.v50);
      const zarfaIrregular = parseInt(entry.v50_1);
      const zarfaWithCode = parseInt(entry.v50_2);
      const zarfaNoA = parseInt(entry.v50_2_1);
      const zarfaFVOutside = parseInt(entry.v50_2_2);
      const zarfaWithA = parseInt(entry.v50_2_3);
      const zarfaANoBallot = parseInt(entry.v50_2_3_1);
      const zarfaAWithBallot = parseInt(entry.v50_2_3_2);

      block.innerHTML = `
        <h2>${entry.v1}</h2>
        <p><strong>Registered Diaspora Voters:</strong> ${parseInt(entry.v40).toLocaleString()}</p>
        <p><strong>Envelopes Received:</strong> ${parseInt(entry.v42).toLocaleString()}</p>
        <p><strong>Envelopes Counted:</strong> ${zarfaTotal.toLocaleString()}</p>
        <p><strong>Irregular B Envelopes:</strong> ${zarfaIrregular.toLocaleString()}</p>
        <p><strong>B Envelopes with Code:</strong> ${zarfaWithCode.toLocaleString()}</p>
        <p><strong>B Envelopes without A:</strong> ${zarfaNoA.toLocaleString()}</p>
        <p><strong>FV Outside A:</strong> ${zarfaFVOutside.toLocaleString()}</p>
        <p><strong>B Envelopes with A:</strong> ${zarfaWithA.toLocaleString()}</p>
        <p><strong>A Without Ballot:</strong> ${zarfaANoBallot.toLocaleString()}</p>
        <p><strong>A With Ballot:</strong> ${zarfaAWithBallot.toLocaleString()}</p>
      `;

      container.appendChild(block);
    });
  } catch (err) {
    console.error("Error loading diaspora data:", err);
  }
}
