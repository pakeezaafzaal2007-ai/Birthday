/* FATIMA'S BIRTHDAY WEBSITE */

/* GIFT MESSAGES */

const giftMessages = {
    1: {
        icon: "💗",
        title: "A Little Reminder",
        message: "You are loved more than you know. I hope this year brings you peace, laughter, and countless reasons to smile. ♡"
    },

    2: {
        icon: "🐰",
        title: "A Wish For You",
        message: "May all your dreams find their way to you. Keep being your lovely, funny, wonderfully unique self. 🌷"
    },

    3: {
        icon: "🐧",
        title: "From Your Penguin",
        message: "No matter how busy life gets, I hope we always make room for our silly jokes, little memories, and friendship. Happy Birthday, Fatima! 💕"
    }
};


/* OPEN GIFT */

function openGift(number) {
    const gift = document.getElementById(`gift${number}`);
    const overlay = document.getElementById("surpriseOverlay");
    const icon = document.getElementById("revealIcon");
    const title = document.getElementById("revealTitle");
    const message = document.getElementById("revealMessage");

    const data = giftMessages[number];

    if (!gift || !overlay || !data) {
        return;
    }

    document.querySelectorAll(".gift").forEach(item => {
        item.classList.remove("open");
    });

    gift.classList.add("open");

    icon.textContent = data.icon;
    title.textContent = data.title;
    message.textContent = data.message;

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}


/* CLOSE GIFT */

function closeGift() {
    const overlay = document.getElementById("surpriseOverlay");

    if (overlay) {
        overlay.classList.remove("active");
    }

    document.body.style.overflow = "";
}


/* CREATE FALLING DECORATIONS */

function createFallingDecoration(container) {
    const symbols = [
        "💗",
        "🌸",
        "✨",
        "🎀",
        "⭐",
        "💕"
    ];

    const item = document.createElement("span");

    item.className = "celebration-fall";

    item.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = `${Math.random() * 100}%`;

    item.style.fontSize =
        `${14 + Math.random() * 20}px`;

    item.style.setProperty(
        "--fall-duration",
        `${4 + Math.random() * 3}s`
    );

    container.appendChild(item);

    item.addEventListener("animationend", () => {
        item.remove();
    }, { once: true });
}


/* START BIRTHDAY CELEBRATION */

function startBirthday() {

    // Prevent duplicate celebrations
    if (document.querySelector(".birthday-celebration")) {
        return;
    }

    const celebration = document.createElement("section");

    celebration.className = "birthday-celebration";

    celebration.setAttribute(
        "aria-label",
        "Birthday celebration"
    );


    /* BIRTHDAY BANNER */

    const banner = document.createElement("div");

    banner.className = "birthday-banner";

    banner.textContent =
        "A Special Birthday Surprise!";


    /* PENGUIN */

    const penguin = document.createElement("div");

    penguin.className = "penguin-delivery";


    const image = document.createElement("img");

    image.className = "celebration-penguin";

    image.src = "assets/images/penguin-billboard.png";

    image.alt = "A penguin holding a birthday message";


    // Fallback if the penguin image is missing

    image.addEventListener("error", () => {

        image.remove();

        const fallback = document.createElement("div");

        fallback.className = "penguin-image-fallback";

        fallback.textContent = "🐧";

        fallback.setAttribute("aria-label", "Penguin");

        penguin.appendChild(fallback);

    }, { once: true });


    /* MESSAGE ON BILLBOARD */

    const messageOnBoard = document.createElement("div");

    messageOnBoard.className = "billboard-message";

    messageOnBoard.innerHTML = `
        <h2>Happy Birthday, Fatima! 💗</h2>

        <p>
            May your days be filled with happiness,
            laughter and love.
        </p>

        <p>
            You deserve all the beautiful things
            life has to offer.
        </p>

        <p class="note-signature">
            With love, Your Penguin 🐧
        </p>
    `;


    /* FINAL MESSAGE */

    const finalMessage = document.createElement("p");

    finalMessage.className = "celebration-message";

    finalMessage.textContent =
        "Keep smiling, birthday girl! 🎂✨";


    /* ADD ELEMENTS */

    penguin.append(image, messageOnBoard);

    celebration.append(
        banner,
        penguin,
        finalMessage
    );

    document.body.appendChild(celebration);


    /* PENGUIN CELEBRATION ANIMATION */

    window.setTimeout(() => {

        penguin.classList.add("celebrating");

    }, 2600);


    /* FALLING HEARTS AND FLOWERS */

    const decorationTimer = window.setInterval(() => {

        if (document.body.contains(celebration)) {

            createFallingDecoration(celebration);

        } else {

            window.clearInterval(decorationTimer);

        }

    }, 280);


    /* REMOVE CELEBRATION AFTER 12 SECONDS */

    window.setTimeout(() => {

        celebration.classList.add("fade-out");

        window.setTimeout(() => {

            celebration.remove();

            window.clearInterval(decorationTimer);

        }, 1100);

    }, 12000);
}


/* WEBSITE INITIALIZATION */

document.addEventListener("DOMContentLoaded", () => {

    const startButton =
        document.getElementById("startBirthdayBtn");

    const music =
        document.getElementById("birthdayMusic");

    const welcomeScreen =
        document.getElementById("musicWelcomeScreen");

    const musicStatus =
        document.getElementById("musicStatus");


    /* START BUTTON */

    if (startButton && music && welcomeScreen) {

        startButton.addEventListener("click", async () => {

            startButton.disabled = true;

            if (musicStatus) {
                musicStatus.textContent =
                    "Starting your birthday surprise... 🎵";
            }

            try {

                music.volume = 0.6;

                // Start background music
                await music.play();

                // Start penguin celebration
                startBirthday();

                // Hide welcome screen
                welcomeScreen.classList.add("is-hidden");

            } catch (error) {

                console.error(
                    "Could not play birthday music:",
                    error
                );

                if (musicStatus) {
                    musicStatus.textContent =
                        "Music couldn't start. Check assets/audio/alfaz.m4a and try again.";
                }

                startButton.disabled = false;
            }

        });

    }


    /* CLOSE GIFT BY CLICKING OUTSIDE */

    const overlay =
        document.getElementById("surpriseOverlay");

    if (overlay) {

        overlay.addEventListener("click", event => {

            if (event.target === overlay) {
                closeGift();
            }

        });

    }


    /* CLOSE GIFT USING ESCAPE KEY */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeGift();
        }

    });

});