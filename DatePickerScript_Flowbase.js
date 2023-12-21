var mindate = new Date();
mindate.setDate(mindate.getDate() - 8);
var maxdate = new Date();
maxdate.setDate(maxdate.getDate() - 1);
$('.date-picker').datepicker({
    language: 'en',
    range : true,
    minDate : mindate,
    maxDate : maxdate,
    multipleDates: true,
    multipleDatesSeparator: " - "
})