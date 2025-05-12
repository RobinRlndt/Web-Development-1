const setup = () => {
    // Laad keuzes uit localStorage
    const opgeslagen = localStorage.getItem('movieChoices');
    window.movieChoices = opgeslagen ? JSON.parse(opgeslagen) : {};

    inladenMovies();
    updateCountersAndLikebar();

    const movielist = document.getElementById("movielist");
    movielist.addEventListener("click", handleButtonClick);
    movielist.addEventListener("dblclick", handleButtonDblClick);
};

const inladenMovies = () => {
    const movieList = document.getElementById("movielist");
    movieList.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie";

        const title = document.createElement("h3");
        title.textContent = movie.title;
        card.appendChild(title);

        const buttons = document.createElement("div");
        buttons.className = "buttons";

        // Like button
        const likeButton = document.createElement("div");
        likeButton.className = "button";
        likeButton.id = `likecounter-${movie.id}`;
        const likeIcon = document.createElement("i");
        likeIcon.className = "fas fa-thumbs-up";
        likeButton.appendChild(likeIcon);
        buttons.appendChild(likeButton);

        // Dislike button
        const dislikeButton = document.createElement("div");
        dislikeButton.className = "button";
        dislikeButton.id = `dislikecounter-${movie.id}`;
        const dislikeIcon = document.createElement("i");
        dislikeIcon.className = "fas fa-thumbs-down";
        dislikeButton.appendChild(dislikeIcon);
        buttons.appendChild(dislikeButton);

        // Kleur de knop als er al een keuze is gemaakt
        const keuze = window.movieChoices[movie.id];
        if (keuze === "like") {
            likeButton.style.color = "green";
            dislikeButton.style.color = "gray";
        } else if (keuze === "dislike") {
            dislikeButton.style.color = "red";
            likeButton.style.color = "gray";
        } else {
            likeButton.style.color = "gray";
            dislikeButton.style.color = "gray";
        }

        card.appendChild(buttons);

        const img = document.createElement("img");
        img.src = movie.imageUrl;
        img.alt = movie.title;
        card.appendChild(img);

        const description = document.createElement("p");
        description.textContent = movie.description;
        card.appendChild(description);

        movieList.appendChild(card);
    });
};

const handleButtonClick = (event) => {
    const btn = event.target.closest('.button');
    if (!btn) return;

    const [type, ...idParts] = btn.id.split('-');
    const movieId = idParts.join('-');

    // Mag maar één keer kiezen per film
    if (window.movieChoices[movieId]) return;

    if (type === "likecounter") {
        window.movieChoices[movieId] = "like";
    } else if (type === "dislikecounter") {
        window.movieChoices[movieId] = "dislike";
    } else {
        return;
    }

    localStorage.setItem("movieChoices", JSON.stringify(window.movieChoices));
    inladenMovies();
    updateCountersAndLikebar();
};

const handleButtonDblClick = (event) => {
    const btn = event.target.closest('.button');
    if (!btn) return;

    const [type, ...idParts] = btn.id.split('-');
    const movieId = idParts.join('-');

    // Alleen als er al een keuze was
    if (window.movieChoices[movieId]) {
        delete window.movieChoices[movieId];
        localStorage.setItem("movieChoices", JSON.stringify(window.movieChoices));
        inladenMovies();
        updateCountersAndLikebar();
    }
};

const updateCountersAndLikebar = () => {
    // Totaal aantal likes en dislikes
    let likes = 0, dislikes = 0;
    for (const key in window.movieChoices) {
        if (window.movieChoices[key] === "like") likes++;
        if (window.movieChoices[key] === "dislike") dislikes++;
    }

    // Update counters bovenaan de pagina
    document.getElementById("like").textContent = likes;
    document.getElementById("dislike").textContent = dislikes;

    // Liked movies bar vullen
    const likebar = document.getElementById("likebar");
    const likebarmovies = document.getElementById("likebarmovies");
    likebarmovies.innerHTML = "";

    // Voeg titels toe van alle gelikete films
    movies.forEach(movie => {
        if (window.movieChoices[movie.id] === "like") {
            const div = document.createElement("div");
            div.textContent = movie.title;
            likebarmovies.appendChild(div);
        }
    });

    // Toon of verberg de likebar
    if (likes > 0) {
        likebar.style.visibility = "visible";
    } else {
        likebar.style.visibility = "hidden";
    }
};

window.addEventListener("load", setup);







