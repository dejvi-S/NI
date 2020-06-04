$('.carousel').carousel({
  interval: 100
})

function zapiszZamowienie() {

    var zamowienie = {};

    zamowienie.imie = document.getElementById('imie').value;
    zamowienie.nazwisko = document.getElementById('nazwisko').value;
    zamowienie.email = document.getElementById('email').value;
    zamowienie.adres = document.getElementById('adres').value;
    zamowienie.dom = document.getElementById('dom').value;
    zamowienie.kod = document.getElementById('kod').value;
    zamowienie.tel = document.getElementById('numerTel').value;
    zamowienie.seo = document.getElementById('seo').checked;
    zamowienie.analityka = document.getElementById('analityka').checked;
    zamowienie.www = document.getElementById('strona').value;


    if (walidacjaFormularza('')) {
      
      var lista = JSON.parse(localStorage.getItem('lista'));
      if (lista == null) 
        lista = [];

      lista.push(zamowienie);
      localStorage.setItem('lista', JSON.stringify(lista));
      console.log(zamowienie);
      pokazZamowienia();
    }
}

function walidacjaFormularza(str) {

    return (document.getElementById(str + 'imie').checkValidity() && 
            document.getElementById(str + 'nazwisko').checkValidity() && 
            document.getElementById(str + 'email').checkValidity() && 
            document.getElementById(str + 'adres').checkValidity() &&
            document.getElementById(str + 'dom').checkValidity() &&
            document.getElementById(str + 'kod').checkValidity() &&
            document.getElementById(str + 'numerTel').checkValidity());
}
function sendMessage() { 
  if(valid("")) {
    alert("Wysłano wiadomość!");
  }
}

function valid(str) {  
  return (document.getElementById(str + 'imiek').checkValidity() && 
            document.getElementById(str + 'nazwiskok').checkValidity() && 
            document.getElementById(str + 'emailk').checkValidity() && 
            document.getElementById(str + 'numerTelk').checkValidity());
}

function pokazZamowienia() {

  var lista = JSON.parse(localStorage.getItem('lista'));
  var element = document.getElementById("kontenerZakupow");
  var str = "";

  if (lista == null) 
      element.innerHTML = str + "<h2>Lista jest pusta!</h2>";
  else {
      for (i=0; i<lista.length; i++) {
        str += "<div class='koszykItem'><h4>Zamówienie nr>" + (i+1) + "</h4>" +
        "<div class='koszykGroup'><p>Imię: " + lista[i].imie + "</p><br>" +
        "<p>Nazwisko: " + lista[i].nazwisko + "</p><br>" +
        "<p>Adres email: " + lista[i].email + "</p><br>" +
        "<p>Adres: " + lista[i].adres + "</p><br>" +
        "<p>Numer domu: " + lista[i].dom + "</p><br>" +
        "<p>Kod pocztowy: " + lista[i].kod + "</p><br>" +
        "<p>Numer telefonu: " + lista[i].tel + "</p><br>" +
        "<p>Strona www: " + lista[i].www + "</p><br>" +
        "<p>Seo: " + lista[i].seo + "</p><br>" +
        "<p>Analityka: " + lista[i].analityka + "</p><br></div>" +
        "<button class='przycisk-formularz' onclick='edytujZamowienie("+i+")'>Edytuj zamówienie</button>" +
        "<button class='przycisk-formularz' onclick='usunZamowienie("+i+")'>Usuń zamówienie</button></div>";
      }
      element.innerHTML = str;
  }
}

function edytujZamowienie(i) {

    var lista = JSON.parse(localStorage.getItem('lista'));
    document.getElementById('imie').value = lista[i].imie;
    document.getElementById('nazwisko').value = lista[i].nazwisko;
    document.getElementById('email').value = lista[i].email;
    document.getElementById('adres').value = lista[i].adres;
    document.getElementById('dom').value = lista[i].dom;
    document.getElementById('kod').value = lista[i].kod;
    document.getElementById('numerTel').value = lista[i].tel;
    document.getElementById('strona').value = lista[i].www;
    if( lista[i].seo == "on") {
      document.getElementById('seo').checked = true;
    }
    else {
      document.getElementById('seo').checked = false;
    }
    if( lista[i].analityka == "on") {
      document.getElementById('analityka').checked = true;
    }
    else {
      document.getElementById('analityka').checked = false;
    }
    sessionStorage.setItem('zmienZamowienie', i);
    pokazZamowienia();
    document.getElementById('przyciskZmienione').style.display = "block";
    document.getElementById('przyciskGlowny').style.display = "none";
}

function zapiszZmienioneZamowienie() {
    
    var index = sessionStorage.getItem('zmienZamowienie');
    var lista = JSON.parse(localStorage.getItem('lista'));
    var element = lista[index];

    element.imie = document.getElementById('imie').value;
    element.nazwisko = document.getElementById('nazwisko').value;
    element.email = document.getElementById('email').value;
    element.adres = document.getElementById('adres').value;
    element.dom = document.getElementById('dom').value;
    element.kod = document.getElementById('kod').value;
    element.tel = document.getElementById('numerTel').value;
    element.seo = document.getElementById('seo').value;
    element.analityka = document.getElementById('analityka').value;
    element.www = document.getElementById('strona').value


    if (walidacjaFormularza('')) {
      localStorage.setItem('lista', JSON.stringify(lista));
      sessionStorage.removeItem('zmienZamowienie');
      pokazZamowienia();
      document.getElementById('przyciskZmienione').style.display = "none";
      document.getElementById('przyciskGlowny').style.display = "block";
    } 
}

function usunZamowienie(i) {

    var lista = JSON.parse(localStorage.getItem('lista'));

    if (confirm("Usunąć zamówienie?"))
      lista.splice(i,1);
    localStorage.setItem('lista', JSON.stringify(lista));
    if( lista.length === 0 ) {
      localStorage.removeItem('lista');
      sessionStorage.removeItem('zmienZamowienie');
    }

    pokazZamowienia();
}