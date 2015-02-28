
var db;

document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady(){
    alert("Device ready");
    initializeDatabase();
    $('#btnSubmit').click(btnSubmitClicked);
}


function btnSubmitClicked(){

    alert("Klik");
    var name = $('#txtName').val();
    var description = $('#txtDescription').val();
    var time = $('#txtTime').val();

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

        alert("table aangemaakt");
        getAllToDos(trans);

        alert("Alles opgehaald");
    }, errorCB);
}

function errorCB(err) {
    alert("Error processing SQL: " + err.message);

    return true;
}

function getAllToDos(trans) {
    trans.executeSql('SELECT * FROM ToDo', [], function(trans, results){
        var htmlRows = '';
        var len = results.rows.length;
        var settings = JSON.parse(localStorage.getItem("settings"));
        $("#todo").clear();
        for (var i=0; i<len; i++){
            var newtodo = "Naam : " + results.rows.item(i).name;
            if(settings.ShowDescription === "on")
            {
                newtodo += " | Beschrijving : " + results.rows.item(i).description;
            }
            if(settings.ShowTime === "on")
            {
                newtodo += "| Om " + results.rows.item(i).time;
            }
            $("#todo").append("<p>" + newtodo + "</p>");
        }
    }, errorCB);
}

function addToDo(name, description, time){
    db.transaction(function(trans){ 
        trans.executeSql('INSERT INTO ToDo (name, description, time) VALUES (?,?)', [ name, description, time ]);
        getAllToDos(trans);
    }, errorCB);
}


