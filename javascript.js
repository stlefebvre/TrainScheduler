$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAWzjhvlaIlAjTHT5keL9USeANBqqSsORA",
        authDomain: "trainscheduler-91abf.firebaseapp.com",
        databaseURL: "https://trainscheduler-91abf.firebaseio.com",
        projectId: "trainscheduler-91abf",
        storageBucket: "trainscheduler-91abf.appspot.com",
        messagingSenderId: "321952819994"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train").on("click", function(event) {
        event.preventDefault();

        //Variables to add new train
        var train = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#first-train-time").val().trim();
        var frequency = $("#frequency").val().trim();

        //Temporary variable to store new train information
        var newTrain = {
            train: train,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        };

        //Adds new train info to the database
        database.ref().push(newTrain);

        console.log(newTrain.train);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrainTime);
        console.log(newTrain.frequency);

        //Add each train into the table

        alert("Train added successfully.");

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");

        //Add variables below that have moment.js ~stuff~ in them as a row into the table. It will automatically run the database.ref function because it's outside of the click function
    })

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        //Storing to variables
        var newTrainName = childSnapshot.val().train;
        var newTrainDest = childSnapshot.val().destination;
        var newFirstTrainTime = childSnapshot.val().firstTrainTime;
        var newTrainFreq = childSnapshot.val().frequency;

        console.log(newTrainName);
        console.log(newTrainDest);
        console.log(newFirstTrainTime);
        console.log(newTrainFreq);

        var firstTrainTimeConverted = moment(newFirstTrainTime, "HH:mm").subtract(1, "years");
        console.log(firstTrainTimeConverted)

        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));

        //Difference between times
        var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        //Time apart (remainder)
        var tRemainder = diffTime % newTrainFreq;
        console.log(tRemainder);

        //Minute Until Train
        var minutesUntilTrain = newTrainFreq = tRemainder;
        console.log("MINUTES UNTIL NEXT TRAIN: " + minutesUntilTrain);

        //Next Train
        var nextTrain = moment().add(minutesUntilTrain, "minutes");
        console.log("NEXT ARRIVAL: " + moment(nextTrain).format("hh:mm"));
        console.log("NEXT ARRIVAL: " + nextTrain);

        $("#train-table > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newTrainDest + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesUntilTrain + "</td></tr>");

    })

})