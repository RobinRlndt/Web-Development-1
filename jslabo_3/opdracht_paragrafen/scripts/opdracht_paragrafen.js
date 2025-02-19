const setup = () => {
    const belangrijkeElementen = document.getElementsByClassName("belangrijk");

    for (let i = 0; i < belangrijkeElementen.length; i++) {
        belangrijkeElementen[i].className += " opvallend";
    }


}
window.addEventListener("load", setup);

