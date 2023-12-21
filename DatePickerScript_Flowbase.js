$(document).ready(function () {
    $('[data-toggle="datepicker"]').datepicker({
        format: 'mm-dd-yyyy'
    });
    if ($(this).attr(multiple-choice)){
        console.log('multiple-choice ' + $(this).attr(multiple-choice))
    }
    else{
        console.log('multiple-choice None')
    }
    // Available date placeholders:
    // Year: yyyy
    // Month: mm
    // Day: dd
    if (window.innerWidth < 768) {
        $('[data-toggle="datepicker"]').attr('readonly', 'readonly')
    }
});