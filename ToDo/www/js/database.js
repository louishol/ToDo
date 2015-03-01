
var db;


$(document).ready(function()
{
    // document.addEventListener("deviceready", function(){
    //   initializeDatabase();
    //   },true);

    alert("document ready");
    initializeDatabase();
});


function btnSubmitClicked(){
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
        var htmlRows = '';
        var settings = JSON.parse(localStorage.getItem("settings"));
        for(var i =0; i<len; i++)
        {
            var name = results.rows.item(i).name;
            var description = '';
            var time = '';
            if(settings.ShowDescription === "on")
            {
                description = results.rows.item(i).description;
            }
            if(settings.ShowTime == "on")
            {
                time = results.rows.item(i).time;
            }

            htmlRows += '<tr><td>' + name + '|</td><td>' + description + '|</td><td>' + time + '</td></tr>';
        }
        $('#results tbody').html(htmlRows);
    }, errorCB);
}

function addToDo(name, description, time){
    db.transaction(function(trans){ 
        trans.executeSql('INSERT INTO ToDo (name, description, time) VALUES (?,?,?)', [ name, description, time ]);
    }, errorCB);
}
function clearTable(){
    db.transaction(function(trans){ 
        trans.executeSql('DELETE FROM ToDo');
        getAllToDos(trans);
    }, errorCB);
}


