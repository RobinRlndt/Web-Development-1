const setup = () => {
    const familieleden = ['Bart','Jan','Piet','Griet','Katrien'];
    console.log(familieleden.length);
    console.log(familieleden[0]);
    console.log(familieleden[2]);
    console.log(familieleden[4]);

    const voegNaamToe = (array) => {
        let nieuweNaam = prompt("Geef een extra familielid: ");
        array.push(nieuweNaam);
    }

    voegNaamToe(familieleden);
    console.log(familieleden);

    let ArrayAlsString = familieleden.join(", ");
    console.log(ArrayAlsString);

}
window.addEventListener("load", setup);

