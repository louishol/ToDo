
var db;

$(document).ready(function()
{
    document.addEventListener('deviceready', onDeviceReady, false);
    alert("document ready");
    onDeviceReady();
});


function onDeviceReady(){
    alert("Device ready");
    initializeDatabase();
}


function btnSubmitClicked(){

    alert("Klik");
    var name = $('#txtName').val();
    var description = $('#txtDescription').val();
    var time = $('#txtTime').val();


    alert("Dit is de naam"  + name);
    addToDo(name, description, time);
    $('#txtName').val('');
    $('#txtDescription').val('');
    $('#txtTime').val('');
}


function initializeDatabase() {
    db = window.openDatabase("Database", "1.0", "Demo", 2 * 1024 * 1024);
    db.transaction(function(trans)
    { 
        trans.executeSql('CREATE TABLE IF NOT EXISTS ToDo (name, description, time)');

        //addToDo("Android maken", "Fragmenten voor android maken", "2uur");
        getAllToDos(trans);
    }, errorCB);
}

function errorCB(err) {
    alert("Error processing SQL: " + err.message);
    return true;
}

function getAllToDos(trans) {
    trans.executeSql('SELECT * FROM ToDo', [], function(trans, results){
        var len = results.rows.length;
        alert(len);

        for(var i =0; i<len; i++)
        {
            alert(results.rows.item(i).name);
        }
    }, errorCB);
}


// function getAllToDos(trans) {
//     trans.executeSql('SELECT * FROM ToDo', [], function(trans, results){
//         // var htmlRows = '';
//         // var len = results.rows.length;
//         // var settings = JSON.parse(localStorage.getItem("settings"));
//         // $("#todo").clear();

//         // alert("len " : len + " settings " + settings);
//         // for (var i=0; i<len; i++){
//         //     var newtodo = "Naam : " + results.rows.item(i).name;


//         //     if(settings.ShowDescription === "on")
//         //     {
//         //         newtodo += " | Beschrijving : " + results.rows.item(i).description;
//         //     }
//         //     if(settings.ShowTime === "on")
//         //     {
//         //         newtodo += "| Om " + results.rows.item(i).time;
//         //     }
//         //     $("#todo").append("<p>" + newtodo + "</p>");
//         }
//     }, errorCB);
// }


function addToDo(name, description, time){
    db.transaction(function(trans){ 
        trans.executeSql('INSERT INTO ToDo (name, description, time) VALUES (?,?,?)', [ name, description, time ]);
        alert("Ja");
    }, errorCB);
}


