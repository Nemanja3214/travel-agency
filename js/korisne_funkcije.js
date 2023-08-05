function preuzmiVrednostParametra(naziv) {
    var lokacija = decodeURI(window.location.toString());
    var indeks = lokacija.indexOf("?") + 1;
    var podstringovi = lokacija.substring(indeks, lokacija.length);
    var razdvojeno = podstringovi.split("&");

    for (i = 0; i < razdvojeno.length; i++) {
        var s = razdvojeno[i].split("=");
        var nazivParametra = s[0];
        var vrednostParametra = s[1];
        if (nazivParametra === naziv) {
            return vrednostParametra;
        }
    }
}