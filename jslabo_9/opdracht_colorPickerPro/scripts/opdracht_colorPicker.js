const setup = () => {
    const sliders = [
        document.getElementById("red"),
        document.getElementById("green"),
        document.getElementById("blue")
    ];
    const outputLabels = [
        document.getElementById("txtOutput1"),
        document.getElementById("txtOutput2"),
        document.getElementById("txtOutput3")
    ];
    const colorBox = document.getElementById("colorBox");
    const saveButton = document.getElementById("saveButton");
    const swatchBox = document.getElementById("swatch-box");

    // Herstel opgeslagen sliderwaarden en swatches bij laden
    restoreSliderValues(sliders);
    restoreSwatches(sliders, swatchBox, outputLabels, colorBox);

    // Zet UI op basis van herstelde waarden
    updateUI(sliders, outputLabels, colorBox);

    // Sla sliders op bij elke verandering
    sliders.forEach(slider => {
        slider.addEventListener("input", () => {
            updateUI(sliders, outputLabels, colorBox);
            storeSliderValues(sliders);
        });
    });

    // Voeg swatch toe en sla swatches op
    saveButton.addEventListener("click", () => {
        const values = sliders.map(slider => slider.value);
        addToSwatch(values, swatchBox, outputLabels, colorBox, sliders);
        storeSwatches(swatchBox);
    });
};

const updateUI = (sliders, outputLabels, colorBox) => {
    const [r, g, b] = sliders.map(slider => slider.value);
    colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    outputLabels[0].textContent = `Red ${r}`;
    outputLabels[1].textContent = `Green ${g}`;
    outputLabels[2].textContent = `Blue ${b}`;
};

const addToSwatch = (rgbArray, swatchBox, outputLabels, colorBox, sliders) => {
    const [r, g, b] = rgbArray;
    const color = `rgb(${r}, ${g}, ${b})`;
    const box = document.createElement("div");
    box.classList.add("swatch-item");
    box.style.backgroundColor = color;
    box.dataset.r = String(r);
    box.dataset.g = String(g);
    box.dataset.b = String(b);

    // Klik op swatch: sliders terugzetten, UI updaten en sliders opslaan
    box.addEventListener("click", e => {
        if (e.target.classList.contains("remove-button")) return;
        sliders[0].value = r;
        sliders[1].value = g;
        sliders[2].value = b;
        updateUI(sliders, outputLabels, colorBox);
        storeSliderValues(sliders);
    });

    // Verwijderknop
    const button = document.createElement("button");
    button.classList.add("remove-button");
    button.textContent = "✖";
    button.addEventListener("click", e => {
        e.stopPropagation();
        box.remove();
        storeSwatches(swatchBox);
    });

    box.appendChild(button);
    swatchBox.appendChild(box);

    // Swatches opslaan na toevoegen
    storeSwatches(swatchBox);
};

window.addEventListener('load', setup)













