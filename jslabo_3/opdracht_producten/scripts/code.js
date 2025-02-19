const setup = () => {
	const prijzen = [10.00, 15.00, 12.20];
	const btwPercentages = [0.06, 0.21, 0.21];

	const aantalInputs = document.querySelectorAll(".aantal");
	const subtotaalVelden = document.querySelectorAll(".subtotaal");
	const totaalVeld = document.getElementById("totaal");
	const herberekenButton = document.getElementById("herbereken");

	const herbereken = () => {
		let totaal = 0;

		aantalInputs.forEach((input, index) => {
			let aantal = parseInt(input.value);
			let prijs = prijzen[index];
			let btw = btwPercentages[index];

			let subtotaal = aantal * prijs * (1 + btw);
			subtotaalVelden[index].textContent = subtotaal.toFixed(2) + " Eur";

			totaal += subtotaal;
		});

		totaalVeld.textContent = totaal.toFixed(2) + " Eur";
	};

	herberekenButton.addEventListener("click", herbereken);
}
window.addEventListener("load", setup);