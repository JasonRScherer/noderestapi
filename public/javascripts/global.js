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

function populateTable(){
    var tableContent = '';
    $('#messagesTable tr').not(':first').remove();
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
    });
};

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
        }
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
};
function searchMessage(event){
    event.preventDefault();
    //Basic Validation
    var errorCount = 0;
    $('#Results').empty();
    $('#searchMessage input').each(function(index, val){
        if($(this).val() === ''){ errorCount++;}
    });
    if(errorCount === 0){
        var newMessage =  $('#searchMessage fieldset input#searchMessage').val()
        var resultUrl = 'http://172.16.7.237:8080/solr/collection1/query?q=message_s:*'+newMessage+'*&fl=message_s, date_s&wt=json&json.wrf=?&rows=1000';
        $.getJSON(resultUrl, function(result){
            var Parent = document.getElementById('resultsTable');
            var thisResult = 'Results found:' + result.response.numFound + '<br/>';
            alert(result.response.docs.length);
            for (var i=0; i < result.response.docs.length; i++){
                thisResult += '<tr><td>'+result.response.docs[i].message_s + '</td><td>' +result.response.docs[i].date_s+ '</td></tr><br/>';
                var NewDiv = document.createElement("DIV");
                NewDiv.innerHTML = thisResult;
            }
            Parent.appendChild(NewDiv);
        });

    }
    else {
        return false;
    }
};

