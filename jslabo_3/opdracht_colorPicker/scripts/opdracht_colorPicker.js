const setup = () => {
    const red = document.getElementById("red");
    const green = document.getElementById("green");
    const blue = document.getElementById("blue");
    const colorBox = document.getElementById("colorBox");

    const updateColor = () => {
        let r = red.value;
        let g = green.value;
        let b = blue.value;
        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    red.addEventListener("input", updateColor);
    green.addEventListener("input", updateColor);
    blue.addEventListener("input", updateColor);

    updateColor();

    const showColorNumber = () => {
        let txtOutputRed = document.getElementById("txtOutput1");
        let txtOutputGreen = document.getElementById("txtOutput2");
        let txtOutputBlue = document.getElementById("txtOutput3");

        txtOutputRed.innerHTML ="Red " + red.value.toString();
        txtOutputGreen.innerHTML = "Green " +green.value.toString();
        txtOutputBlue.innerHTML = "Blue " + blue.value.toString();
    }

    red.addEventListener("input", showColorNumber);
    green.addEventListener("input", showColorNumber);
    blue.addEventListener("input", showColorNumber);

    showColorNumber();

}
window.addEventListener("load", setup);

