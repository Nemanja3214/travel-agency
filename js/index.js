let firebaseURL = "https://web-projekat-af075-default-rtdb.europe-west1.firebasedatabase.app/";
// console.clear();
preuzmiGradove();

function preuzmiGradove() {
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                gradovi = JSON.parse(this.responseText);
                let i = 0;
                let red = document.createElement("div");
                red.classList.add("row", "d-flex", "justify-content-around");
                for (id in gradovi) {
                    if (i % 3 === 0) {
                        red = document.createElement("div");
                        red.classList.add("row", "d-flex", "justify-content-around");
                    }

                    let kartica = document.createElement("div");
                    kartica.classList.add("card", "col-lg-3");

                    let slika = document.createElement("img");
                    slika.classList.add("card-img-top");
                    slika.setAttribute("src", gradovi[id].slika);
                    slika.setAttribute("alt", gradovi[id].naziv);
                    kartica.appendChild(slika);

                    // usput i za karuzel
                    let karuzelDivSlike = document.createElement("div");
                    karuzelDivSlike.classList.add("carousel-item");

                    let karuzelSlika = document.createElement("img");
                    karuzelSlika.classList.add("d-block", "w-100");
                    karuzelSlika.setAttribute("src", gradovi[id].slika);
                    karuzelSlika.setAttribute("alt", gradovi[id].naziv);

                    karuzelDivSlike.appendChild(karuzelSlika);
                    document.getElementsByClassName("carousel-inner")[0].appendChild(karuzelDivSlike);


                    let telo = document.createElement("div");
                    telo.classList.add("card-body");

                    naslovTela = document.createElement("h4");
                    naslovTela.classList.add("card-title");
                    naslovTela.innerText = gradovi[id].naziv;
                    telo.appendChild(naslovTela);

                    brojAtrakcija = document.createElement("p");
                    brojAtrakcija.classList.add("card-text");
                    brojAtrakcija.innerText = gradovi[id].brojAtrakcija.toString().concat(" atrakcija u ponudi");
                    telo.appendChild(brojAtrakcija);

                    kartica.appendChild(telo);

                    futer = document.createElement("div");
                    futer.classList.add("card-footer");

                    // resi ovo
                    linkKaAtrakcijama = document.createElement("a");
                    linkKaAtrakcijama.innerText = "Pregled atrakcije";
                    linkKaAtrakcijama.setAttribute("href", "./stranice/grad_ture.html?idAtrakcija=".concat(gradovi[id].idAtrakcija.toString()));

                    futer.appendChild(linkKaAtrakcijama);

                    kartica.appendChild(futer);

                    red.appendChild(kartica);

                    if (i % 3 === 0) {
                        document.getElementById("gradoviKartice").appendChild(red);
                    }
                    i++;
                }
                document.getElementsByClassName("carousel-item")[0].classList.add("active");

            } else {
                alert("Došlo je do greške.");
            }
        }
    }

    zahtev.open("GET", firebaseURL.concat("/gradovi.json"));
    zahtev.send();
}


// <div class="card col-lg-3">
//                     <img class="card-img-top" src="https://i.imgur.com/44nfgWJ.jpg" alt="Barselona">
//                     <div class="card-body">
//                         <h4 class="card-title">Barselona</h4>
//                         <p class="card-text">8 atrakcija u ponudi</p>
//                     </div>
//                     <div class="card-footer">
//                         <a href="./stranice/grad_ture.html">Pregled atrakcija</a>
//                     </div>
//                 </div>

// <div class="carousel-item active">
//                         <img class="d-block w-100" src="slike/barselona.jpg" alt="Prvi slajd">
//                     </div>