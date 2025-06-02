let chartInstance = null;

export function drawUsageChart(labels, data, maxVal) {
  const ctx = document.getElementById('usageChart').getContext('2d');
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '使用量',
        data: data,
        backgroundColor: 'rgba(54,162,235,0.6)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: maxVal * 1.2
        }
      }
    }
  });
}
