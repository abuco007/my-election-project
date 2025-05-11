const COUNT_DURATION = 1000; // ms
const REFRESH_INTERVAL = 60 * 1000; // 60 seconds
const JSON_PATH = "http://localhost:5000/results";

window.addEventListener("DOMContentLoaded", () => {
  fetchData();
  setInterval(fetchData, REFRESH_INTERVAL);
});

async function fetchData() {
  try {
    const res = await fetch(JSON_PATH);
    const json = await res.json();
    const data = json.data_main[0].data;

    let totalRegistered = 0;
    let totalParticipants = 0;
    let validVotes = 0;
    let invalidVotes = 0;

    data.forEach(entry => {
      totalRegistered += parseInt(entry.v6);
      totalParticipants += parseInt(entry.v8);
      validVotes += parseInt(entry.v10_2);
      invalidVotes += parseInt(entry.v11_2);
    });

    const turnout = totalParticipants && totalRegistered
      ? ((totalParticipants / totalRegistered) * 100).toFixed(2)
      : "0.00";

    animateCount("registeredVoters", totalRegistered);
    animateCount("participants", totalParticipants);
    animateCount("validVotes", validVotes);
    animateCount("invalidVotes", invalidVotes);
    animateCount("turnoutPercentage", turnout, "%");
  } catch (err) {
    console.error("Failed to load election data:", err);
  }
}

function animateCount(id, endValue, suffix = "") {
  const el = document.getElementById(id);
  if (!el) return;

  const start = 0;
  const end = parseFloat(endValue);
  const isInt = Number.isInteger(end);
  const startTime = performance.now();

  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / COUNT_DURATION, 1);
    const value = start + (end - start) * progress;
    el.textContent = isInt ? Math.floor(value) + suffix : value.toFixed(2) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
