$(document).ready(function() {

$(".send").click(
  function () {
    sendMessage();
  });
$(".send").click(
  function () {
    reply();
  }
);

$(".writing-text").keyup(
  function(event) {
  if (event.which == 13) {
    sendMessage();
  }
});
//Funzione da richiamare per l'invio di un messaggio
function sendMessage(){
  //clono il p in cui è contenuto il messaggio//
  var inputValue = $(".writing-text").val();

  if (inputValue.length != "") { //Se il valore contenuto nell'input è diverso da 0
    var newText = $(".templates .chat-wrapper").clone(); //Prendo il chat-wrapper contenuto in template e lo clono (adesso è vuoto)
    newText.find(".message-text p").text(inputValue); //Seleziono il punto esatto in cui andare ad inserire l'elemento salvato
    var date = new Date(); // Andiamo a recuperarci la data completa (giorno e ora)
    var hours = date.getHours(); // Dalla data, andiamo a recuperarci l'ora
    var minutes = date.getMinutes() // Dalla data, andiamo a recuperare i minuti
    var time = hours + ":" + minutes; //Creiamo la variabile dei minuti, sempre a partire dalla data
    newText.find(".message-time p").text(time); //Qua invece inseriamo l'orario
    newText.addClass("sent"); //Aggiugno la classe sent per visualizzarlo a dx con sfondo dx
    $(".single-chat").append(newText);
    $(".writing-text").val("");
  }
}
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
function reply() {
  setTimeout(function(){
    var newText = $(".templates .chat-wrapper").clone();
    newText.find(".message-text p").text("Ok");
    var date = new Date(); // Andiamo a recuperarci la data completa (giorno e ora)
    var hours = date.getHours(); // Dalla data, andiamo a recuperarci l'ora
    var minutes = date.getMinutes(); // Dalla data, andiamo a recuperare i minuti
    var time = hours + ":" + minutes; //Creiamo la variabile dei minuti, sempre a partire dalla data
    newText.find(".message-time p").text(time); //Qua invece inseriamo l'orario
    $(".single-chat").append(newText);
  }, 1000); //La funzione scatta con un ritardo di 2 secondi

}



});
