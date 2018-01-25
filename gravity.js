// P1 + rgh = P2 + rgh
// velocity is the same so only pressure changes
new Vue({
	el: "#wrapper",
	data: {
		height: 2,
		initialVel: 30,
		initialPressure: 100,
		liquid: 1000,
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
	}
});