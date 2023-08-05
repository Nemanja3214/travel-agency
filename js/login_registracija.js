let firebaseURLKorisnici = "https://web-projekat-af075-default-rtdb.europe-west1.firebasedatabase.app/korisnici.json";
console.clear();

document.getElementById("registracijaDugme").addEventListener("click", function(e) {
    e.preventDefault;
    if (validanKorisnik("Registracija") != null) {
        // document.getElementById("registracijaModal").classList.remove("show");
        document.getElementById("zatvaranjeDugmeRegistracija").click();
        alert("Uspesna registracija");
    }
});

document.getElementById("prijavaDugme").addEventListener("click", function(e) {
    e.preventDefault;
    if (validnoKorisnickoLozinka("Prijava") != null) {
        // document.getElementById("registracijaModal").classList.remove("show");



        let zahtev = new XMLHttpRequest();

        zahtev.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {

                    let korisnici = JSON.parse(this.responseText);
                    let nadjen = false;
                    let korisnickoIme = document.getElementById("korisnickoImeKorisnikaPrijava").value;
                    let lozinka = document.getElementById("lozinkaKorisnikaPrijava").value;

                    // console.log(korisnici);
                    for (korisnikId in korisnici) {
                        if (korisnici[korisnikId].username === korisnickoIme && korisnici[korisnikId].lozinka === lozinka) {
                            nadjen = true;
                            break;
                        }
                    }
                    if (nadjen) {
                        document.getElementById("zatvaranjeDugmePrijava").click();
                        alert("Uspesna prijava");
                    } else {
                        alert("Pogrešni kredidencijali");
                    }
                } else {
                    alert("Došlo je do greške");
                }
            }
        }

        zahtev.open("GET", firebaseURLKorisnici);
        zahtev.send();



    }
});


function validnoKorisnickoLozinka(formaEkstenzija) {
    let prijava = Object();

    let username = document.getElementById("korisnickoImeKorisnika".concat(formaEkstenzija)).value;
    if (username != "") {
        prijava.username = username;
    } else {
        alert("Unesite ispravno korisničko ime.");
        return null;
    }
    let lozinka = document.getElementById("lozinkaKorisnika".concat(formaEkstenzija)).value;
    // console.log(lozinka);
    if (lozinka != "") {
        prijava.lozinka = lozinka;
    } else {
        alert("Unesite ispravnu lozinku.");
        return null;
    }
    return prijava;
}

function validanKorisnik(formaEkstenzija) {
    let korisnik = Object();
    let obrazac;

    let username = document.getElementById("korisnickoImeKorisnika".concat(formaEkstenzija)).value;
    if (username != "") {
        korisnik.username = username;
    } else {
        alert("Unesite ispravno korisničko ime.");
        return null;
    }

    let lozinka = document.getElementById("lozinkaKorisnika".concat(formaEkstenzija)).value;
    // console.log(lozinka);
    if (lozinka != "") {
        korisnik.lozinka = lozinka;
    } else {
        alert("Unesite ispravnu lozinku.");
        return null;
    }

    obrazac = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let email = document.getElementById("emailKorisnika".concat(formaEkstenzija)).value.trim();
    // console.log(email);
    if (email != "" && obrazac.test(email)) {
        korisnik.email = email;
    } else {
        alert("Unesite ispravan email.");
        return null;
    }

    let ime = document.getElementById("imeKorisnika".concat(formaEkstenzija)).value.trim();
    if (ime != "") {
        korisnik.ime = ime;
    } else {
        alert("Unesite ispravno ime.");
        return null;
    }

    let prezime = document.getElementById("prezimeKorisnika".concat(formaEkstenzija)).value.trim();
    if (prezime != "") {
        korisnik.prezime = prezime;
    } else {
        alert("Unesite ispravno prezime.");
        return null;
    }

    let datumRodjenja = document.getElementById("datumRodjenjaKorisnika".concat(formaEkstenzija)).value;
    let datum = new Date(datumRodjenja);
    let sada = new Date();
    if (datumRodjenja != "" && datum < sada) {
        korisnik.datumRodjenja = datumRodjenja;
    } else {
        alert("Unesite ispravan datum rodjenja.");
        return null;
    }

    let adresa = document.getElementById("adresaKorisnika".concat(formaEkstenzija)).value;
    if (adresa != "") {
        korisnik.adresa = adresa;
    } else {
        alert("Unesite ispravnu adresu.");
        return null;
    }

    let telefon = document.getElementById("brojTelefonaKorisnika".concat(formaEkstenzija)).value;
    if (telefon != "" && !isNaN(telefon)) {
        korisnik.telefon = telefon;
    } else {
        alert("Unesite ispravno telefon.");
        return null;
    }

    let slika = document.getElementById("slikaKorisnikaFajl".concat(formaEkstenzija)).value;

    let ekstenzija = slika.split(".").pop();
    if (slika != "" && ["jpg", "jpeg", "png"].some(element => element === ekstenzija)) {
        korisnik.slika = slika;
    } else {
        alert("Unesite ispravnu sliku.");
        return null;
    }
    // console.log(korisnik);
    return korisnik;
}