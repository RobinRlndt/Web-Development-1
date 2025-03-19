const setup = () => {
    let elements = document.querySelectorAll('p');
    elements.forEach(element => {
        element.innerHTML = "Good Job!"
    })
}
window.addEventListener("load", setup);