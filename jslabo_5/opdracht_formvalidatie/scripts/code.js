const setup = () => {
	let btnValideer = document.getElementById("btnValideer");
	btnValideer.addEventListener("click", valideer);
};

const valideer = () => {
	let isValid = true;
	isValid = valideerVoornaam() && isValid;
	isValid = valideerFamilienaam() && isValid;
	isValid = valideerGeboortedatum() && isValid;
	isValid = valideerEmail() && isValid;
	isValid = valideerAantalKinderen() && isValid;

	if (isValid) {
		alert('proficiat!');
	}
}

const valideerVoornaam = () => {
	let txtVoornaam = document.getElementById("txtVoornaam");
	let voornaam = txtVoornaam.value.trim();

	if (voornaam.length > 30) {
		reportError(txtVoornaam, "max. 30 karakters");
		return false;
	} else {
		clearError(txtVoornaam);
		return true;
	}
}

const valideerFamilienaam = () => {
	let txtFamilienaam = document.getElementById("txtFamilienaam");
	let familienaam = txtFamilienaam.value.trim();

	if (familienaam === "") {
		reportError(txtFamilienaam, "verplicht veld");
		return false;
	} else if (familienaam.length > 50) {
		reportError(txtFamilienaam, "max 50 karakters");
		return false;
	} else {
		clearError(txtFamilienaam);
		return true;
	}
}

const valideerGeboortedatum = () => {
	let txtGeboortedatum = document.getElementById("txtGeboortedatum");
	let geboortedatum = txtGeboortedatum.value.trim();

	if (geboortedatum === "") {
		reportError(txtGeboortedatum, "verplicht veld");
		return false;
	} else if (!isGeldigeISODatum(geboortedatum)) {
		reportError(txtGeboortedatum, "formaat is niet jjjj-mm-dd");
		return false;
	} else {
		clearError(txtGeboortedatum);
		return true;
	}
}

const isGeldigeISODatum = (datum) => {
	let delen = datum.split('-');
	if (delen.length !== 3) return false;
	let [jaar, maand, dag] = delen;
	return jaar.length === 4 && isGetal(jaar) &&
		maand.length === 2 && isGetal(maand) &&
		dag.length === 2 && isGetal(dag);
}

const valideerEmail = () => {
	let txtEmail = document.getElementById("txtEmail");
	let email = txtEmail.value.trim();

	// Regex pattern voor email validatie
	const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

	if (email === "") {
		reportError(txtEmail, "verplicht veld");
		return false;
	} else if (!emailRegex.test(email)) {
		reportError(txtEmail, "geen geldig email adres");
		return false;
	} else {
		clearError(txtEmail);
		return true;
	}
}

const valideerAantalKinderen = () => {
	let txtAantalKinderen = document.getElementById("txtAantalKinderen");
	let aantalKinderen = txtAantalKinderen.value.trim();

	if (!isGetal(aantalKinderen) || parseFloat(aantalKinderen) < 0) {
		reportError(txtAantalKinderen, "is geen positief getal");
		return false;
	} else if (parseInt(aantalKinderen) >= 99) {
		reportError(txtAantalKinderen, "is te vruchtbaar");
		return false;
	} else {
		clearError(txtAantalKinderen);
		return true;
	}
}

const isGetal = (tekst) => {
	return !isNaN(tekst);
}

const reportError = (element, message) => {
	let elementId = element.getAttribute("id");
	let errElementId = "err" + elementId.substring(3, elementId.length);
	let errElement = document.getElementById(errElementId);
	element.className = "invalid";
	errElement.innerHTML = message;
}

const clearError = (element) => {
	let elementId = element.getAttribute("id");
	let errElementId = "err" + elementId.substring(3, elementId.length);
	let errElement = document.getElementById(errElementId);
	element.className = "";
	errElement.innerHTML = "";
}

window.addEventListener("load", setup);
