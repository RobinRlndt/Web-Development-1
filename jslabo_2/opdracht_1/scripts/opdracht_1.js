const setup = () => {
}
window.addEventListener("load", setup);

window.alert("Dit is een mededeling");
let confirmResult = confirm("Weet u het zeker?");
console.log(confirmResult);
let promptResult = prompt("Wat is uw naam", "onbekend");
console.log(promptResult);