import Chart from 'chart.js'
import React from 'react'
import { defaults, Line } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const BarChart = (data) => {

  const plugin = {
    id: 'chart',
    beforeDraw: (chart) => {


      const ctx = chart.canvas.getContext('2d');
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'rgb(42,48,66)';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };
  /*canvas.onclick =(event)=>  {  
    beforeDraw: (chart) => {
      let canvas = document.getElementById("chart");
      let ctx = canvas.getContext("2d");
      let chart = new Chart(ctx).Line(data);
    
    var points = chart.getPointsAtEvent(event);
    alert(chart.datasets[0].points.indexOf(points[0]));
    }
  };*/
  //
  let dates = [];
  let prices = [];
  let i = 0;
  for(let item of data.data) {
    dates[i] = item.date;
    prices[i] = item.price;
    i++;
  }
  return (
    <div>
      <Line
        backgroundColor='rgb(42,48,66)'
        data={{
          labels: [...dates],
          datasets: [
            {
              label: 'Currency',
              data: [...prices],
              borderColor: '#dea74b',
              backgroundColor: 'rgba(94, 105, 44, 0.15)',
              borderWidth: 1,
              fill:true
            }
          ],
        }}
        height={400}
        width={600}
        plugins={plugin}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function(value) {
                    return "$" + value;
                  }
                },
              },
            ],
          },
        }}
      />
    </div>
  )
  
}
export default BarChart
