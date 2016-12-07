$(function() {
    $('#priority').slider({
        id: 'priority',
        min: 1,
        max: 10,
        tooltip: 'always',
        tooltip_position: 'bottom'
    });
});

$('#submitRequestForm').on('submit', function() {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/api/v1/request',
        data: {
            studentName: $('#studentName').val(),
            problem: $('#problem').val(),
            classPeriod: $('#classPeriod').val(),
            computerId: $('#computerId').val(),
            currentTeacher: $('#currentTeacher').val(),
            nextTeacher: $('#nextTeacher').val(),
            priority: $('#priority').slider().text()
        }
    });
    $('#submitRequestForm').parent().html('<p class="text-center">Your request has been submitted.</p>');
}).keypress(event => {
    if (event.which == 13) {
        event.preventDefault();
    }
});