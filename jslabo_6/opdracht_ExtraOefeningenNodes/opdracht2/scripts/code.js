const setup = () => {

    const liItemsVeranderenVanKlasse = () => {
        let elements = document.querySelectorAll('li');
        elements.forEach(element => {
            element.classList.add('listitem');

        });
    };

    const listItemsNaarRood = () => {
        let elements = document.getElementsByClassName('listitem');
        Array.from(elements).forEach(element => {
            element.style.color = "red";
        });
    };

    const fotoBijvoegen = () => {
        let place = document.querySelector('ul');
        const foto = document.createElement('img');
        foto.src = "images/download.png";
        foto.alt = "foto";
        place.appendChild(foto);
    };


    liItemsVeranderenVanKlasse();
    listItemsNaarRood();
    fotoBijvoegen();
};

window.addEventListener("load", setup);
