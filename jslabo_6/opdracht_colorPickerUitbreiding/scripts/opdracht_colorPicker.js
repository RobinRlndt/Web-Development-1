const setup = () => {
    const red = document.getElementById("red");
    const green = document.getElementById("green");
    const blue = document.getElementById("blue");
    const colorBox = document.getElementById("colorBox");
    const saveButton = document.getElementById("saveButton");
    const swatchBox = document.getElementById("swatch-box"); // Correcte ID gebruiken

    let currentColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;

    const updateColor = () => {
        let r = red.value;
        let g = green.value;
        let b = blue.value;
        currentColor = `rgb(${r}, ${g}, ${b})`;
        colorBox.style.backgroundColor = currentColor;
    }

    const showColorNumber = () => {
        let txtOutputRed = document.getElementById("txtOutput1");
        let txtOutputGreen = document.getElementById("txtOutput2");
        let txtOutputBlue = document.getElementById("txtOutput3");

        txtOutputRed.innerHTML = "Red " + red.value.toString();
        txtOutputGreen.innerHTML = "Green " + green.value.toString();
        txtOutputBlue.innerHTML = "Blue " + blue.value.toString();
    }

    const addToSwatch = () => {
        // const swatchBox = document.getElementById("savedSwatches"); // Deze lijn verwijderen

        const box = document.createElement("div");
        box.classList.add("swatch-item");
        box.style.backgroundColor = currentColor;

        const button = document.createElement("button");

        const removeSwatch = (event) => {
            event.target.parentElement.remove();
        };

        button.addEventListener("click", removeSwatch);
        button.classList.add("remove-button");
        button.textContent = "✖";

        box.appendChild(button);
        swatchBox.appendChild(box);
    };

    saveButton.addEventListener("click", addToSwatch);

    red.addEventListener("input", updateColor);
    green.addEventListener("input", updateColor);
    blue.addEventListener("input", updateColor);

    red.addEventListener("input", showColorNumber);
    green.addEventListener("input", showColorNumber);
    blue.addEventListener("input", showColorNumber);

    updateColor();
    showColorNumber();
}

window.addEventListener("load", setup);


