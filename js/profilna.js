let firebaseURL = "https://web-projekat-af075-default-rtdb.europe-west1.firebasedatabase.app/korisnici/";
let korisnikId = preuzmiVrednostParametra("korisnikId");

console.clear();
preuzmiKorisnika();

function preuzmiKorisnika() {
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                korisnik = JSON.parse(this.responseText);
                // console.log(document.getElementById("emailKorisnika"));


                document.querySelector("#profilniPodaciKontejner img").setAttribute("src", korisnik.slika);
                kreirajRed("Korisničko ime: ", korisnik.username);
                kreirajRed("Email: ", korisnik.email);
                kreirajRed("Ime: ", korisnik.ime);
                kreirajRed("Prezime: ", korisnik.prezime);
                kreirajRed("Datum rodjenja: ", korisnik.datumRodjenja);
                kreirajRed("Adresa: ", korisnik.adresa);
                kreirajRed("Telefon: ", korisnik.telefon);
                document.querySelector("#profilniPodaciKontejner a").setAttribute("href", "izmena_korisnika.html".concat("?korisnikId=", korisnikId))
            } else {
                alert("Došlo je do greške");
            }
        }
    }

    zahtev.open("GET", firebaseURL.concat(korisnikId, ".json"));
    zahtev.send();
}
// isprobaj funkciju
function kreirajRed(tekstLabele, podatak) {
    let red = document.createElement("div");
    red.classList.add("row");

    let kontejnerLabele = document.createElement("div");
    kontejnerLabele.classList.add("col-md-3");

    podebljanTekst = document.createElement("b");
    podebljanTekst.innerText = tekstLabele;

    kontejnerLabele.appendChild(podebljanTekst);
    red.appendChild(kontejnerLabele);


    let kontejnerPodatka = document.createElement("div");
    kontejnerPodatka.classList.add("col-md-9");

    let paragraf = document.createElement("p");
    paragraf.innerText = podatak;

    kontejnerPodatka.appendChild(paragraf);
    red.appendChild(kontejnerPodatka);

    document.getElementById("profilniPodaci").appendChild(red);


}

{
    /* <div class="col-md-3">
                                <p>
                                    <b>Korisničko ime:</b>
                                </p>
                            </div> */
}