const setup = () => {
	const vervangDeMetHet = (tekst) => {
		let resultaat = "";

		for (let i = 0; i < tekst.length; i++) {
			if (tekst[i] === 'd' && tekst[i + 1] === 'e' &&
				(i === 0 || !isLetter(tekst[i - 1])) &&
				(i === tekst.length - 2 || !isLetter(tekst[i + 2]))) {
				resultaat += "het";
				i++;
			} else {
				resultaat += tekst[i];
			}
		}
		console.log(resultaat);
	}

	function isLetter(char) {
		return /[a-zA-Z]/.test(char);
	}

	vervangDeMetHet("Gisteren zat de jongen op de stoep en at de helft van de appel");
	vervangDeMetHet("de man riep de");



}
window.addEventListener("load", setup);

