var pipe = new Vue({
	el: "#wrapper",
	data: {
		pipe1: 100,
		pipe2: 30,
	},
	computed: {
		borderStyle: function(){
			if(this.pipe1 > this.pipe2){
				// return this.pipe1+"px 0px 0px 0px solid lightskyblue";
				return {borderTop: this.pipe1+"px solid lightskyblue",}
								// borderBottom: "0px"};
			}
			else {
				return {borderTop: this.pipe2+"px solid lightskyblue",
								borderLeft: "100px solid transparent",
								borderRight: "0px"};
			}
		}
	}
});