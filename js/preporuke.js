let firebaseURL = "https://web-projekat-af075-default-rtdb.europe-west1.firebasedatabase.app/";
console.clear();
preuzmiGradove();
preuzmiTure();

function preuzmiGradove() {
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let gradovi = JSON.parse(this.responseText);
                // console.log(gradovi);
                for (gradId in gradovi) {
                    let odstojanjeKontejner = document.createElement("div");
                    odstojanjeKontejner.classList.add("my-4", "p-3");

                    let preporucenoKontejner = document.createElement("div");
                    preporucenoKontejner.classList.add("row", "preporucenoKontejner");
                    odstojanjeKontejner.appendChild(preporucenoKontejner);

                    let levaStrana = document.createElement("div");
                    levaStrana.classList.add("col-lg-4");
                    preporucenoKontejner.appendChild(levaStrana);

                    let preporukaNaslov = document.createElement("h2");
                    preporukaNaslov.innerText = "Preporuka za grad ".concat(gradovi[gradId].naziv);
                    levaStrana.appendChild(preporukaNaslov);

                    let preporuka = document.createElement("p");
                    preporuka.innerText = "Naš izbor najpopularnijih atrakcija za grad ".concat(gradovi[gradId].naziv);
                    levaStrana.appendChild(preporuka);

                    let desnaStrana = document.createElement("div");
                    desnaStrana.classList.add("col-lg-8", "desnaStrana");
                    desnaStrana.setAttribute("data-idAtrakcija", gradovi[gradId].idAtrakcija);
                    preporucenoKontejner.appendChild(desnaStrana);

                    document.querySelector("main").appendChild(odstojanjeKontejner);
                }
            } else {
                alert("Došlo je do greške");
            }
        }
    }

    zahtev.open("GET", firebaseURL.concat("gradovi.json"));
    zahtev.send();

}

function preuzmiTure() {

    let zahtev = new XMLHttpRequest()

    zahtev.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var ture = JSON.parse(this.responseText);

                let desneStrane = document.querySelectorAll("div.desnaStrana");
                // console.log(desneStrane);

                for (let redniBroj = 0; redniBroj < desneStrane.length; redniBroj++) {

                    let idAtrakcija = desneStrane[redniBroj].getAttribute("data-idAtrakcija");
                    let najpopularnijeObjekat = odrediNajpopularnije(ture[idAtrakcija]);
                    let najpopularnijeAtrakcijeKljucevi = najpopularnijeObjekat.kljucevi;
                    let najpopularnijeAtrakcije = najpopularnijeObjekat.vrednosti;
                    // console.log(najpopularnijeAtrakcije);

                    let red = document.createElement("div");
                    red.classList.add("row");
                    desneStrane[redniBroj].appendChild(red);

                    // console.log(idAtrakcija);
                    red.appendChild(prviSablon(najpopularnijeAtrakcije[0], najpopularnijeAtrakcijeKljucevi[0], idAtrakcija));
                    red.appendChild(prviSablon(najpopularnijeAtrakcije[1], najpopularnijeAtrakcijeKljucevi[1], idAtrakcija));

                    red = document.createElement("div");
                    red.classList.add("row");
                    desneStrane[redniBroj].appendChild(red);
                    red.appendChild(drugiSablon(najpopularnijeAtrakcije[2], najpopularnijeAtrakcijeKljucevi[2], idAtrakcija));

                }

            } else {
                alert("Došlo je do greške");
            }
        }
    }
    zahtev.open("GET", firebaseURL.concat("turistickeAtrakcije.json"));
    zahtev.send();
}

function prviSablon(atrakcija, atrakcijaId, idAtrakcija) {

    let kontejner = document.createElement("div");
    kontejner.classList.add("col-lg-6");

    let slikaKontejner = document.createElement("div");
    slikaKontejner.classList.add("row");
    kontejner.appendChild(slikaKontejner);

    let slikaAtrakcije = document.createElement("img");
    slikaAtrakcije.setAttribute("src", atrakcija.slika);
    slikaAtrakcije.setAttribute("alt", atrakcija.naziv);
    slikaAtrakcije.classList.add("col-lg-12");
    slikaKontejner.appendChild(slikaAtrakcije);

    kontejner.appendChild(document.createElement("br"));

    let nazivTure = document.createElement("h4");
    nazivTure.innerText = atrakcija.naziv;
    kontejner.appendChild(nazivTure);

    let kratakOpis = document.createElement("p");
    kratakOpis.innerText = atrakcija.kratakOpis;
    kontejner.appendChild(kratakOpis);

    let cenaLinkKontejner = document.createElement("div");
    cenaLinkKontejner.classList.add("row", "col-lg-12");
    kontejner.appendChild(cenaLinkKontejner);

    let cena = document.createElement("b");
    cena.innerText = "RSD ".concat(atrakcija.cena);
    cena.classList.add("mr-auto", "cenaAtrakcije");
    cenaLinkKontejner.appendChild(cena);

    let linkKaAtrakciji = document.createElement("a");
    linkKaAtrakciji.setAttribute("href", "tura.html".concat("?idAtrakcija=", idAtrakcija.toString(), "&tura=", atrakcijaId));
    cenaLinkKontejner.appendChild(linkKaAtrakciji);

    let strelica = document.createElement("i");
    strelica.classList.add("fa", "fa-2x", "fa-arrow-circle-right");
    linkKaAtrakciji.appendChild(strelica);

    return kontejner;
} {
    /* <div class="col-lg-6">

        <div class="row">
            <img class="col-lg-12" src="../slike/beograd/beograd vas domacin.jpg" alt="london">
        </div>
        <h4>Beograd vas domacin</h4>
        <p>"Tura \"Beograd vaš domaćin\" je tura razgledanja grada iz otvorenog turističkog autobusa za panoramsko razgledanje grada, opremljen audio-vodičem."</p>
        <div class="row col-12">
            <b class="mr-auto cenaAtrakcije">RSD 1444.99</b>
            <a href="#"><i class="fa fa-2x fa-arrow-circle-right"></i></a>
        </div>


    </div> */
}

function drugiSablon(atrakcija, atrakcijaId, idAtrakcija) {

    let kontejner = document.createElement("div");
    kontejner.classList.add("row", "my-4");

    let slikaKontejner = document.createElement("div");
    slikaKontejner.classList.add("col-lg-6");
    slikaKontejner.setAttribute("id", "donjaPreporuka");
    kontejner.appendChild(slikaKontejner);

    let slikaAtrakcije = document.createElement("img");
    slikaAtrakcije.setAttribute("src", atrakcija.slika);
    slikaAtrakcije.setAttribute("alt", atrakcija.naziv);
    slikaAtrakcije.classList.add("col-lg-12");
    slikaKontejner.appendChild(slikaAtrakcije);

    let tekstKontejner = document.createElement("div");
    tekstKontejner.classList.add("col-lg-6");
    kontejner.appendChild(tekstKontejner);

    tekstKontejner.appendChild(document.createElement("br"));

    let nazivTure = document.createElement("h4");
    nazivTure.innerText = atrakcija.naziv;
    tekstKontejner.appendChild(nazivTure);

    let kratakOpis = document.createElement("p");
    kratakOpis.innerText = atrakcija.kratakOpis;
    tekstKontejner.appendChild(kratakOpis);

    let cenaLinkKontejner = document.createElement("div");
    cenaLinkKontejner.classList.add("row", "col-lg-12");
    tekstKontejner.appendChild(cenaLinkKontejner);

    let cena = document.createElement("b");
    cena.innerText = "RSD ".concat(atrakcija.cena);
    cena.classList.add("mr-auto", "cenaAtrakcije");
    cenaLinkKontejner.appendChild(cena);

    let linkKaAtrakciji = document.createElement("a");
    linkKaAtrakciji.setAttribute("href", "tura.html".concat("?idAtrakcija=", idAtrakcija.toString(), "&tura=", atrakcijaId));
    cenaLinkKontejner.appendChild(linkKaAtrakciji);

    let strelica = document.createElement("i");
    strelica.classList.add("fa", "fa-2x", "fa-arrow-circle-right");
    linkKaAtrakciji.appendChild(strelica);

    return kontejner;
} {
    /* <div class="row my-4">
            <div class="col-lg-6" id="donjaPreporuka">
                <img class="col-lg-12 p-0" src="../slike/beograd/brod kornjaca.jpg" alt="">
            </div>
            <div class="col-lg-6">
                <h4>Brod kornjaca</h4>
                <p>"Iskoristite jedinstvenu priliku da upoznate Beograd sa reka. Brod Kej 1 je na dva nivoa, sa otvorenim barom i restoranom, otvorenom palubom , besplatnim internetom i ljubaznim osobljem."</p>
                <div class="row col-12">
                    <b class="mr-auto cenaAtrakcije">RSD 1444.99</b>
                    <a href="#"><i class="fa fa-2x fa-arrow-circle-right"></i></a>
                </div>
            </div>
    </div>  */
}


function odrediNajpopularnije(tureGrada) {
    maxNiz = [null, null, null];
    maxNizKljucevi = [null, null, null];
    // console.log(maxNiz);
    for (turaId in tureGrada) {
        // console.log(tureGrada[turaId]);
        let atrakcija = tureGrada[turaId];
        for (let i = 0; i < 3; i++) {
            if (maxNiz[i] == null) {

                maxNiz[i] = atrakcija;
                maxNizKljucevi[i] = turaId;

                break;
            } else if (atrakcija.ocena >= maxNiz[i].ocena) {
                pomeriUdesno(maxNiz, i);
                pomeriUdesno(maxNizKljucevi, i);
                maxNiz[i] = atrakcija;
                maxNizKljucevi[i] = turaId;
                break;
            }
        }
    }
    return { kljucevi: maxNizKljucevi, vrednosti: maxNiz };
}

function pomeriUdesno(niz, indeks) {
    for (let i = niz.length - indeks - 1; i > 0; i--) {
        niz[i] = niz[i - 1];
    }
}