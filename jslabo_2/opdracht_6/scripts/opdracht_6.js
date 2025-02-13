const setup = () => {
    let btnKopieer = document.getElementById("btnKopieer");


    const kopieer = () => {
        let txtInput = document.getElementById("txtInput");
        let tekst = txtInput.value;
        let txtOutput = document.getElementById("txtOutput")
        txtOutput.textContent = tekst;
    }

    btnKopieer.addEventListener("click", kopieer);
}
window.addEventListener("load", setup);

