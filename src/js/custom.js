
var $;
responsiveTable('.table');
$( window ).resize(function() {
    responsiveTable('.table');
});

function selectProduct($event) {
    $('.products .selected').removeClass("selected");
    $($event.target).closest('.product').addClass('selected');
}

function selectPayMethod($event) {
    $('.pay-methods .selected').removeClass("selected");
    $($event.target).closest('.payment').addClass('selected');
}

function responsiveTable(selector) {

    var screenWidth = $( window ).width();
    var table = $(selector);
    if (screenWidth > 500) {
        return;
    }

    var emptyTableHTML = '<div class="empty"><span>您还没有充值记录</span></div>';
    var resultHTML = '';
    var header = table.find('.table-header');
    var fields = header.find('div');
    var fieldNames = [];
    for(var i=0; i<fields.length; i++) {
        console.log($(fields[i]).attr("data-fieldname"));
        console.log($(fields[i]).text());
        fieldNames.push(
            {
                name: $(fields[i]).attr("data-fieldname"),
                label: $(fields[i]).text()
            }
        )
    }
    var records = table.find('.rec');
    var singleRecordHTML;
    for (var j=0; j< records.length; j++) {
        var recFields = $(records[j]).find('div');
        if (j === records.length - 1) {
            singleRecordHTML = '<div class="rec-row" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">';
        } else {
            singleRecordHTML = '<div class="rec-row" style="border-bottom: 1px solid #fff; margin-bottom: 15px; padding-bottom: 15px;">';
        }

        for(var k=0; k<fields.length; k++) {
            if (k === fields.length - 1) {
                singleRecordHTML +='<div class="field-row" style="margin-bottom: 0;">' + '<div class="label">' + fieldNames[k].label + '</div>' + '<div>'+  $(recFields[k]).text() + '</div>' + '</div>';
            } else {
                singleRecordHTML +='<div class="field-row">' + '<div class="label">' + fieldNames[k].label + '</div>' + '<div>'+  $(recFields[k]).text() + '</div>' + '</div>';
            }
        }
        singleRecordHTML += '</div>';
        resultHTML += singleRecordHTML;
    }
    if (records.length === 0) {
        resultHTML =  emptyTableHTML;
    }
    resultHTML = '<div class="table-content">' + resultHTML + '</div>';
    //console.log(resultHTML);

    table.html(resultHTML);
}