$(document).ready(function () {
    $('[data-toggle="datepicker"]').datepicker({
        format: 'mm-dd-yyyy'
    });
    // Available date placeholders:
    // Year: yyyy
    // Month: mm
    // Day: dd
    
    $('[data-toggle="datepicker"]').attr('readonly', 'readonly')
});