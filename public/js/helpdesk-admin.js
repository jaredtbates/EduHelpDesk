$(function() {
    $('#request-table').dataTable({
        columnDefs: [
            { "targets": 0, "searchable": false },
            { "targets": 2, "searchable": false },
            { "targets": 3, "searchable": false },
            { "targets": 5, "searchable": false },
            { "targets": 6, "searchable": false },
            { "targets": 7, "searchable": false },
            { "targets": 8, "searchable": false },
            { "targets": 9, "searchable": false, "orderable": false }
        ],
        order: [[0, "desc"]],
        pageLength: 100,
        fixedHeader: true
    });
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