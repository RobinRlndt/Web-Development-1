let global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    AANTAL_KAARTEN: 6,
    AANTAL_GELIJKE_KAARTEN: 2,
    GAMEBOARD: document.getElementById("speelVeld"),
    omgedraaideKaarten: [],
    isDraaiBezig: false,
    audioGeluiden: [
        new Audio("audio/geluid1.mp3"),
        new Audio("audio/geluid2.mp3"),
        new Audio("audio/geluid3.mp3"),
        new Audio("audio/geluid4.mp3"),
        new Audio("audio/geluid5.mp3"),
        new Audio("audio/geluid6.mp3")
    ]
}

const herstartKnop = document.getElementById('herstartKnop');

function optimizeGridLayout(numItems, containerWidth, containerHeight) {
    let bestRows = 1;
    let bestCols = numItems;
    let bestRatio = Infinity;
    const targetRatio = containerWidth / containerHeight;

    for (let rows = 1; rows <= numItems; rows++) {
        const cols = Math.ceil(numItems / rows);
        if (numItems % rows === 0) {
            const ratio = (cols / rows) / targetRatio;
            if (Math.abs(1 - ratio) < Math.abs(1 - bestRatio)) {
                bestRows = rows;
                bestCols = cols;
                bestRatio = ratio;
            }
        }
    }

    return {
        rows: bestRows,
        cols: bestCols,
        cellWidth: containerWidth / bestCols,
        cellHeight: containerHeight / bestRows
    };
}

const setup = () => {
    global.GAMEBOARD.replaceChildren();

    const numItems = global.AANTAL_HORIZONTAAL * global.AANTAL_VERTICAAL;
    const layout = optimizeGridLayout(numItems, global.GAMEBOARD.clientWidth, global.GAMEBOARD.clientHeight);

    global.GAMEBOARD.style.gridTemplateColumns = `repeat(${layout.cols}, 1fr)`;
    global.GAMEBOARD.style.gridTemplateRows = `repeat(${layout.rows}, 1fr)`;

    const kaartStyle = document.createElement('style');
    kaartStyle.textContent = `
        .kaart {
            width: ${layout.cellWidth}px;
            height: ${layout.cellHeight}px;
        }
    `;
    document.head.appendChild(kaartStyle);

    voegKaartenToe();
}

const voegKaartenToe = () => {
    const kaartenSet = [];
    for (let i = 0; i < global.AANTAL_KAARTEN; i++) {
        for (let j = 0; j < global.AANTAL_GELIJKE_KAARTEN; j++) {
            kaartenSet.push(i);
        }
    }

    kaartenSet.sort(() => Math.random() - 0.5);

    kaartenSet.forEach(geluidId => {
        const kaart = maakKaartElement(geluidId);
        global.GAMEBOARD.appendChild(kaart);
    });
}

const maakKaartElement = (geluidId) => {
    const kaart = document.createElement('div');
    kaart.dataset.geluidId = geluidId;
    kaart.dataset.gedraaid = 'false';
    kaart.classList.add('kaart');
    kaart.addEventListener('click', draaiKaart);
    return kaart;
}

const draaiKaart = (event) => {
    if (global.isDraaiBezig) return;

    const kaart = event.target;
    if (kaart.dataset.gedraaid === 'true' || kaart.classList.contains('verwijderd')) return;

    const geluidId = parseInt(kaart.dataset.geluidId);

    global.audioGeluiden[geluidId].currentTime = 0;
    global.audioGeluiden[geluidId].play();

    kaart.dataset.gedraaid = 'true';
    global.omgedraaideKaarten.push(kaart);

    if (global.omgedraaideKaarten.length === global.AANTAL_GELIJKE_KAARTEN) {
        global.isDraaiBezig = true;
        const eersteGeluidId = global.omgedraaideKaarten[0].dataset.geluidId;
        const zijnGelijk = global.omgedraaideKaarten.every(kaart => kaart.dataset.geluidId === eersteGeluidId);


        global.omgedraaideKaarten.forEach(kaart => {
            kaart.classList.add(zijnGelijk ? 'correct' : 'incorrect');
        });

        setTimeout(() => {
            global.omgedraaideKaarten.forEach(kaart => {
                kaart.classList.remove('correct', 'incorrect');
            });
            if (zijnGelijk) {
                global.omgedraaideKaarten.forEach(kaart => {
                    kaart.classList.add('verwijderd');
                });
            } else {
                global.omgedraaideKaarten.forEach(kaart => {
                    kaart.dataset.gedraaid = 'false';
                });
            }

            global.omgedraaideKaarten = [];
            global.isDraaiBezig = false;

            if (document.querySelectorAll('.verwijderd').length ===
                global.AANTAL_HORIZONTAAL * global.AANTAL_VERTICAAL) {
                alert('Gefeliciteerd! Je hebt gewonnen!')
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
window.addEventListener("load", setup);











