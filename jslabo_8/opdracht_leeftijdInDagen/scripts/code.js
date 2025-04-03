const setup = () => {
    const input = document.getElementById("txtGeboorteDatum");
    const output = document.getElementById("tekstvak1");

    input.addEventListener("change", () => {
        if (valideerGeboorteDatum()) {
            const geboortedatum = new Date(input.value);
            toonLeeftijdInDagen(output, geboortedatum);
        }
    })
};

const toonLeeftijdInDagen = (tekstvak, geboortedatum) => {
    const leeftijdInDagen = berekenLeeftijdInDagen(geboortedatum);
    tekstvak.textContent = `Je bent ${leeftijdInDagen} dagen oud.`;
}

const berekenLeeftijdInDagen = (jouwGeboortedatum) => {
    const geboortedatumMillis = jouwGeboortedatum.getTime();
    const huidigeDatumMillis = new Date().getTime();

    const verschilInMilliseconden = huidigeDatumMillis - geboortedatumMillis;
    return Math.round(verschilInMilliseconden / (24 * 60 * 60 * 1000)); // Convert milliseconds to days
}


window.addEventListener("load", setup);
