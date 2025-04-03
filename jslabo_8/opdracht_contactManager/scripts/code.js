let personen = [];
let indexPersoon = -1;

const setup = () => {
    const btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    const btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", bewerkNieuwePersoon);

    const lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.addEventListener("change", toonPersoonDetails);

    const btnVerwijder = document.getElementById("btnVerwijder");
    btnVerwijder.addEventListener("click", verwijderPersoon);

    updatePersonenLijst();
};

const bewaarBewerktePersoon = () => {
    console.log("Klik op de knop bewaar");

    // Haal gegevens uit de invoervelden
    const voornaam = document.getElementById("txtVoornaam").value.trim();
    const familienaam = document.getElementById("txtFamilienaam").value.trim();
    const geboortedatum = document.getElementById("txtGeboorteDatum").value.trim();
    const email = document.getElementById("txtEmail").value.trim();
    const aantalKinderen = document.getElementById("txtAantalKinderen").value.trim();

    // Controleer of de persoon al bestaat
    const gevonden = personen.find(persoon =>
        persoon.voornaam.toLowerCase() === voornaam.toLowerCase() &&
        persoon.familienaam.toLowerCase() === familienaam.toLowerCase() &&
        persoon.email.toLowerCase() === email.toLowerCase()
    );

    if (!gevonden && indexPersoon === -1) {
        // Voeg nieuwe persoon toe
        personen.push({ voornaam, familienaam, geboortedatum, email, aantalKinderen });
        updatePersonenLijst();
        resetForm();
    } else if (indexPersoon !== -1) {
        // Update bestaande persoon
        personen[indexPersoon] = { voornaam, familienaam, geboortedatum, email, aantalKinderen };
        updatePersonenLijst();
        resetForm();
        indexPersoon = -1;
    } else {
        console.log("Persoon bestaat al in de lijst.");
    }
};

const updatePersonenLijst = () => {
    const lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.innerHTML = "";

    personen.forEach((persoon, index) => {
        const option = new Option(`${persoon.voornaam} ${persoon.familienaam}`, index.toString());
        lstPersonen.add(option);
    });

    if (indexPersoon >= 0 && indexPersoon < personen.length) {
        lstPersonen.selectedIndex = indexPersoon;
    }
};

const bewerkNieuwePersoon = () => {
    console.log("Klik op de knop nieuw");
    indexPersoon = -1;
    resetForm();
};

const verwijderPersoon = () => {
    if (indexPersoon !== -1) {
        personen.splice(indexPersoon, 1);
        updatePersonenLijst();
        resetForm();
        indexPersoon = -1;
    }
};

const toonPersoonDetails = (event) => {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex >= 0) {
        indexPersoon = selectedIndex;
        const persoon = personen[indexPersoon];
        document.getElementById("txtVoornaam").value = persoon.voornaam;
        document.getElementById("txtFamilienaam").value = persoon.familienaam;
        document.getElementById("txtGeboorteDatum").value = persoon.geboortedatum;
        document.getElementById("txtEmail").value = persoon.email;
        document.getElementById("txtAantalKinderen").value = persoon.aantalKinderen;
    }
};

const resetForm = () => {
    document.getElementById("txtVoornaam").value = "";
    document.getElementById("txtFamilienaam").value = "";
    document.getElementById("txtGeboorteDatum").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtAantalKinderen").value = "";
};

window.addEventListener("load", setup);



