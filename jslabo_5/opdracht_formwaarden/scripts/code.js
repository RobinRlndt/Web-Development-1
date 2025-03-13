const setup = () => {
		const toonResultaatKnop = document.getElementById('toonResultaatKnop');

		toonResultaatKnop.addEventListener('click', function() {

			const isRokerCheckbox = document.getElementById('isRoker');
			const isRoker = isRokerCheckbox.checked;


			const moedertaalRadios = document.querySelectorAll('input[name="taal"]');
			let moedertaal = null;
			for (const radio of moedertaalRadios) {
				if (radio.checked) {
					moedertaal = radio.value;
					break;
				}
			}


			const buurlandSelect = document.getElementById('buurland');
			const favorieteBuurland = buurlandSelect.value;


			const bestellingSelect = document.getElementById('bestelling');
			const bestelling = Array.from(bestellingSelect.selectedOptions).map(option => option.value);


			console.log("is roker: " + (isRoker ? "ja" : "nee"));
			console.log("moedertaal is " + (moedertaal ? moedertaal : "niet geselecteerd"));
			console.log("favoriete buurland is " + favorieteBuurland);
			console.log("bestelling bestaat uit " + bestelling.join(" "));
		})

	}
	window.addEventListener("load", setup);


