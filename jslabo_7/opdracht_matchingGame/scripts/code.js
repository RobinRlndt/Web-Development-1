let global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    GAMEBOARD: document.getElementById("speelVeld"),
    omgedraaideKaarten: [],
    isDraaiBezig: false,
    audioJuist: new Audio("audio/audioJuist.mp3"),
    audioFout: new Audio("audio/audioFout.mp3"),
    audioGewonnen: new Audio("audio/victorySound.mp3"),
    audioKlik: new Audio("audio/audioKlik.mp3"),
    audioTerugdraai: new Audio("audio/audioTerugdraai.mp3"),
    imgKaarten: [],
    AANTAL_GELIJKE_KAARTEN: 3, // Initialize with a default value
    AANTAL_KAARTEN: 4,

}

const herstartKnop = document.getElementById('herstartKnop');
const aantalGelijkeKaartenSwitch = document.getElementById('aantalGelijkeKaartenSwitch');

function optimizeGridLayout(numItems, containerWidth, containerHeight) {
    let bestRows = 1;
    let bestCols = numItems;
    let minWaste = Infinity;

    const aspectRatio = containerWidth / containerHeight;

    for (let rows = 1; rows <= numItems; rows++) {
        const cols = Math.ceil(numItems / rows);
        const cellAspectRatio = cols / rows;

        // Calculate "waste" - the difference between container ratio and grid cell ratio
        const waste = Math.abs(aspectRatio - cellAspectRatio);

        if (waste < minWaste) {
            minWaste = waste;
            bestRows = rows;
            bestCols = cols;
        }
    }

    return {
        rows: bestRows,
        cols: bestCols
    };
}

const setup = () => {
    global.GAMEBOARD.replaceChildren();
    const switchState = aantalGelijkeKaartenSwitch.checked;
    global.AANTAL_GELIJKE_KAARTEN = switchState ? 3 : 2;
    global.AANTAL_KAARTEN = (global.AANTAL_GELIJKE_KAARTEN === 3) ? 4 : 6;

    // Dynamically generate images
    global.imgKaarten = [];
    for (let i = 1; i <= global.AANTAL_KAARTEN; i++) {
        global.imgKaarten.push(`kaart${i}.png`);
    }
    global.imgKaarten.push("achterkant.png");

    const numCards = global.AANTAL_KAARTEN * global.AANTAL_GELIJKE_KAARTEN;
    const gameBoardWidth = global.GAMEBOARD.clientWidth;
    const gameBoardHeight = global.GAMEBOARD.clientHeight;
    const {
        rows,
        cols
    } = optimizeGridLayout(numCards, gameBoardWidth, gameBoardHeight);

    global.GAMEBOARD.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    global.GAMEBOARD.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    voegKaartenToe();
}

const voegKaartenToe = () => {
    const kaartenSet = [];
    for (let i = 0; i < global.AANTAL_KAARTEN; i++) {
        for (let j = 0; j < global.AANTAL_GELIJKE_KAARTEN; j++) {
            kaartenSet.push(global.imgKaarten[i]);
        }
    }

    kaartenSet.sort(() => Math.random() - 0.5);

    kaartenSet.forEach(kaartId => {
        const kaart = maakKaartElement(kaartId);
        global.GAMEBOARD.appendChild(kaart);
    });
}

const maakKaartElement = (kaartId) => {
    const kaart = document.createElement('img');
    kaart.src = `images/${global.imgKaarten[global.imgKaarten.length - 1]}`;
    kaart.dataset.kaartId = kaartId;
    kaart.dataset.gedraaid = 'false';
    kaart.alt = 'Kaart achterkant';
    kaart.classList.add('kaart');
    kaart.addEventListener('click', draaiKaart);
    return kaart;
}

const draaiKaart = (event) => {
    if (global.isDraaiBezig) return;

    const kaart = event.target;
    if (kaart.dataset.gedraaid === 'true' || kaart.classList.contains('verwijderd')) return;

    global.audioKlik.currentTime = 0;
    global.audioKlik.play();

    kaart.src = `images/${kaart.dataset.kaartId}`;
    kaart.dataset.gedraaid = 'true';
    global.omgedraaideKaarten.push(kaart);

    if (global.omgedraaideKaarten.length === global.AANTAL_GELIJKE_KAARTEN) {
        global.isDraaiBezig = true;
        const eersteKaartId = global.omgedraaideKaarten[0].dataset.kaartId;
        const zijnGelijk = global.omgedraaideKaarten.every(kaart => kaart.dataset.kaartId === eersteKaartId);

        if (zijnGelijk) {
            global.audioJuist.currentTime = 0;
            global.audioJuist.play();
        } else {
            global.audioFout.currentTime = 0;
            global.audioFout.play();
        }

        global.omgedraaideKaarten.forEach(kaart => {
            kaart.classList.add(zijnGelijk ? 'correct' : 'incorrect');
        });

        setTimeout(() => {
            global.omgedraaideKaarten.forEach(kaart => {
                kaart.classList.remove(zijnGelijk ? 'correct' : 'incorrect');
            });

            if (zijnGelijk) {
                global.omgedraaideKaarten.forEach(kaart => {
                    kaart.classList.add('verwijderd');
                });
            } else {
                global.audioTerugdraai.currentTime = 0;
                global.audioTerugdraai.play();
                global.omgedraaideKaarten.forEach(kaart => {
                    kaart.src = `images/${global.imgKaarten[global.imgKaarten.length - 1]}`;
                    kaart.dataset.gedraaid = 'false';
                });
            }

            global.omgedraaideKaarten = [];
            global.isDraaiBezig = false;

            const verwijderdeKaarten = document.querySelectorAll('.verwijderd');
            if (verwijderdeKaarten.length === global.AANTAL_KAARTEN * global.AANTAL_GELIJKE_KAARTEN) {
                global.audioGewonnen.addEventListener('loadedmetadata', function () {
                    const victorySoundDuration = global.audioGewonnen.duration * 1000;

                    global.audioGewonnen.currentTime = 0;
                    global.audioGewonnen.play();

                    setTimeout(() => {
                        alert('Gefeliciteerd! Je hebt gewonnen!');
                    }, victorySoundDuration);
                });
                global.audioGewonnen.load();
            }
        }, 1000);
    }
}

const herstartSpel = () => {
    global.omgedraaideKaarten = [];
    global.isDraaiBezig = false;
    setup();
}

herstartKnop.addEventListener('click', herstartSpel);
aantalGelijkeKaartenSwitch.addEventListener('change', setup);
window.addEventListener("load", setup);









