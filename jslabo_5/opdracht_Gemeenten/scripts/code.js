const setup = () => {
	function voegOptieToe(tekst) {
		let dropdown = document.getElementById('gemeenten');
		let newOption = document.createElement('option');
		newOption.text = tekst;
		dropdown.add(newOption);
	}

	const compare = (a, b) => {
		return a.localeCompare(b);
	}

	const sorteer = () => {
		let dropdown = document.getElementById('gemeenten');
		let opties = Array.from(dropdown.options).map(option => option.text);
		opties.sort(compare);
		dropdown.innerHTML = '';
		opties.forEach(optie => voegOptieToe(optie));
	}



	const gemeentenInvoer = () => {
		while (true) {
			let gemeente = prompt("Voer een gemeente in (of 'stop' om te eindigen):");
			if (gemeente.trim().toLowerCase() === 'stop') {
				break;
			}
			voegOptieToe(gemeente);
			sorteer();
		}
	}

	gemeentenInvoer();
}

window.addEventListener("load", setup);



