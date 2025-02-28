const setup = () => {
	const printWithSpaces = () => {
		let inputText = document.getElementById("tekst").value;
		let spacedText = inputText.split("").join(" ");
		console.log(spacedText);
	}

	document.querySelector("button").addEventListener("click", printWithSpaces);
}

window.addEventListener("load", setup);

