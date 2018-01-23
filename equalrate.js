new Vue({
	el: "#wrapper",
	data: {
		pipe1: 100,
		pipe2: 30,
		density: 1000,
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
		initialVel: function(){
			return (this.pipe1);
		},
		finalVel: function(){
			return (Math.pow(this.pipe1, 2)/Math.pow(this.pipe2, 2))*this.initialVel;
		},
	}
});