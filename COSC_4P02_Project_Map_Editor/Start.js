function begin(form) {

	const museumMap = [];// create array to hold museum map info
	museumMap[0] = {layout: [0], fInfo: [{eName:"pre-America", location:" ",eEd: " ", floorNum: " ", tile: 0},],};// initialize layout of array
	
	sessionStorage.setItem("rFloors", JSON.stringify(form.floors.value));// set what floor we are at in the input stage
	sessionStorage.setItem(form.mName.value, JSON.stringify(museumMap));// initialize hash map to hold map data
	sessionStorage.setItem("mInfo", JSON.stringify({mName: form.mName.value, numFloors: form.floors.value,}));
	window.open('floorPlan.html');// open next page
	window.close();
};
