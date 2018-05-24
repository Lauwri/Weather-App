export function fullDate(date) {
    var time = ( getDayOfWeek(date) + " " +
        ('0' + date.getDate()).slice(-2)) + "." + 
        ('0' + (date.getMonth()+1)).slice(-2) + " Klo. " + 
        ('0' + date.getHours()).slice(-2) + ":" + 
        ('0' + date.getMinutes()).slice(-2);

    return time;
}

export function onlyDate(date) {
    var time = (getDayOfWeek(date) + " " +
        ('0' + date.getDate()).slice(-2)) + "." + 
        ('0' + (date.getMonth()+1)).slice(-2)

    return time;
}

export function onlyTime(date) {
    var time = ('0' + date.getHours()).slice(-2) + ":" + 
        ('0' + date.getMinutes()).slice(-2);

    return time;
}

function getDayOfWeek(date) {
    var day = new Date(date).getDay();    
    return isNaN(day) ? null : ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'][day];
}