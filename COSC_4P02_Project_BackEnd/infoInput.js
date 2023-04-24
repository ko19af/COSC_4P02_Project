const list = JSON.parse(sessionStorage.getItem("group")).head;// get list info from session storage

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
	else loadInfo(form.eName.value, form.endDate.value, form.floor.value, form.eInfo.value, wing);
};
	
function loadInfo(eN, eD, f, eI, w){
	let current = list;// set current to head of list
	do {// file fields
		current.data.eName = eN;// fill exhibit name
		current.data.eED = eD;// fill exhibit enddate
		current.data.floorNum = f;// fill info on which floor exhibit is located on
		current.data.eInfo = eI;// fill exhibit Info
		current.data.location = w;// fill wing
		current = current.next;// move to next in list
	} while(current != null);// if reached end of list exit
	saveToMap();// load list into hashmap
};

function saveToMap() {// this function save the linked list entrys to the hashmap
	let current = list;
	let museName = JSON.parse(sessionStorage.getItem("mInfo")).mName;// get name of museum
	let museumMap = JSON.parse(sessionStorage.getItem(museName));// get mapping data
	
	if(sessionStorage.getItem("modify")) fNum = JSON.parse(sessionStorage.getItem("modify"));
	else fNum = JSON.parse(sessionStorage.getItem("rFloors"));// get floor number
	
	let infoMap = museumMap[fNum];// reterive from storage
	
	do {// fill in new map data
		infoMap.fInfo[current.data.tile] = current.data;// place tile info into map
		current = current.next;// move to next in lsit
	} while(current != null);// if reached end of list exit
	
	museumMap[fNum] = infoMap;// set floor number in museum map to updated floor map
	sessionStorage.setItem(museName,JSON.stringify(museumMap));// set new map data
	window.location = 'floorInfo.html';
	//window.open("floorInfo.html");
	//window.close();// close window
};
