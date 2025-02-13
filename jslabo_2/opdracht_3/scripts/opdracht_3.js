const setup = () => {
    let pElement=document.getElementById("txtOutput");
    pElement.innerHTML="Welkom!"

    const wijzigTekst = () => {
        pElement.innerHTML="Hello World!"
    }

    document.getElementById("WijzigButton").addEventListener("click", wijzigTekst);
}
window.addEventListener("load", setup);

