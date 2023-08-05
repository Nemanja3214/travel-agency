let firebaseURL = "https://web-projekat-af075-default-rtdb.europe-west1.firebasedatabase.app/turistickeAtrakcije/";
firebaseURL = firebaseURL.concat(preuzmiVrednostParametra("idAtrakcija").toString(), "/")
    .concat(preuzmiVrednostParametra("tura").toString(), ".json");
console.clear();
popuniPolja();

function popuniPolja() {
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let tura = JSON.parse(this.responseText);
                console.log(tura);
                document.getElementById("nazivTure").value = tura.naziv;
                document.getElementById("adresaTure").value = tura.adresaPolaska;
                document.getElementById("kratakOpisTure").value = tura.kratakOpis;
                document.getElementById("trajanjeTure").value = tura.trajanje;
                document.getElementById("tipTure").value = tura.tip;
                document.getElementById("detaljanOpisTure").value = tura.opis;
                document.getElementById("cenaTure").value = tura.cena;
                document.getElementById("maksimalBrojOsobaTure").value = tura.maxOsobe;
            } else {
                alert("Došlo je do greške");
            }
        }
    };

    zahtev.open("GET", firebaseURL);
    zahtev.send();
}


document.getElementById("izmenaTureDugme").addEventListener("click", function(e) {
    e.preventDefault();
    console.log(document.getElementById("slikaTureUnos").value);
    let tura = validacijaTure();
    if (tura != null) {
        alert("Uspešna izmena.");
        window.location.href = "../index.html";
    }
});

function validacijaTure() {
    let tura = Object();

    let naziv = document.getElementById("nazivTure").value;
    if (naziv != "") {
        tura.naziv = naziv;
    } else {
        alert("Unesite ispravan naziv.");
        return null;
    }

    let adresa = document.getElementById("adresaTure").value;
    if (adresa != "") {
        tura.adresa = adresa;
    } else {
        alert("Unesite ispravnu adresu.");
        return null;
    }

    let kratakOpis = document.getElementById("kratakOpisTure").value;
    if (kratakOpis != "") {
        tura.kratakOpis = kratakOpis;
    } else {
        alert("Unesite ispravan kratak opis.");
        return null;
    }

    let trajanje = parseInt(document.getElementById("trajanjeTure").value);
    if (!isNaN(trajanje) && trajanje > 0) {
        tura.trajanje = trajanje;
    } else {
        alert("Unesite ispravno trajanje ture.");
        return null;
    }

    let tip = document.getElementById("tipTure").value;
    if (tip != "") {
        tura.tip = tip;
    } else {
        alert("Unesite ispravan tip.");
        return null;
    }

    let detaljanOpis = document.getElementById("detaljanOpisTure").value;
    if (detaljanOpis != "") {
        tura.opis = detaljanOpis;
    } else {
        alert("Unesite ispravan detaljan opis.");
        return null;
    }

    let slika = document.getElementById("slikaTureUnos").value;
    let ekstenzija = slika.split(".").pop();

    if (slika != "" && ["jpg", "jpeg", "png"].some(element => element === ekstenzija)) {
        tura.slika = slika
    } else {
        alert("Unesite ispravnu sliku.");
        return null;
    }

    let cena = parseFloat(document.getElementById("cenaTure").value);
    if (!isNaN(cena) && cena > 0) {
        tura.cena = cena
    } else {
        alert("Unesite ispravnu cenu.");
        return null;
    }

    let maksimalBrojOsoba = parseInt(document.getElementById("maksimalBrojOsobaTure").value);
    if (!isNaN(maksimalBrojOsoba) && maksimalBrojOsoba >= 1) {
        tura.maksimalBrojOsoba = maksimalBrojOsoba
    } else {
        alert("Unesite ispravan maksimalan broj osoba.");
        return null;
    }



    return tura;
}