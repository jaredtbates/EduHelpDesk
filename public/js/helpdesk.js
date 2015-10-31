$(document).ready(function() {
    $('#priority').slider({
        id: 'priority',
        min: 1,
        max: 10,
        tooltip: 'always',
        tooltip_position: 'bottom'
    });

    $('.table').dataTable({
        "columnDefs": [
            {
                "targets": 0,
                "searchable": false
            },
            {
                "targets": 2,
                "searchable": false
            },
            {
                "targets": 3,
                "searchable": false
            },
            {
                "targets": 5,
                "searchable": false
            },
            {
                "targets": 6,
                "searchable": false
            },
            {
                "targets": 7,
                "searchable": false
            },
            {
                "targets": 8,
                "searchable": false
            },
            {
                "targets": 9,
                "searchable": false,
                "orderable": false
            }
        ],
        "order": [[0, "desc"]],
        "pageLength": 100
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
            priority: $('#priority').slider().val()
        }
    });
    $('#submitRequestForm').parent().html('<p class="text-center">Your request has been submitted.</p>');
}).keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
    }
});

$('.contact').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'PUT',
        url: '/api/v1/request/' + $(this).parent().parent().parent().parent().parent().find('th').text(),
        data: {
            contacted: true
        }
    });
    $(this).closest('tr').removeClass();
    $(this).closest('tr').addClass('warning');
    $(this).hide();
});

$('.receive').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'PUT',
        url: '/api/v1/request/' + $(this).parent().parent().parent().parent().parent().find('th').text(),
        data: {
            received: true
        }
    });
    $(this).closest('tr').removeClass();
    $(this).closest('tr').addClass('info');
    $(this).hide();
});

$('.resolve').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'PUT',
        url: '/api/v1/request/' + $(this).parent().parent().parent().parent().parent().find('th').text(),
        data: {
            resolved: true
        }
    });
    $(this).closest('tr').removeClass();
    $(this).closest('tr').addClass('success');
    $(this).hide();
});

$('.delete').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'DELETE',
        url: '/api/v1/request/' + $(this).parent().parent().parent().parent().parent().find('th').text()
    });
    $(this).closest('tr').hide();
});