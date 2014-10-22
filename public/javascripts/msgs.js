var messageListData = [];

//DOM Ready
//
$(document).ready(function(){
    populateTable();
});
$('#btnAddMessage').on('click', addMessage);
$('#btnSearchMessages').on('click', searchMessage);
//
//
//Fills table
//Used to fill the left side table
function populateTable(){
    var tableContent = '';
    //Used to keep the top headers of table
    $('#messagesTable tr').not(':first').remove();

    //Pulls data from api to be able to display in table
    $.getJSON('/api/messages', function(data){
        messageListData = data;
        var i=0;
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>'+ this.message_s +'</td>';
            tableContent += '<td>'+ this.date_s + '</td>';
            tableContent += '</tr>';
        });
        $('#messagesTable tbody:last').append(tableContent);

        //Gets the number of records found and replaces results spot
        var numOfRecords = messageListData.length;
        $('#foundRecords').replaceWith("<p id='foundRecords'>Records Found:"+ numOfRecords + "</p>");
    });
}
//Used to add a new message.  Triggered by button on page.
//Sends to the API
//
function addMessage(event){
    event.preventDefault();
    //Basic Validation
    var errorCount = 0;
    $('#addMessage input').each(function(index, val){
        if($(this).val() === ''){ errorCount++;}
    });
    if(errorCount === 0){
        var dateTime = new Date();
        var dateTimeStr = dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
        var newMessage = {
            'message_s': $('#addMessage fieldset input#inputMessage').val(),
            'date_s': dateTimeStr
        };
        //Ajax call to POST message to the database then refreshes table.
        $.ajax({
            type: 'POST',
            data: newMessage,
            url: '/api/messages',
            dataType: 'JSON'
        }).done(function(response){
            if (response.message === 'New Message Created'){

                //Clears the form inputs
                $('#addMessage fieldset input').val('');

                //Repopulate table
                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        return false;
    }
}
//Used to search the solr database
function searchMessage(event){
    event.preventDefault();
    var thisResult = '';
    //Basic Validation
    var errorCount = 0;
    //Resets the table when button clicked again
    $('#resultsTable tr').not(':first').remove();
    $('#numOfResults p').remove();
    $('#searchMessage input').each(function(index, val){
        if($(this).val() === ''){ errorCount++;}
    });
    //As long as no errors begin to search solr
    if(errorCount === 0){
        //Gets the value that was put into text box
        var newMessage =  $('#searchMessage input#searchMessage').val();
        //This is the URL of the solr database
        var resultUrl = 'http://172.16.7.237:8080/solr/collection1/query?q=message_s:*'+newMessage+'*&fl=message_s, date_s&wt=json&json.wrf=?&rows=1000';
        //Gets the data from the searched value and creates the tablecontent
        $.getJSON(resultUrl, function(result){
            var Parent = document.getElementById('resultsTable');
            //var thisResult = 'Results found:' + result.response.numFound + '<br/>';
            for (var i=0; i < result.response.docs.length; i++){
                thisResult += '<tr>';
                thisResult += '<td>' + result.response.docs[i].message_s + '</td>';
                thisResult += '<td>' + result.response.docs[i].date_s + '</td>';
                thisResult += '</tr>';
            }
            $('#resultsTable tbody:last').append(thisResult);
            //Shows num of results from database
            $('#numOfResults').append('<p>Results found: '+result.response.numFound.toString()+'</p>');
        });

    }
    else {
        return false;
    }
}
