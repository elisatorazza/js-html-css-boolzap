$(document).ready(function() {

$(".send").click(
  function() {
    sendMessage();


  }
);

function sendMessage(){
  //clono il p in cui è contenuto il messaggio//
  var inputValue = $(".writing-text").val();

  if (inputValue.length != "") { //Se il valore contenuto nell'input è diverso da 0
    var newText = $(".templates .chat-wrapper").clone(); //Prendo il chat-wrapper contenuto in template e lo clono (adesso è vuoto)
    newText.find(".message-text p").text(inputValue); //Seleziono il punto esatto in cui andare ad inserire l'elemento salvato
    console.log(newText);
    newText.find(".message-time p").text("11:30"); //Qua invece inseriamo l'orario
    newText.addClass("sent"); //Aggiugno la classe sent per visualizzarlo a dx con sfondo dx
    $(".single-chat").append(newText);
    inputValue.val("");
  }
}





});
