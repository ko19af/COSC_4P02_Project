const list = JSON.parse(sessionStorage.getItem("group"));// get list info from session storage

function submitInfo(form) {// collect information from form and store to associated tiles (THIS NEEDS WORK !!!!!)
	var value = document.getElementsByName('wing');// create array holding radio buttons
	var wing;// create variable to hold value of selected radio button
	
	for(var radio of value){// go though all of the radio buttons
		if(radio.checked) {// if button was checked
			wing = radio.value;// collect value
			break;// exit search
		}
	}
	if (wing == null) alert("please select a wing");
	else loadInfo(form.eName.value, form.endDate.value, form.floor.value, wing);
};
	
function loadInfo(eN, eD, f, w){
	let current = list;// set current to head of list
	do {// file fields
		current.data.eName = eN;// fill exhibit name
		current.eED = eD;// fill exhibit enddate
		current.floorNum = f;// THIS NEEDS TO BE FIXED WHEN WE ARE CREATING MULTIPLE FLOORS
		current.data.location = wing;// fill wing
		current = current.next;// move to next in list
	} while(current != null);// if reached end of list exit
	//saveToMap();// load list into hashmap
};

function saveToMap() {// this function save the linked list entrys to the hashmap
	let current = list;
	let mapping = JSON.parse(sessionStorage.getItem("cMap"));// get mapping data
	do {// fill in new map data
		mapping.set(current.data.tile, current.data)// place tile info into map
		current = current.next;// move to next in lsit
	} while(current != null);// if reached end of list exit
	sessionStorage.setItem("cMap", JSON.stringify(mapping));// set new map data
	window.close();// close window
};
