const list = JSON.parse(sessionStorage.getItem("group"));// get list info from session storage

function submitInfo(form) {// collect information from form and store to associated tiles (THIS NEEDS WORK !!!!!)
	var value = document.getElementsByName('wing');// create array holding radio buttons
	var wing;// create variable to hold value of selected radio button
	
	//for(var radio of value){// go though all of the radio buttons
		//if(radio.checked) {// if button was checked
			//wing = radio.value;// collect value
			//break;// exit search
		//}
	//}
	//if (wing == null) alert("please select a wing");
	//else alert(form.eName.value  + " " + form.endDate.value + " " + form.floor.value + " " + wing);
};
	
function loadInfo(){
	
};
