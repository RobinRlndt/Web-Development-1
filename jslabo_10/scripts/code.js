let global = {
    globalId: 0,
    historyArray: []
};

const setup = () => {
    const opgeslagen = localStorage.getItem("startPage");
    if (opgeslagen) {
        const items = JSON.parse(opgeslagen);
        items.forEach(item => {
            if (item.data_id >= global.globalId) {
                global.globalId = item.data_id + 1;
            }
            global.historyArray.push(item);
            createCard(item);
        });
    }

    const input = document.getElementById("txtZoekOpdracht");
    const btn = document.getElementById("btnZoek");

    btn.addEventListener("click", () => {
        const zoekopdracht = input.value.trim();
        if (!zoekopdracht) {
            alert("Voer een zoekopdracht in!");
            return;
        }
        voegHistoryToe(zoekopdracht);
        input.value = "";
    });

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") btn.click();
    });
};

window.addEventListener("load", setup);

const zoekOpdrachtResultaat = (zoekopdracht) => {
    zoekopdracht = zoekopdracht.trim();
    if (zoekopdracht.startsWith("/g")) {
        const q = zoekopdracht.slice(2).trim();
        if (!q) return { error: "Geen zoekterm opgegeven voor Google." };
        return {
            title: "Google",
            text: q,
            url: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
            color: "google"
        };
    }
    if (zoekopdracht.startsWith("/y")) {
        const q = zoekopdracht.slice(2).trim();
        if (!q) return { error: "Geen zoekterm opgegeven voor YouTube." };
        return {
            title: "YouTube",
            text: q,
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
            color: "youtube"
        };
    }
    if (zoekopdracht.startsWith("/x")) {
        const q = zoekopdracht.slice(2).trim();
        if (!q) return { error: "Geen zoekterm opgegeven voor Twitter." };
        return {
            title: "Twitter",
            text: q,
            url: `https://twitter.com/search?q=${encodeURIComponent(q)}`,
            color: "twitter"
        };
    }
    if (zoekopdracht.startsWith("/l")) {
        const q = zoekopdracht.slice(2).trim();
        if (!q) return { error: "Geen zoekterm opgegeven voor Instagram." };
        return {
            title: "Instagram",
            text: q,
            url: `https://www.instagram.com/explore/tags/${encodeURIComponent(q)}`,
            color: "instagram"
        };
    }
    if (/^\/(?![gyxl])/.test(zoekopdracht)) {
        return { error: "Onbekend commando prefix." };
    }
    return { error: "Ongeldig commando." };
};

const voegHistoryToe = (zoekopdracht) => {
    const resultaat = zoekOpdrachtResultaat(zoekopdracht);
    if (resultaat.error) {
        alert(resultaat.error);
        return;
    }

    const exists = global.historyArray.some(item =>
        item.title === resultaat.title &&
        item.text === resultaat.text
    );
    if (exists) {
        alert("History-card bestaat al!");
        return;
    }

    resultaat.data_id = global.globalId++;
    global.historyArray.push(resultaat);
    localStorage.setItem("startPage", JSON.stringify(global.historyArray));
    createCard(resultaat);
};

const createCard = (item) => {
    const container = document.querySelector(".history-container");
    const card = document.createElement("div");
    card.className = `card-container ${item.color}`;
    card.setAttribute("data-id", item.data_id);

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = item.title;

    const text = document.createElement("p");
    text.className = "card-text";
    text.textContent = item.text;

    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "GO!";

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "delete-btn";
    delBtn.style.backgroundColor = "white";
    delBtn.style.fontWeight = "bold";
    delBtn.style.borderRadius = "5px";

    link.addEventListener("click", e => {
        e.preventDefault();
        window.open(item.url, "_blank");
    });
    delBtn.addEventListener("click", () => removeCard(item.data_id));

    card.append(title, text, link, delBtn);
    container.appendChild(card);
};

const removeCard = (id) => {
    const card = document.querySelector(`.card-container[data-id="${id}"]`);
    if (card) card.remove();
    global.historyArray = global.historyArray.filter(item => item.data_id !== id);
    localStorage.setItem("startPage", JSON.stringify(global.historyArray));
};



