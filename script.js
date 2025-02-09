
const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you ABSOLUTELY sure?",
    "Boo please...",
    "BOOOO PLEASE!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️",
    "BOOOOOOOOOOOO",
    
];

const gifs = [
    "https://media.tenor.com/amRuuQRN6d0AAAAj/love.gif",
    "https://media.tenor.com/FqmLppcMe6gAAAAj/lovemode-cute.gif",
    "https://media.tenor.com/btTaqabFAFIAAAAj/white-bear.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm05bWoycmFsMHprMWxmNmNuZDJ4YzFsZ3VpZWh3anIzY2NxaDFmMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/e1Tf1eOo6976zuGv3C/giphy.gif",
    "https://media.tenor.com/DvWwqDSpr3MAAAAj/mochi-peach.gif",
    "https://media1.tenor.com/m/QWxVG7gnDOgAAAAd/please-cute.gif",
]

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    const gif = document.querySelector('.gif_container img');

    gif.src = gifs[Math.floor(Math.random() * gifs.length)];

    
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}