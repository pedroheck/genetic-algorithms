function plot(plotData) {
  var distance = {
    x: plotData[1],
    y: plotData[0],
    type: 'scatter',
    line: {
      shape: 'spline',
    },
    marker: {
      color: 'rgb(22, 179, 172)'
    }
  };

  var layout = {
    title: 'Best Distance',
    xaxis: {
      title: 'Generations'
    },
    yaxis: {
      title: 'Total Path Distance'
    }
  };

  // var ymin = 0;
  // var ymax = Math.max(...distData);

  var data = [distance];

  Plotly.newPlot('chart', data, layout);
  
  
  
  // Plotly.newPlot('chart', data, layout);
}