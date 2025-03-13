const setup = () => {
	let woord = "onoorbaar"
	let teller = 3;

	for (let i = 0; i < (woord.length - 2); i++) {
		console.log(woord.substring(i, teller));
		teller++;
	}
}
window.addEventListener("load", setup);

