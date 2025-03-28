let global = {
    IMAGE_COUNT: 5,
    IMAGE_SIZE: 48,
    IMAGE_PATH_PREFIX: "images/",
    IMAGE_PATH_SUFFIX: ".png",
    MOVE_DELAY: 1000,
    score: 0,
    intervalId: null,
    isGameRunning: false,
    consoleIntervalId: null
};

const setup = () => {
    let icon = document.getElementById("target");
    let startButton = document.getElementById("startButton");

    const changePlace = () => {
        let playField = document.getElementById("playField");
        let maxX = playField.clientWidth - global.IMAGE_SIZE;
        let maxY = playField.clientHeight - global.IMAGE_SIZE;
        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);
        icon.style.left = randomX + "px";
        icon.style.top = randomY + "px";
    }

    const changeImage = () => {
        let randomImgNumber = Math.floor(Math.random() * global.IMAGE_COUNT);
        icon.src = `${global.IMAGE_PATH_PREFIX}${randomImgNumber}${global.IMAGE_PATH_SUFFIX}`;
    }

    const updateScore = () => {
        global.score++;
        document.getElementById("score").textContent = global.score;
    }

    const change = () => {
        if (global.isGameRunning) {
            changePlace();
            changeImage();
        }
    }

    const startGame = () => {
        console.log("startGame functie aangeroepen");
        if (!global.isGameRunning) {
            global.isGameRunning = true;
            global.score = 0;
            document.getElementById("score").textContent = global.score;
            global.intervalId = setInterval(change, global.MOVE_DELAY);
            startButton.textContent = "STOP Spel";


            global.consoleIntervalId = setInterval(() => {
                console.log("Spel loopt...");
            }, 1000);
        } else {
            stopGame();
        }
    }

    const stopGame = () => {
        global.isGameRunning = false;
        clearInterval(global.intervalId);
        clearInterval(global.consoleIntervalId);
        startButton.textContent = "START Spel";
    }

    const handleClick = () => {
        if (global.isGameRunning) {
            let currentImage = icon.src.split('/').pop().split('.')[0];
            if (currentImage === '0') {
                alert("GAME OVER. Your score: " + global.score);
                stopGame();
            } else {
                updateScore();
            }
        }
    }

    icon.addEventListener("click", handleClick);
    startButton.addEventListener("click", startGame);
}

window.addEventListener("load", setup);


