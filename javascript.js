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
    })
})