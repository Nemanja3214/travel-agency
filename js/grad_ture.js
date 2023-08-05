// import preuzmiVrednostParametra from "/korisne_funkcije.js";
let firebaseURL = "https://web-projekat-af075-default-rtdb.europe-west1.firebasedatabase.app/turistickeAtrakcije/";
console.clear();
preuzmiTure();


function preuzmiTure() {
    let idAtrakcija = preuzmiVrednostParametra("idAtrakcija");
    console.log(firebaseURL.concat(idAtrakcija, ".json"));
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                atrakcije = JSON.parse(this.responseText);
                // console.log(idAtrakcija);
                let i = 0;
                for (atrakcijaId in atrakcije) {
                    let red = document.createElement("div");
                    red.classList.add("row");

                    if (i % 2 === 0) {
                        red.classList.add("horizontalneKartice");
                    } else {
                        red.classList.add("horizontalneKarticeNeparno");
                    }
                    i++;

                    let slika = document.createElement("img");
                    slika.classList.add("col-lg-7");
                    slika.setAttribute("src", atrakcije[atrakcijaId].slika);
                    slika.setAttribute("alt", atrakcije[atrakcijaId].naziv);
                    red.appendChild(slika);

                    let tekstKontejener = document.createElement("div");
                    tekstKontejener.classList.add("col-lg-5");

                    let naslov = document.createElement("h3");
                    naslov.innerText = atrakcije[atrakcijaId].naziv;
                    tekstKontejener.appendChild(naslov);

                    let paragraf = document.createElement("p");
                    paragraf.innerText = atrakcije[atrakcijaId].kratakOpis;
                    tekstKontejener.appendChild(paragraf);

                    let linkKaAtrakciji = document.createElement("a");
                    linkKaAtrakciji.setAttribute("href", "tura.html?idAtrakcija=".concat(idAtrakcija).concat("&tura=").concat(atrakcijaId));
                    linkKaAtrakciji.innerText = "Detaljnije";
                    tekstKontejener.appendChild(linkKaAtrakciji);

                    red.appendChild(tekstKontejener);

                    document.getElementById("tureKartice").appendChild(red);

                }

            } else {
                alert("Došlo je do greške.");
            }
        }
    }

    zahtev.open("GET", firebaseURL.concat(idAtrakcija, ".json"));
    zahtev.send();
}
/* <div class="row horizontalneKartice">
                <img class="col-lg-5" src="../slike/beograd/beograd vas domacin.jpg" alt="Slika grada">
                <div class="col-lg-7">
                    <h3>Beograd Vaš domaćin</h3>
                    <p>
                        Tura \"Beograd vaš domaćin\" je tura razgledanja grada, kapaciteta 90 mesta (60 na otvorenom i 30 u zatvorenom delu), iz otvorenog turističkog autobusa za panoramsko razgledanje grada, opremljen audio-vodičem.Tura razgledanja grada otvorenim autobusom
                        traje 70 minuta. Minimalan broj putnika za realizaciju ture je 15. TRASA ZA TURISTIČKI AUTOBUS: Bulevar Kralja Aleksandra (u zoni Pionirskog parka)-Kneza Miloša-Bulevar Kneza Aleksandra Karađorđevića-Dr.Milutina Ivkovića-Trg Oslobođenja-Autokomanda-Bulevar
                        oslobođenja-Trg Slavija–Kralja Milana-Terazije-Kolarčeva-Trg republike-Vasina-Uzun Mirkova-Tadeuša Košćuškog-Cara Dušana-Bulevar Vojvode Bojovića-Pariska-Kneza Sime Markovića-Pop Lukina-Brankov most-Bulevar Nikole Tesle-Ušće-Bulevar
                        Mihaila Pupina-Brankov Most-Brankova-Prizrenska-Terazije- Bulevar Kralja Aleksandra (u zoni Pionirskog parka).
                    </p>
                    <a href="tura.html">Detaljnije</a>
                </div>
            </div> */

/* <div class="row horizontalneKartice">
                <img class="col-lg-5" src="../slike/beograd/brod kornjaca.jpg" alt="Slika grada">
                <div class="col-lg-7">
                    <h3>Brod kornjača</h3>
                    <p>
                        Ploveći najdužom turom u Beogradu, imaćete priliku da sa reke vidite svih osam beogradskih mostova – šest na Savi i dva na Dunavu, Kalemegdansku tvrđavu, Kulu Nebojša, Malo konjsko i Veliko ratno ostrvo, ušće Save u Dunav, ribarske vikendice na borčanskoj
                        strani Beograda, Zemun sa predivnim pogledom na Milenijumsku kulu, koja dominira predelom, blokove Novog Beograda, bivšu zgradu Centralnog komiteta Komunističke partije Jugoslavije – popularno Ušće, Beton halu, popularne splavove,
                        Savamalu, prve građevine projekta „Beograd na vodi“, „Dragor“ - kraljevski brod koji je plovio rekama Kraljevine Srba, Hrvata i Slovenaca, Beogradski sajam i Adu Ciganliju. Tokom plovidbe, možete slušati priče o Beogradu i njegovim
                        sadašnjim i nekadašnjim stanovnicima, koje će vam naši vodiči pričati na srpskom, engleskom i španskom jeziku.U ponudi postoje dnevna tura sa zalaskom sunca i noćna tura.
                    </p>
                    <a href="tura.html">Detaljnije</a>
                </div>
            </div> */

// function preuzmiVrednostParametra(naziv) {
//     var lokacija = decodeURI(window.location.toString());
//     var indeks = lokacija.indexOf("?") + 1;
//     var podstringovi = lokacija.substring(indeks, lokacija.length);
//     var razdvojeno = podstringovi.split("&");

//     for (i = 0; i < razdvojeno.length; i++) {
//         var s = razdvojeno[i].split("=");
//         var nazivParametra = s[0];
//         var vrednostParametra = s[1];
//         if (nazivParametra === naziv) {
//             return vrednostParametra;
//         }
//     }
// }