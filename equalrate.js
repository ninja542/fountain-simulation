new Vue({
	el: "#wrapper",
	data: {
		pipe1: 100,
		pipe2: 30,
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
		varPressure: function(){
			return this.initialPressure +
				(0.5 * this.density * Math.pow(this.initialVel, 2)/1000) -
				(0.5 * this.density * Math.pow((Math.pow(this.pipe1, 2)/Math.pow(this.connectionHeight, 2))*this.initialVel, 2)/1000);
		},
		connectionHeight: function(){
			if (this.pipe1 <= this.pipe2){
				if (this.positionX<=(((this.pipe1*100)/this.pipe2)+392)){
					return this.pipe1;
				}
				else if (this.positionX<=492){
					return (this.positionX-392)*(this.pipe2/100);
				}
				else {
					return this.pipe2;
				}
			}
			else {
				if (this.positionX<=(492-5)){
					return this.pipe1;
				}
				else if (this.positionX<=(587-((this.pipe2*100)/this.pipe1))){
					return this.pipe1-(this.positionX-487)*(this.pipe1/100);
				}
				else {
					return this.pipe2;
				}
			}
		}
	}
});