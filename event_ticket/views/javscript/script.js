function informInfo() {
    var name_txt_element = document.getElementById('name_txt').value;
    console.log(name_txt_element);
}
function printNow() {
    bootbox.alert("500: YOU CAN NOT DELETE THIS PRODUCT");
}

$("#button_jquery").click(function () {
    //we have to move into the the end of page because it does by DOM.
    var name_txt = $("#name_txt").val();
    alert(name_txt);
    console.log(name_txt);
});
// var socket = io();
// socket.emit(
//             'client_initialized',
//             'abc'
//         );