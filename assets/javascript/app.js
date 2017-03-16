

// Setting variables

	var name = "";
	var destination = "";
	var firstTrain = "";
	var frequency = "";

	// Connect to Firebase

 var config = {
    apiKey: "AIzaSyA1g0V1a5UBV9CoIQH60KPPvJl6iMzgnIY",
    authDomain: "train-app-ce7f9.firebaseapp.com",
    databaseURL: "https://train-app-ce7f9.firebaseio.com",
    storageBucket: "train-app-ce7f9.appspot.com",
    messagingSenderId: "776292416726"
  };
  firebase.initializeApp(config);
var database = firebase.database();


// Get input from the DOM elements

$("#submitBtn").on("click", function(event){

	event.preventDefault();

	name = $("#name").val();
	destination = $("#destination").val().trim();;
	firstTrain = $("#firstTrain").val().trim();;
	frequency = $("#frequency").val().trim();;

	database.ref().push({
       name: name,
       destination: destination,
       firstTrain: firstTrain,
       frequency: frequency,
   });

	name = $("#name").val("");
   destination = $("#destination").val("");
   firstTrain = $("#firstTrain").val("");
   frequency = $("#frequency").val("");
});



// Pull inputs back from the server

	database.ref().on("child_added", function(mySnapshot){
 	var childSnapshot  = mySnapshot ;
 	var earlierTrain = childSnapshot.val().firstTrain;
 	console.log(earlierTrain);
	var howOften  = childSnapshot.val().frequency;
 	
 // Plug the inputs into conversion functions

	var earlierTrainConverted = moment(earlierTrain, "hh:mm").subtract(1, "years");
	console.log(earlierTrainConverted);
	var currentTime = moment();
	var diffTime = moment().diff(moment(earlierTrainConverted), "minutes");
	console.log(diffTime);
	var tRemainder = diffTime % howOften;
	var tMinutesTillTrain = howOften - tRemainder;
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	nextTrain = moment(nextTrain).format("hh:mm");

 	$("tbody").append(
 		" <tr><td> " + childSnapshot.val().name +
        " </td><td> " + childSnapshot.val().destination +
        " </td><td> " + howOften + ' Minutes' + 
        " </td><td> " + nextTrain + 
        " </td><td> " + tMinutesTillTrain + " </td></tr> "
        );



 });








// ********************************************
