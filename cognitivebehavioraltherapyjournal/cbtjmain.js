angular.module('myApp', [/*'smart-table'*/])
    .controller('mainCtrl', ['$scope',
        function ($scope) {
          // $scope.rowCollection = [
          //     {Date: new Date(), AutomaticNegativeThoughts: 'abc', CognitiveDistorion: 'Emotional Reasoning', Response: '123'},
          //     {Date: new Date(), AutomaticNegativeThoughts: 'xyz', CognitiveDistorion: 'Shoulds', Response: '456'},
          //     {Date: new Date(), AutomaticNegativeThoughts: 'ijk', CognitiveDistorion: 'MindReading', Response: '789'}
          // ];
          console.log("IDK, Something");
        }
    ]);
// document.getElementById("addEntry").addEventListener("click", function(){
// 	var JournalEntry = {
// 		Date: new Date(),
// 		AutomaticNegativeThoughts: document.getElementById("ANTData").value,
// 		CognitiveDistorion: document.getElementById("CDSelection").selectedIndex,
// 		Response: document.getElementById("ResponseData").value
// 	};
// });


//addEntryBtn.addEventListener("click", addJournalEntry);
addJournalEntry = function(){
	var JournalEntry = {
		Date: new Date(),
		AutomaticNegativeThoughts: document.getElementById("ANTData").value,
		CognitiveDistorion: document.getElementById("CDSelection").selectedIndex,
		Response: document.getElementById("ResponseData").value
	};

	let id = `Journal-${Math.random()}`
	localStorage.setItem(id, simpleStringify(JournalEntry));
	console.log(localStorage)
}
function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
}

window.onload = function(){
	document.getElementById("addEntry").addEventListener("click", addJournalEntry);
}

setUpTable = function(){
	var table = document.getElementById("entryLog");
	for(i=1; i<localStorage.length(); i++){

	}
}
// document.getElementById("addEntry").addEventListener("click", addJournalEntry());