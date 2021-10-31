function plot(distData) {
  var distance = {
    x: gen,
    y: distData,
    type: 'scatter'
  };

  var layout = {
    title: 'Best Distance',
    xaxis: {
      title: 'Generations'
    },
    yaxis: {
      title: 'Distance'
    }
  };

  // var ymin = 0;
  // var ymax = Math.max(...distData);

  var data = [distance];

  Plotly.newPlot('chart', data, layout, {
    yaxis: {
      range: [0, distData]
    }
  });
  
  
  
  // Plotly.newPlot('chart', data, layout);
}