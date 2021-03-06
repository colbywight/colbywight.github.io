
class AttrScatterplot {
  /**
   * Constructor for the AttrScatterplot
   *
   * @param shiftChart an instance of the SelectionChart class
   */
  constructor (){
    let scatterplts = d3.select("#scatterplots").classed("content", true);
    this.selection = scatterplts;
    // this.margin = {top: 20, right: 20, bottom: 20, left: 20};
    // //Gets access to the div element created for this chart and legend element from HTML
    // let svgBounds = scatterplts.node().getBoundingClientRect();
    // this.svgWidth = svgBounds.width - this.margin.left - this.margin.right;
    // this.svgHeight = this.svgWidth;
    // this.svg = scatterplts.append("svg")
    //     .attr("width",this.svgWidth)
    //     .attr("height",this.svgHeight)

  };


  /**
   * Creates the stacked bar chart, text content and tool tips for electoral vote chart
   *
   * @param electionResult election data for the year selected
   * @param colorScale global quantile scale based on the winning margin between republicans and democrats
   */

  update (electionResult, colorScale){
    let data = [  {name: "Utah", abreviation: "UT", performance: 5, diversity: 45.99, giftedtalented: 3},
      {name: "Alabama", abreviation: "AL", performance: 10, diversity: 123.75, giftedtalented: 15},
      {name: "Texas", abreviation: "TX", performance: 2, diversity: 399.50, giftedtalented: 5},
      {name: "Mississippi", abreviation: "MI", performance: 7, diversity: 250.50, giftedtalented: 10},
      {name: "Maine", abreviation: "MA", performance: 7, diversity: 250.50, giftedtalented: 10},
      {name: "Vermont", abreviation: "VM", performance: 7, diversity: 250.50, giftedtalented: 10},
      {name: "South Dakota", abreviation: "SD", performance: 7, diversity: 250.50, giftedtalented: 10},
      {name: "South Carolina", abreviation: "SC", performance: 7, diversity: 250.50, giftedtalented: 10},
      {name: "Nevada", abreviation: "NV", performance: 7, diversity: 250.50, giftedtalented: 10},
      {name: "California", abreviation: "CA", performance: 7, diversity: 250.50, giftedtalented: 10},
      {name: "Oregon", abreviation: "OR", performance: 7, diversity: 250.50, giftedtalented: 10},
    ];
    let selectedAttr = ['diversity', 'giftedtalented'];

    let svgWidth = 200;
    let svgHeight = 200;
    this.selection.selectAll('g').data(selectedAttr).enter().append('g').attr('id', (d) => 'sp' + d)
        .append('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append('g')
        .attr("id", "xAxis");


    for(let ind = 0; ind < selectedAttr.length; ind ++) {
      let svgAttr = this.selection.select('#sp' + selectedAttr[ind]).selectAll('svg');
      svgAttr
          .append('g')
          .attr("id", "yAxis");
      svgAttr.attr('transform', `scale(1, -1)`);

      let xscale = d3.scaleLinear()
          .domain([0, 1])
          .range([20, svgWidth-20]);
      let yscale = d3.scaleLinear()
          .domain([0, 1])
          .range([svgHeight-20, 20]);

      let xaxisSel = svgAttr.select('#xAxis');
      let yaxisSel = svgAttr.select('#yAxis');

      let xaxis = d3.axisBottom(xscale);
      let yaxis = d3.axisLeft(yscale);

      xaxisSel.attr('transform', `translate(5, 20) scale(1, -1)`)
          .transition()
          .duration(1000)
          .call(xaxis);
      ;
      yaxisSel.attr('transform', `translate(25, ${svgHeight}) scale(1, -1)`)
          .transition()
          .duration(1000)
          .call(yaxis);

       let points = svgAttr.append('g').attr("id", "attrbystate");
       points.selectAll('circle').data(data)
           .enter()
           .append("circle")
           .attr('cx', function(d) {
             let attr = selectedAttr[ind];
             let getAttrRange = data.map(function(a) {return a[attr]});
             let maxVal = Math.max.apply(Math,getAttrRange);
             let posRatio = d[attr]/maxVal;
             return xscale(posRatio) + 5;
           })
           .attr('cy', function(d) {
             let getAttrRange = data.map(function(a) {return a['performance']});
             let maxVal = Math.max.apply(Math,getAttrRange);
             let posRatio = d['performance']/maxVal;
             return yscale(posRatio) + 30;
           })
           .attr('r', 5)
           .style('fill', function(d) {
             if(d.name == 'Utah')
               return 'blue'
             return 'black'
           })


    }

  };

  
}
