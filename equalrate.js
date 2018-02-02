var numberList = Array.from(Array(1290).keys());
var margin = { top: 5, right: 40, bottom: 20, left: 50 },
    width = 1350 - margin.left - margin.right,
    height = 225 - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xScale = d3.scaleLinear().domain([0, 1290]).range([0, 1210]);
var xAxis = d3.axisBottom(xScale);

var app = new Vue({
	el: "#wrapper",
	data: {
		pipe1: 100,
		pipe2: 75,
		density: 1000,
		positionX: 650,
		initialPressure: 100,
		initialVel: 5,
	},
	computed: {
		borderStyle: function(){
			if(this.pipe1 >= this.pipe2){
				return {borderTop: this.pipe1+"px solid lightskyblue"};
			}
			else {
				return {borderTop: this.pipe2+"px solid lightskyblue",
								borderLeft: "100px solid transparent"};
			}
		},
		finalVel: function(){
			return (Math.pow(this.pipe1, 2)/Math.pow(this.pipe2, 2))*this.initialVel;
		},
		finalPressure: function(){
			return this.varPressure(1280);
		}
	},
	watch: {
		finalVel: {
			deep: true,
			handler: function(val){
				this.update();
			}
		},
		positionX: function(){
			this.update();
		},
		finalPressure: function(){
			this.updatePressureGraph();
		}
	},
	methods: {
		varVelocity: function(x = this.positionX){
			return (Math.pow(this.pipe1, 2)/Math.pow(this.connectionHeight(x), 2))*this.initialVel;
		},
		varPressure: function(x = this.positionX){
			return this.initialPressure +
				(0.5 * this.density * Math.pow(this.initialVel, 2)/1000) -
				(0.5 * this.density * Math.pow((Math.pow(this.pipe1, 2)/Math.pow(this.connectionHeight(x), 2))*this.initialVel, 2)/1000);
		},
		connectionHeight: function(x = this.positionX){
			if (this.pipe1 <= this.pipe2){
				if (x<=(((this.pipe1*100)/this.pipe2)+392)){
					return this.pipe1;
				}
				else if (x<=492){
					return (x-392)*(this.pipe2/100);
				}
				else {
					return this.pipe2;
				}
			}
			else {
				if (x<=(492-5)){
					return this.pipe1;
				}
				else if (x<=(587-((this.pipe2*100)/this.pipe1))){
					return this.pipe1-(x-487)*(this.pipe1/100);
				}
				else {
					return this.pipe2;
				}
			}
		},
		animateWater: function(){
			anime.timeline({
				loop: true,
			})
				.add({
					targets: ".water-particle",
					easing: "linear",
					translateX: 0,
					duration: 0,
				})
				.add({
					targets: ".water-particle",
					easing: "linear",
					translateX: 492+15,
					duration: ((492+15)/this.initialVel)*1000,
				})
				.add({
					targets: ".water-particle",
					easing: "linear",
					translateX: 1275,
					duration: ((1275-492)/this.finalVel)*1000,
				});
		},
		update: function(){
			d3.select(".yaxis").call(d3.axisLeft(this.yScale()));
			var yScale = this.yScale();
			var line = d3.line()
				.x(function(d){return xScale(d);})
				.y(function(d){return yScale(app.varVelocity(d));});
			svg.select(".velocity").attr("d", line(numberList));
			d3.select(".marker").attr("cx", xScale(this.positionX)).attr("cy", yScale(this.varVelocity(app.positionX)));
			var axisline = d3.line().x(function(d){return xScale(d.x);}).y(function(d){return yScale(d.y);});
			svg.select(".velocitylines").attr("d", axisline([
				{x: 0, y: this.varVelocity(this.positionX)},
				{x: this.positionX, y: this.varVelocity(this.positionX)},
				{x: this.positionX, y: 0}]));
		},
		updatePressureGraph: function(){
			d3.select(".pressure").call(d3.axisRight(this.pressureScale())).attr("transform", "translate(" + xScale(1290) + ", " + 0 + ")");
			var pressureScale = this.pressureScale();
			var pressureline = d3.line()
				.x(function(d){return xScale(d);})
				.y(function(d){return pressureScale(app.varPressure(d));});
			d3.select(".pressuregraph").attr("d", pressureline(numberList));
		},
		yScale: function(){
			if (this.finalVel < this.initialVel) {
				return d3.scaleLinear().domain([0, this.initialVel]).range([200, 0]);
			}
			else {
				return d3.scaleLinear().domain([0, this.finalVel]).range([200, 0]);
			}
		},
		pressureScale: function(){
			if (this.initialPressure < this.varPressure(1280)){
				return d3.scaleLinear().domain([0, this.varPressure(1290)]).range([200, 0]);
			}
			else {
				return d3.scaleLinear().domain([0, this.initialPressure]).range([200, 0]);
			}
		}
	},
	mounted: function(){
		var scaleY = this.yScale();
		var yAxis = d3.axisLeft(scaleY);
		svg.append("g").call(xAxis).attr("transform", "translate(" + 0 + ", " + scaleY(0) + ")");
		svg.append("g").call(yAxis).attr("class", "yaxis");
		var pressure = this.pressureScale();
		svg.append("g").call(d3.axisRight(pressure)).attr("transform", "translate(" + xScale(1290) + ", " + 0 + ")").attr("class", "pressure");
	}
});
// Line graph for velocity in the pipe
var yScale = app.yScale();
var line = d3.line()
	.x(function(d){return xScale(d);})
	.y(function(d){return yScale(app.varVelocity(d));});
svg.append("path").attr("d", line(numberList))
	.attr("stroke", "black").attr("stroke-width", 1).attr("fill", "none").attr("class", "velocity");
// Line graph for pressure in the pipe
var pressureScale = app.pressureScale();
var pressureline = d3.line()
	.x(function(d){return xScale(d);})
	.y(function(d){return pressureScale(app.varPressure(d));});
svg.append("path").attr("d", pressureline(numberList)).attr("stroke", "green").attr("stroke-width", 1).attr("fill", "none").attr("class", "pressuregraph");
// for the marker on the graph
svg.append("circle").attr("cx", xScale(app.positionX)).attr("cy", yScale(app.varVelocity(app.positionX))).attr("fill", "lightsalmon").attr("r", 5).attr("class", "marker");
var axisline = d3.line().x(function(d){return xScale(d.x);}).y(function(d){return yScale(d.y);});
svg.append("path").attr("d", axisline([
	{x: 0, y: app.varVelocity(app.positionX)},
	{x: app.positionX, y: app.varVelocity(app.positionX)},
	{x: app.positionX, y: 0}]))
	.attr("stroke", "lightsalmon").attr("stroke-width", 1).attr("fill", "none").attr("class", "velocitylines");
// Axis labels
svg.append("text").attr("text-anchor", "middle").attr("transform", "translate("+ (-margin.left+10) +","+(height/2)+")rotate(-90)").text("velocity (m/s)");
svg.append("text").attr("text-anchor", "middle").attr("transform", "translate(" + (width) + ", " + (height/2) + ")rotate(-90)").text("pressure (kPa)");