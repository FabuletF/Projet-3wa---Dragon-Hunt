"use strict"

// Fonctions nécessaires généralement
function requestInteger(message,min,max) {
	var x=parseInt(prompt(message));

	while (min>x || x>max || isNaN(x) ) 	{
		x=parseInt(prompt(message+"\n Il n'y a pas d'autres possibilités."));
	}
	return x
}

function getRandomInteger(min,max) {
	var x
	x= Math.floor(Math.random()*(max-min+1))+min
	return x;
}

function showImage(src) {
	document.getElementById('ImageDescr').innerHTML = ""
	document.getElementById('ImageDescr').innerHTML += '<img src="'+src+'">';
}
