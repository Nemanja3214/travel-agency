let firebaseURL = "https://web-projekat-af075-default-rtdb.europe-west1.firebasedatabase.app/korisnici";
console.clear();
preuzmiKorisnike();

document.getElementById("izbrisiModalDugme").addEventListener("click", function() {
    let redniBroj = this.getAttribute("data-red");

    document.querySelectorAll("tr")[redniBroj].hidden = true;

    document.getElementById("zatvoriUpozorenjeBrisanjeModal").click();
    alert("Uspešno ste izbrisali korisnika.");
})

document.getElementById("deaktivirajModalDugme").addEventListener("click", function() {
    let redniBroj = this.getAttribute("data-red");

    document.querySelectorAll("tr")[redniBroj].classList.add("deaktivirano");

    document.getElementById("zatvoriUpozorenjeDeaktivirajModal").click();
    alert("Uspešno ste deaktivirali korisnika.");
})

function preuzmiKorisnike() {
    let zahtev = new XMLHttpRequest();


    zahtev.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let korisnici = JSON.parse(this.responseText);
                let i = 1;
                for (korisnikId in korisnici) {
                    // console.log(korisnici[korisnikId]);

                    let red = document.createElement("tr");


                    let redniBroj = document.createElement("th");
                    redniBroj.setAttribute("scope", "row");
                    redniBroj.innerText = i.toString();
                    red.appendChild(redniBroj);

                    let korisnickoImeCelija = document.createElement("td");


                    let linkKaKorisniku = document.createElement("a");
                    linkKaKorisniku.setAttribute("href", "../stranice/profilna.html".concat("?korisnikId=", korisnikId.toString()));
                    linkKaKorisniku.innerText = korisnici[korisnikId].username;
                    korisnickoImeCelija.appendChild(linkKaKorisniku);

                    red.appendChild(korisnickoImeCelija);


                    let emailCelija = document.createElement("td");
                    emailCelija.innerText = korisnici[korisnikId].email;
                    red.appendChild(emailCelija);


                    let dugmeBrisanjeCelija = document.createElement("td");
                    dugmeBrisanjeCelija.classList.add("dugmeCelija");

                    let dugmeBrisanje = document.createElement("a");
                    dugmeBrisanje.classList.add("btn", "btn-danger");
                    dugmeBrisanje.setAttribute("data-toggle", "modal");
                    dugmeBrisanje.setAttribute("data-target", "#brisanjeKorisnikaModal");
                    dugmeBrisanje.innerHTML = "&times;";
                    // da bi se u modalu znalo o kom se redu radi
                    dugmeBrisanje.setAttribute("data-red", i);
                    dugmeBrisanje.addEventListener("click", function() {
                        document.getElementById("izbrisiModalDugme").setAttribute("data-red", this.getAttribute("data-red"));
                    });

                    dugmeBrisanjeCelija.appendChild(dugmeBrisanje);
                    red.appendChild(dugmeBrisanjeCelija);

                    let dugmeDeaktivacijaCelija = document.createElement("td");
                    dugmeDeaktivacijaCelija.classList.add("dugmeCelija");

                    let dugmeDeaktivacija = document.createElement("a");
                    dugmeDeaktivacija.classList.add("btn", "btn-warning");
                    dugmeDeaktivacija.setAttribute("data-toggle", "modal");
                    dugmeDeaktivacija.setAttribute("data-target", "#onemoguciKorisnikaModal");
                    // da bi se u modalu znalo o kom se redu radi
                    dugmeDeaktivacija.setAttribute("data-red", i);
                    dugmeDeaktivacija.addEventListener("click", function() {
                        document.getElementById("deaktivirajModalDugme").setAttribute("data-red", this.getAttribute("data-red"));
                    });

                    let ikonica = document.createElement("i");
                    ikonica.classList.add("fa", "fa-ban");
                    dugmeDeaktivacija.appendChild(ikonica);

                    dugmeDeaktivacijaCelija.appendChild(dugmeDeaktivacija);
                    red.appendChild(dugmeDeaktivacijaCelija);

                    document.getElementById("tabelaSaKorisnicima").querySelector("tbody").appendChild(red);
                    i++;
                }
            } else {
                alert("Došlo je do greške");
            }
        }
    }

    zahtev.open("GET", firebaseURL.concat(".json"));
    zahtev.send();
}

{
    //     <tr>
    //     <th scope="row">1</th>
    //     <td>
    //         <a href="../stranice/profilna.html">petar</a>
    //     </td>
    //     <td>ppetrovic@webd.com</td>
    //     <td class="dugmeCelija">
    //         <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#brisanjeKorisnikaModal">&times;</a>
    //     </td>
    //     <td class="dugmeCelija">
    //         <a href="#" class="btn btn-warning" data-toggle="modal" data-target="#onemoguciKorisnikaModal">
    //             <i class="fa fa-ban"></i>
    //         </a>
    //     </td>
    // </tr>
}