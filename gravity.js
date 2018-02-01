// P1 + rgh = P2 + rgh
// velocity is the same so only pressure changes
new Vue({
	el: "#wrapper",
	data: {
		height: 2,
		initialVel: 30,
		initialPressure: 100,
		liquid: 1000,
		positionX: 650,
	},
	computed: {
		finalVel: function(){
			return this.initialVel;
		},
		positionTop: function(){
			if (this.height < 0){
				return {top: -this.height*30};
			}
		},
		positionBottom: function(){
			if(this.height < 0){
				return {top: this.height*30-100};
			}
		},
		finalPressure: function(){
			return this.initialPressure - (this.liquid*9.8*-this.height)/1000;
		},
		varPressure: function(){
			return this.initialPressure +
				(0.5 * this.density * Math.pow(this.initialVel, 2)/1000) -
				(0.5 * this.density * Math.pow((Math.pow(this.pipe1, 2)/Math.pow(this.connectionHeight, 2))*this.initialVel, 2)/1000);
		},
		connectionHeight: function(){
			if (this.positionX > 492 && this.positionX < 592){
				return 100;
			}
			else {
				return 100;
			}
		}
	}
});