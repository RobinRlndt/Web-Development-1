const setup = () => {
    let button = document.getElementById("buttonDIV");

    const addPElement = () => {
        let element = document.createElement('p');
        element.textContent = 'This is a new paragraph.';
        document.getElementById('myDIV').appendChild(element);
    }

    button.addEventListener('click', addPElement);

}
window.addEventListener("load", setup);