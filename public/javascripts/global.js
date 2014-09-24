var messageListData = [];

//DOM Ready
//
$(document).ready(function(){
    populateTable();
});
$('#btnAddMessage').on('click', addMessage);

//
//
//Fills table

function populateTable(){
    var tableContent = '';
    $.getJSON('/api/messages', function(data){
        messageListData = data;
        $.each(data, function(){

            tableContent += '<tr>';
            tableContent += '<td>'+ this.message_s +'</td>';
            tableContent += '</tr>';
        });
        $('#messageList table tbody').html(tableContent);
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
        var newMessage = {
            'message_s': $('#addMessage fieldset input#inputMessage').val(),
            'date_s': new Date()
        }
        $.ajax({
            type: 'POST',
            data: newMessage,
            url: '/api/messages',
            dataType: 'JSON'
        }).done(function(response){
            if (response.msg === ''){
                $('#addMessage fieldset input').val('');
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
