function begin(form) {
	sessionStorage.setItem("rFloors", JSON.stringify(form.floors));// set what floor we are at in the input stage
	sessionStorage.setItem("cMap", JSON.stringify(mapping = new Map()));// initialize hash map to hold map data
	sessionStorage.setItem("mInfo", JSON.stringify({mName: form.mName.value, numFloors: form.floors.value,}));
	window.open('tile.html');// open next page
	myWindow.close();
};