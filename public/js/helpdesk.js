$('#submitRequestForm').on('submit', function() {
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
            priority: $('#priority').val()
        }
    });
    event.preventDefault();
    $('body').html('<br><div class="container"><div class="row col-md-4 center-block well well-sm"><p class="text-center">Your request has been submitted.</p></div></div>');
});