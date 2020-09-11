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
  var startSearch = $("#search").val(); //Prendo il valore inserito nell'input di ricerca e lo salvo in una variabile
  $(".small-wrapper").each(function(){
    var nomeUtente = $(this).find("h4").text().toLowerCase();  //Prendo il testo contenuto nell'elemento .small-wrapper h4 e lo salvo
    if (nomeUtente.includes(startSearch)) {
      $(this).parent().show();
    } else {
      $(this).parent().hide();
    }
  });
});
// Click sul contatto mostra la conversazione del contatto cliccato, è possibile inserire nuovi messaggi per ogni conversazione



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
    $(".single-chat").append(newText);
    $(".writing-text").val("");
  }
}
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
function reply() {
  setTimeout(function(){
    var newText = $(".templates .chat-wrapper").clone();
    newText.find(".message-text p").text("Ok");
    var currentHour = getCurrentHour();
    newText.find(".message-time p").text(currentHour); //Qua invece inseriamo l'orario
    $(".single-chat").append(newText);
  }, 1000); //La funzione scatta con un ritardo di 2 secondi

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

//Funzione per associare chat a persona
$("li.person").click(function () {
  $("li.person").not(this).removeClass("grey");
  $(this).addClass("grey");
  var currentPerson = $(this).attr("data-contatto"); //Prendo l'attributo di data contatto e lo salvo in una variabile
  $(".single-chat").addClass("none"); //Aggiungo display none a
  $(".single-chat[data-conversazione = "+currentPerson+"]").removeClass("none");
  var name = $(this).find("h4").text(); //Salvo il nome dell'utente su cui ho cliccato
  $(".col-right .small-wrapper h4").text(name); //Sostituisco il nome dell'utente su cui ho cliccato
  var immagineUtente =$(this).find("img").attr("src");
  console.log(immagineUtente);
  $(".col-right img").attr("src", immagineUtente);
  });

})
