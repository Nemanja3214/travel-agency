let firebaseURL = "https://web-projekat-af075-default-rtdb.europe-west1.firebasedatabase.app/turistickeAtrakcije/";
firebaseURL = firebaseURL.concat(preuzmiVrednostParametra("idAtrakcija").toString(), "/")
    .concat(preuzmiVrednostParametra("tura").toString(), ".json");
console.clear();
preuzimiTuru();

document.getElementById("izbrisiTuruDugme").addEventListener("click", function() {
    document.getElementById("zatvaranjeIzbrisiTuru").click();
    alert("Uspešno ste izbrisali turu");
    window.location.href = "../index.html";
});

function preuzimiTuru() {

    console.log(firebaseURL);
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                tura = JSON.parse(this.responseText);

                document.getElementById("izmenaTuraLink").
                setAttribute("href", "../stranice/izmena_ture.html".concat(
                    "?idAtrakcija=", preuzmiVrednostParametra("idAtrakcija").toString(),
                    "&tura=", preuzmiVrednostParametra("tura").toString()));

                console.log(tura);
                let slika = document.createElement("img");
                slika.setAttribute("src", tura.slika);
                slika.setAttribute('alt', tura.naziv);
                slika.setAttribute("id", "slikaTure");
                slika.classList.add("col-12");
                document.getElementById("slikaTureKontejner").appendChild(slika);

                let tabela = document.createElement("table");
                tabela.classList.add("table", "table-hover", "table-responsive", "table-bordered", "p-0");
                document.querySelector("#podaciTure section").appendChild(tabela);

                dodajRed("Kod: ", tura.kod);
                dodajRed("Naziv: ", tura.naziv);
                dodajRed("Adresa polaska: ", tura.adresaPolaska);
                dodajRed("Kratak opis: ", tura.kratakOpis);
                dodajRed("Trajanje: ", tura.trajanje.concat("min"));
                dodajRed("Tip ture: ", tura.tip);
                dodajRed("Cena po osobi: ", tura.cena);
                dodajRed("Maksimalan broj osoba: ", tura.maxOsobe);

                let opisKontejner = document.querySelector("aside");

                let paragraf = document.createElement("p");
                paragraf.innerText = tura.opis;
                opisKontejner.prepend(paragraf);

                let naslov = document.createElement("h3");
                naslov.innerText = "Detaljan opis";
                opisKontejner.prepend(naslov);

                let ocene = tura.ocene;
                let prosecnaOcena = tura.ocena;

                // zaglavlje
                for (let i = 0; i < 5; i++) {
                    let zvezdica = document.createElement("span");
                    zvezdica.classList.add("fa", "fa-star", "fa-2x");
                    if (i < Math.floor(prosecnaOcena)) {
                        zvezdica.classList.add("cekirano");
                    }
                    document.getElementById("zvezdice").appendChild(zvezdica);
                }
                // <span class="fa fa-star fa-2x"></span>

                let ukupanBrojUcesnika = ocene.reduce((akumulator, element) => akumulator + element);

                document.getElementById("prosekOcena").innerText = "Prosek "
                    .concat(prosecnaOcena.toString(), " bazirano na ", ukupanBrojUcesnika, " korisnika");

                // telo 
                for (let i = 4; i >= 0; i--) {
                    let red = document.createElement("div");
                    red.classList.add("row", "zvezdiceProgres");

                    let brojZvezdicaLabela = document.createElement("span");
                    brojZvezdicaLabela.classList.add("col-lg-2");
                    brojZvezdicaLabela.innerText = "Ocena ".concat((i + 1).toString());
                    red.appendChild(brojZvezdicaLabela);

                    let progresKontejner = document.createElement("div");
                    progresKontejner.classList.add("col-9");
                    red.appendChild(progresKontejner);

                    let progres = document.createElement("div");
                    progres.classList.add("progress");
                    progresKontejner.appendChild(progres);

                    let progresbar = document.createElement("div");
                    let boja;
                    switch (i) {
                        case 0:
                            {
                                boja = "#d9534f";
                                break;
                            }
                        case 1:
                            {
                                boja = "orange";
                                break;
                            }
                        case 2:
                            {
                                boja = "#3edced";
                                break;
                            }
                        case 3:
                            {
                                boja = "#4287f5";
                                break;
                            }
                        case 4:
                            {
                                boja = "#5cb85c";
                                break;
                            }
                        default:
                            {
                                boja = "white";
                            }
                    }

                    progresbar.style.backgroundColor = boja;
                    progresbar.setAttribute("role", "progressbar");
                    let vrednostProgresa = Math.round((ocene[i] / ukupanBrojUcesnika) * 100);
                    progresbar.style.width = vrednostProgresa.toString().concat("%");
                    progresbar.setAttribute("aria-valuenow", vrednostProgresa);
                    progresbar.setAttribute("aria-valuemin", 0);
                    progresbar.setAttribute("aria-valuemax", 100);
                    progres.appendChild(progresbar);

                    let brojGlasovaPoOceni = document.createElement("span");
                    brojGlasovaPoOceni.innerText = ocene[i].toString();
                    red.appendChild(brojGlasovaPoOceni);

                    document.getElementById("progresi").appendChild(red);
                }

            } else {
                alert("Došlo je do greške");
            }
        }
    }


    zahtev.open("GET", firebaseURL);
    zahtev.send();
} {
    /* <div class="row my-3" class="zvezdiceProgres">
            <span class="col-lg-2">5 zvezdica</span>
            <div class="col-9">
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: 10%;" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <span class="col-1">150</span>
        </div> */
}

function dodajRed(zaglavljeTekst, podatakTekst) {
    let red = document.createElement("tr");

    let zaglavlje = document.createElement("th");
    zaglavlje.setAttribute("scope", "row");
    zaglavlje.innerText = zaglavljeTekst;
    red.appendChild(zaglavlje);

    let podatak = document.createElement("td");
    podatak.innerText = podatakTekst;
    red.appendChild(podatak);

    document.querySelector("table").appendChild(red);
} {
    /* <table class="table table-hover table-responsive table-bordered p-0 ">
            <tr>
                <th scope="row">Kod:</th>
                <td>B00104</td>
            </tr>
            <tr>
                <th scope="row">Naziv:</th>
                <td>Brod Kej 1</td>
            </tr>
            <tr>
                <th scope="row">Adresa polaska:</th>
                <td>Karađorđeva 2, Beograd 11080</td>
            </tr>
            <tr>
                <th scope="row">Kratak opis:</th>
                <td>Iskoristite jedinstvenu priliku da upoznate Beograd sa reka. Brod Kej 1 je na dva nivoa, sa otvorenim barom i restoranom, otvorenom palubom , besplatnim internetom i ljubaznim osobljem.</td>
            </tr>
            <tr>
                <th scope="row">Trajanje:</th>
                <td>90</td>
            </tr>
            <tr>
                <th scope="row">Tip ture:</th>
                <td>Krstarenje</td>
            </tr>
            <tr>
                <th scope="row">Cena po osobi:</th>
                <td>3250</td>
            </tr>
            <tr>
                <th scope="row">Maksimalan broj osoba:</th>
                <td>60</td>
            </tr>
        </table> */
}