
const setup = () => {

	const maakMetSpaties = (inputText) => {
		let result = inputText.split("").join(" ");
		return result;
	}

	const printWithSpaces = () => {
		let inputText = document.getElementById("tekst").value;
		let spacedText = maakMetSpaties(inputText);
		console.log(spacedText);
	}

	document.getElementById("printButton").addEventListener("click", printWithSpaces);
}

window.addEventListener("load", setup);


