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
   


    $(".boton").on("click", function (event) {
        event.preventDefault();

        var tName = $("#name").val().trim();
        var tDest = $("#destination").val().trim();
        var tFirst = moment($("#first").val().trim(), "DD/MM/YY").format("X");
        var tFreq = $("#frequency").val().trim();
        var tNext = moment().add(tFreq, "minutes");
       
    
        

        var newTrain = {
            name: tName,
            destination: tDest,
            first: tFirst,
            frequency: tFreq,
        };

        database.ref("/Trains").push(newTrain);

        console.log(tName.name);
        console.log(tDest.destination);
        console.log(tFirst.first);
        console.log(tFreq.frequency);


        $("#name").val("");
        $("#destination").val("");
        $("#first").val("");
        $("#frequency").val("");
    });

    database.ref("/Trains").on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var tName = childSnapshot.val().name;
        var tDest = childSnapshot.val().destination;
        var tFirst = childSnapshot.val().first;
        var tFreq = childSnapshot.val().frequency;
        var tNext = childSnapshot.val().next;

        console.log(tName);
        console.log(tDest);
        console.log("first" + tFirst);
        console.log("freq" + tFreq);
        console.log("next" + tNext);


        var trainStartPretty = moment.unix(tFirst).format("MM/DD/YY");

        

       

        $(".trainsTable > tbody").append("<tr><td><hr>" + tName + "</td><td><hr>" + tDest + "</td><td><hr>" +
            tFreq + "</td><td><hr>" + tNext + "</td><td><hr>" + tFreq + " minutes away" + "</td><td><hr>" );
    });

    

});