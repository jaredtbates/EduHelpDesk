$(function() {
    var requests = [];

    var table = $('#request-table').dataTable({
        columns: [
            { data: 'id', title: 'ID', searchable: false },
            { data: 'studentName', title: 'Name' },
            { data: 'problem', title: 'Request', searchable: false },
            { data: 'classPeriod', title: 'Period', searchable: false },
            { data: 'computerId', title: 'Computer ID', searchable: false },
            { data: 'currentTeacher', title: 'Current Teacher', searchable: false },
            { data: 'nextTeacher', title: 'Next Teacher', searchable: false },
            { data: 'priority', title: 'Priority', searchable: false },
            { data: 'createdAt', title: 'Time', searchable: false,
                render: function(data, type, row, meta) {
                    var date = new Date(data);
                    return (date.getMonth() + 1) + '/' +
                        date.getDate() + '/' +
                        date.getFullYear().toString().substring(2) + ' '
                        + ((date.getHours() + 24) % 12 || 12) + ':'
                        + ('0' + date.getMinutes()).slice(-2)
                        + ((date.getHours() >= 12) ? "PM" : "AM");
                }
            },
            { searchable: false, orderable: false,
                render: function(data, type, row, meta) {
                    var dropdown = '<div class="dropdown"> \
                    <button class="btn btn-default" id="optionsDropdown" data-toggle="dropdown"> \
                    <span class="glyphicon glyphicon-cog"></span> Options <span class="caret"></span> \
                    </button> \
                    <ul class="dropdown-menu">';

                    if (!row.contacted && !row.received && !row.resolved) {
                        dropdown += '<li><a href="#" class="contact"><span class="glyphicon glyphicon-phone-alt" aria-hidden="true"></span> Mark as Attempted Contact</a></li>';
                    }

                    if (!row.resolved && !row.received) {
                        dropdown += '<li><a href="#" class="receive"><span class="glyphicon glyphicon-inbox" aria-hidden="true"></span> Mark as Received</a></li>'
                    }

                    if (!row.resolved) {
                        dropdown += '<li><a href="#" class="resolve"><span class="glyphicon glyphicon-check" aria-hidden="true"></span> Mark as Resolved</a></li><li class="divider"></li>'
                    }

                    dropdown += '<li><a href="#" class="delete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</a></li></ul></div>'

                    return dropdown;
                }
            }
        ],
        order: [[0, 'desc']],
        pageLength: 100,
        rowId: 'id',
        fixedHeader: true,
        ajax: function(data, callback, settings) {
            $.ajax({
                type: 'GET',
                url: '/api/v1/request',
                success: function(ajaxData) {
                    requests = ajaxData;
                    callback(ajaxData);
                    requests.data.map(function(request) {
                        var requestRow = $('tr#' + request.id);
                        if (request.resolved) {
                            requestRow.addClass('success');
                        } else if (request.received) {
                            requestRow.addClass('info');
                        } else if (request.contacted) {
                            requestRow.addClass('warning');
                        }
                    });
                }
            });
        }
    });
});

$('body').on('click', '.contact', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'PUT',
        url: '/api/v1/request/' + $(this).closest('tr').attr('id'),
        data: {
            contacted: true
        }
    });
    $(this).closest('tr').removeClass();
    $(this).closest('tr').addClass('warning');
    $(this).hide();
}).on('click', '.receive', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'PUT',
        url: '/api/v1/request/' + $(this).closest('tr').attr('id'),
        data: {
            received: true
        }
    });
    $(this).closest('tr').removeClass();
    $(this).closest('tr').addClass('info');
    $(this).hide();
}).on('click', '.resolve', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'PUT',
        url: '/api/v1/request/' + $(this).closest('tr').attr('id'),
        data: {
            resolved: true
        }
    });
    $(this).closest('tr').removeClass();
    $(this).closest('tr').addClass('success');
    $(this).hide();
}).on('click', '.delete', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'DELETE',
        url: '/api/v1/request/' + $(this).closest('tr').attr('id')
    });
    $(this).closest('tr').hide();
});