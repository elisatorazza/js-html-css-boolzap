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
//Rilasciando il tasto invio, il messaggio viene inviato e compare una risposta automatica dopo 1 secondo
$(".writing-text").keyup(
  function(event) {
  if (event.which == 13) {
    sendMessage();
  }
});
$(".writing-text").keyup(
  function(event) {
  if (event.which == 13) {
    reply();
  }
});
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
$("#search").keyup(function() { //Evento di premere e lasciar andare il tasto
  var startSearch = $("#search").val().toLowerCase(); //Prendo il valore inserito nell'input di ricerca e lo salvo in una variabile
  $(".small-wrapper").each(function(){
    var nomeUtente = $(this).find("h4").text().toLowerCase();  //Prendo il testo contenuto nell'elemento .small-wrapper h4 e lo salvo
    if (nomeUtente.includes(startSearch)) {
      $(this).parent().show();
    } else {
      $(this).parent().hide();
    }
  });
});

//Funzione da richiamare per l'invio di un messaggio
function sendMessage(){
  //clono il p in cui è contenuto il messaggio//
  var inputValue = $(".writing-text").val();

  if (inputValue.length != "") { //Se il valore contenuto nell'input è diverso da 0
    var newText = $(".templates .chat-wrapper").clone(); //Prendo il chat-wrapper contenuto in template e lo clono (adesso è vuoto)
    newText.find(".message-text p").text(inputValue); //Seleziono il punto esatto in cui andare ad inserire l'elemento salvato
    var currentHour = getCurrentHour();
    newText.find(".message-time p").text(currentHour); //Qua invece inseriamo l'orario
    newText.addClass("sent"); //Aggiugno la classe sent per visualizzarlo a dx con sfondo dx
    $(".single-chat.block").append(newText);
    $(".writing-text").val("");
    var scrollHeight = $(".single-chat.block").prop("scrollHeight");
    $(".single-chat.block").scrollTop(scrollHeight);
  }
}
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
function reply() {
  var textHtml = $(".profile .small-wrapper p").text();
  var replyWindow = $(".single-chat.block");
  setTimeout(function(){
    var newText = $(".templates .chat-wrapper").clone();
    var currentHour = getCurrentHour();
    newText.find(".message-text p").text("Ok");
    newText.find(".message-time p").text(currentHour); //Qua invece inseriamo l'orario
    replyWindow.append(newText);
    var scrollHeight = $(".single-chat.block").prop("scrollHeight");
    replyWindow.scrollTop(scrollHeight);
    $(".profile .small-wrapper p").text(textHtml);
  }, 1000); //La funzione scatta con un ritardo di 2 secondi
  $(".profile .small-wrapper p").text("Sta scrivendo...");
}
//Funzione in cui salviamo l'ora corrente.
function getCurrentHour () {
  var date = new Date(); // Andiamo a recuperarci la data completa (giorno e ora)
  var hours = date.getHours(); // Dalla data, andiamo a recuperarci l'ora
  var minutes = date.getMinutes(); // Dalla data, andiamo a recuperare i minuti
  if (minutes < 9 ) {
    minutes = "0" + minutes;
  }
  var time = hours + ":" + minutes; //Creiamo la variabile dei minuti, sempre a partire dalla data
  return time;
}

//Associare chat a persona e cambio immagine/nome
$("li.person").click(function () {
  $("li.person").not(this).removeClass("grey");
  $(this).addClass("grey");
  var currentPerson = $(this).attr("data-contatto"); //Prendo l'attributo di data contatto e lo salvo in una variabile
  $(".single-chat").removeClass("block"); //Aggiungo display none a
  $(".single-chat[data-conversazione = "+currentPerson+"]").addClass("block");
  var name = $(this).find("h4").text(); //Salvo il nome dell'utente su cui ho cliccato
  $(".col-right .small-wrapper h4").text(name); //Sostituisco il nome dell'utente su cui ho cliccato
  var immagineUtente =$(this).find("img").attr("src");
  $(".col-right img").attr("src", immagineUtente);
  var time = $(this).find(".time p").text();
  $(".col-right .small-wrapper p time").text(time);
});
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
$(".col-right").on("click", ".message-text i", function (){
  $(this).parent().siblings(".menu-cancel").toggleClass("none");
});
$(".col-right").on("click", ".menu-cancel .delete", function(){
  $(this).parents(".chat-wrapper").remove();
});
})
