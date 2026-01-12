const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("tempChart");

let chart; // will hold our graph

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {
    // Split file content by lines and convert to numbers
    const temperatures = reader.result
      .trim()
      .split("\n")
      .map(line => Number(line));

    drawGraph(temperatures);
  };

  reader.readAsText(file);
});



function drawGraph(data) {
  // Remove old chart if exists
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(canvas, {
    type: "line",
    data: {
      labels: data.map((_, index) => index + 1),
      datasets: [{
        label: "Temperature (°C)",
        data: data,
        borderColor: "red",
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          title: {
            display: true,
            text: "Temperature"
          }
        },
        x: {
          title: {
            display: true,
            text: "Measurement number"
          }
        }
      }
    }
  });
}

