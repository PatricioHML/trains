$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyBQSlpe0I37NLVZtrRbQiLRcUMSHi1EMes",
        authDomain: "trainw-de2dd.firebaseapp.com",
        databaseURL: "https://trainw-de2dd.firebaseio.com",
        projectId: "trainw-de2dd",
        storageBucket: "trainw-de2dd.appspot.com",
        messagingSenderId: "561176276848"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // 2. Button for adding Employees
    $(".boton").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var tName = $("#name").val().trim();
        var tDest = $("#destination").val().trim();
        var tFirst = moment($("#first").val().trim(), "DD/MM/YY").format("X");
        var tFreq = $("#frequency").val().trim();

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: tName,
            destination: tDest,
            first: tFirst,
            frequency: tFreq
        };

        // Uploads employee data to the database
        database.ref("/Trains").push(newTrain);

        // Logs everything to console
        console.log(tName.name);
        console.log(tDest.destination);
        console.log(tFirst.first);
        console.log(tFreq.frequency);

        // Alert
        alert("Employee successfully added");

        // Clears all of the text-boxes
        $("#name").val("");
        $("#destination").val("");
        $("#first").val("");
        $("#frequency").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref("/Trains").on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var tName = childSnapshot.val().name;
        var tDest = childSnapshot.val().destination;
        var tFirst = childSnapshot.val().first;
        var tFreq = childSnapshot.val().frequency;

        // Employee Info
        console.log(tName);
        console.log(tDest);
        console.log(tFirst);
        console.log(tFreq);

        // Prettify the employee start
        var trainStartPretty = moment.unix(tFirst).format("MM/DD/YY");

        // Calculate the months worked using hardcore math
        // To calculate the months worked
        var trainMonths = moment().diff(moment(tFirst, "X"), "months");
        console.log(trainMonths);

        // Calculate the total billed rate
       

        // Add each train's data into the table
        $(".trainsTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" +
            trainStartPretty + "</td><td>" + trainMonths + "</td><td>" + tFirst + "</td><td>" + tFreq + "</td></tr>");
    });

    // Example Time Math
    // -----------------------------------------------------------------------------
    // Assume Employee start date of January 1, 2015
    // Assume current date is March 1, 2016

    // We know that this is 15 months.
    // Now we will create code in moment.js to confirm that any attempt we use meets this test case

});