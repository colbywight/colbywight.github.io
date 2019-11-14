let tooltip = new Tooltip();

let votePercentageChart = new PerformanceMap(tooltip);

let tileChart = new MapChart(tooltip);

let shiftChart = new SelectionChart();

let electoralVoteChart = new FundingMap(shiftChart);


// Load the data corresponding to all the election years.
// Pass this data and instances of all the charts that update on year
// selection to yearChart's constructor.
d3.csv("data/yearwiseWinner.csv").then(electionWinners => {
  console.log(electionWinners);
  let yearChart = new MainMenu(electoralVoteChart, tileChart,
                                votePercentageChart, electionWinners);
  yearChart.update();
});