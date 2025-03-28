const setup = () => {
    // GETAL TUSSEN [0, 1[
    let getal1 = Math.random();
    // GETAL TUSSEN [0, 15[
    let getal2 = Math.random() * 15;
    // GETAL TUSSEN [10, 15[
    let getal3 = 10 + Math.random() * 15;

    console.log(getal1);
    console.log(getal2);
    console.log(getal3);
}
window.addEventListener("load", setup);