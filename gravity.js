// P1 + rgh + 1/2*r*v^2 = P2 + rgh + 1/2*r*v^2
var pipe = new Vue({
	el: "#wrapper",
	data: {
		height: 200,
		initialVel: 30,
	},
	computed: {
		finalVel: function(){
			return this.initialVel;
		},
		positionTop: function(){
			if (this.height < 0){
				return {top: -this.height};
			}
		},
		positionBottom: function(){
			if(this.height < 0){
				return {top: this.height-100};
			}
		}
	}
});