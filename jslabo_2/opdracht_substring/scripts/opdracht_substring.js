const setup = () => {
    let btnSubstring = document.getElementById("btnKlik");
    btnSubstring.addEventListener("click", substringFunctie);
};

const substringFunctie = () => {
    let txtOutput = document.getElementById("txtOutput");
    let nrLinks = parseInt(document.getElementById("nrLinks").value);
    let nrRechts = parseInt(document.getElementById("nrRechts").value);
    let txt = document.getElementById("txt").value;

    if (txt.length === 0) {
        txtOutput.textContent = "Voer een tekst in.";
        return;
    }

    if (!isNaN(nrLinks) && !isNaN(nrRechts) && nrLinks >= 0 && nrRechts > nrLinks && nrRechts <= txt.length) {
        let resultaat = txt.substring(nrLinks, nrRechts);
        txtOutput.textContent = `${resultaat}`;
    } else {
        txtOutput.textContent = "Ongeldige invoer. Zorg dat de indexen kloppen.";
    }
};

window.addEventListener("load", setup);




