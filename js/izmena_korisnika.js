let firebaseURL = "https://web-projekat-af075-default-rtdb.europe-west1.firebasedatabase.app/korisnici/";
let korisnikId = preuzmiVrednostParametra("korisnikId");

console.clear();
popuniPolja();

document.getElementById("izmenaKorisnikaDugme").addEventListener("click", function(e) {
    e.preventDefault();
    // console.log(validanKorisnik());
    let korisnik = validanKorisnik("");

    if (korisnik != null) {
        alert("Uspešna izmena podataka.");
        window.location.href = "../index.html";
    }

});

function popuniPolja() {
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let korisnik = JSON.parse(this.responseText);
                // console.log(korisnik);
                document.getElementById("korisnickoImeKorisnika").value = korisnik.username;
                document.getElementById("lozinkaKorisnika").value = korisnik.lozinka;
                document.getElementById("emailKorisnika").value = korisnik.email;
                document.getElementById("imeKorisnika").value = korisnik.ime;
                document.getElementById("prezimeKorisnika").value = korisnik.prezime;
                document.getElementById("datumRodjenjaKorisnika").value = korisnik.datumRodjenja;
                document.getElementById("adresaKorisnika").value = korisnik.adresa;
                document.getElementById("brojTelefonaKorisnika").value = korisnik.telefon;
                document.getElementById("profilnaSlika").setAttribute("src", korisnik.slika);
            } else {
                alert("Došlo je do greške");
            }
        }
    }

    zahtev.open("GET", firebaseURL.concat(korisnikId, ".json"));
    zahtev.send();
}