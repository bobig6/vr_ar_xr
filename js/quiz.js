// Quiz System for Prom Invitation

// Quiz questions and options
const quizQuestions = [
    {
        question: "Do you love me?",
        options: [
            { text: "Yes, I love you!", isYes: true },
            { text: "I love you more than words can express!", isYes: true },
            { text: "I love you with all my heart!", isYes: true },
            { text: "No, you are annoying!", isYes: false }
        ]
    },
    {
        question: "Are you sure?",
        options: [
            { text: "Yes, I am sure!", isYes: true },
            { text: "No", isYes: false },
            { text: "Boo, I love you!", isYes: true },
            { text: "I am absolutely sure!", isYes: true },
        ]
    },
    {
        question: "Boo, will you leave me?",
        options: [
            { text: "No, I will never leave you!", isYes: true },
            { text: "I love you no matter what!", isYes: true },
            { text: "Yes I will leave you!", isYes: false },
            { text: "I love you with all my heart!", isYes: true },
        ]
    },
    {
        question: "Would you still love me if I was ugly?",
        options: [
            { text: "Yes, I would still love you!", isYes: true },
            { text: "You are beautiful no matter what!", isYes: true },
            { text: "You are already ugly!", isYes: false },
            { text: "You can never be ugly! You are beautiful!", isYes: true }
        ]
    },
    {
        question: "Final question: Will you go to prom with me?",
        options: [
            { text: "Yes, absolutely!", isYes: true },
            { text: "Of course I will!", isYes: true },
            { text: "I'd love to!", isYes: true },
            { text: "No", isYes: false }
        ]
    }
];

// Funny messages for "No" attempts
const noMessages = [
    "Are you sure?",
    "Boo, please...",
    "Really sure??",
    "Think again...",
    "Please reconsider!",
    "That's not the right answer...",
    "Maybe try another option?",
    "Boo...",
    "Don't break my heart!",
    "One more chance?",
    "Ok fine, I'll stop asking... just kidding, please say yes!"
];

// Current question index
let currentQuestionIndex = 0;
let noAttempts = 0;

// DOM Elements
const landingPage = document.getElementById('landing-page');
const quizSection = document.getElementById('quiz-section');
const celebrationPage = document.getElementById('celebration-page');
const progressBar = document.getElementById('progress-bar');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const confettiCanvas = document.getElementById('confetti-canvas');

// Initialize the quiz
function initQuiz() {
    // Hide landing page and show quiz section
    landingPage.style.display = 'none';
    quizSection.style.display = 'block';

    // Load the first question
    loadQuestion(currentQuestionIndex);
}

// Load a question
function loadQuestion(index) {
    // Update progress bar
    const progress = ((index) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Get current question
    const currentQuestion = quizQuestions[index];

    // Check if this is the last question (the actual prom invitation)
    const isLastQuestion = index === quizQuestions.length - 1;

    // Set question text
    questionElement.textContent = currentQuestion.question;

    // Apply special styling for the last question
    if (isLastQuestion) {
        // Add special styling directly
        questionElement.style.fontSize = '2.5rem';
        questionElement.style.fontWeight = 'bold';
        questionElement.style.color = '#ff1493'; // Deeper pink
        questionElement.style.textShadow = '0 0 10px rgba(255, 20, 147, 0.5)';
        questionElement.style.letterSpacing = '1px';

        // Add a special animation
        questionElement.style.animation = 'pulse 2s infinite ease-in-out';

        // Add a decorative element before and after the text
        const questionContainer = document.querySelector('.question-container');
        questionContainer.style.borderColor = '#ff1493';
        questionContainer.style.boxShadow = '0 0 20px rgba(255, 20, 147, 0.3)';
        questionContainer.style.background = 'rgba(255, 255, 255, 0.2)';
    } else {
        // Reset styles if coming back to a previous question
        questionElement.style.fontSize = '';
        questionElement.style.fontWeight = '';
        questionElement.style.color = '';
        questionElement.style.textShadow = '';
        questionElement.style.letterSpacing = '';
        questionElement.style.animation = '';

        const questionContainer = document.querySelector('.question-container');
        questionContainer.style.borderColor = '';
        questionContainer.style.boxShadow = '';
        questionContainer.style.background = '';
    }

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Add options
    currentQuestion.options.forEach((option, i) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option.text;
        optionElement.classList.add('option');

        if (option.isYes) {
            optionElement.classList.add('yes-option');
            optionElement.addEventListener('click', handleYesOption);

            // Make "Yes" options more prominent in the last question
            if (isLastQuestion) {
                optionElement.style.fontSize = '1.3rem';
                optionElement.style.padding = '15px 30px';
                optionElement.style.boxShadow = '0 0 15px rgba(255, 133, 161, 0.8)';
                optionElement.style.border = '2px solid rgba(255, 133, 161, 0.8)';
            }
        } else {
            optionElement.classList.add('no-option');
            optionElement.addEventListener('click', handleNoOption);

            // Add dodging behavior to "No" option
            optionElement.addEventListener('mouseover', (e) => {
                if (Math.random() > 0.5 && noAttempts > 0) {
                    const x = Math.random() * 200 - 100;
                    const y = Math.random() * 200 - 100;
                    e.target.style.transform = `translate(${x}px, ${y}px) scale(${0.9 - noAttempts * 0.1})`;
                }
            });

            optionElement.addEventListener('mouseout', (e) => {
                e.target.style.transform = '';
            });

            // Make "No" option even smaller in the last question
            if (isLastQuestion) {
                optionElement.style.fontSize = '0.9rem';
                optionElement.style.opacity = '0.8';
            }
        }

        optionsContainer.appendChild(optionElement);
    });
}

// Handle "Yes" option click
function handleYesOption() {
    // Move to next question or show celebration
    currentQuestionIndex++;

    if (currentQuestionIndex >= quizQuestions.length) {
        showCelebration();
    } else {
        // Animate transition to next question
        quizSection.style.opacity = 0;
        setTimeout(() => {
            loadQuestion(currentQuestionIndex);
            quizSection.style.opacity = 1;
        }, 500);
    }
}

// Handle "No" option click
function handleNoOption(e) {
    noAttempts++;

    // Change text of the No button
    e.target.textContent = noMessages[noAttempts % noMessages.length];

    // Make the button smaller with each click
    const scaleValue = Math.max(0.5, 1 - (noAttempts * 0.1));
    e.target.style.transform = `scale(${scaleValue})`;
    e.target.style.fontSize = `${1 - noAttempts * 0.05}em`;

    // Make Yes options more prominent
    const yesOptions = document.querySelectorAll('.yes-option');
    yesOptions.forEach(option => {
        option.style.transform = `scale(${1 + noAttempts * 0.1})`;
        option.style.boxShadow = `0 0 ${noAttempts * 5}px rgba(46, 204, 113, 0.5)`;
    });
}

// Show celebration page
function showCelebration() {
    quizSection.style.display = 'none';
    celebrationPage.style.display = 'flex';

    // go to the top of the page
    window.scrollTo(0, 0);

    // Start confetti
    startConfetti();
}

// Confetti animation
function startConfetti() {
    const canvas = confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const numberOfPieces = 250;
    const colors = ['#ff4d8d', '#ff85a1', '#ffb8d1', '#fff0f5', '#d81b60', '#ff9cce', '#ffc0cb', '#ffb6c1'];

    // Create confetti pieces
    for (let i = 0; i < numberOfPieces; i++) {
        // Determine if this piece will be a heart or a regular square
        const isHeart = Math.random() > 0.6;

        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            rotation: Math.random() * 360,
            size: Math.random() * 15 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            isHeart: isHeart
        });
    }

    // Function to draw a heart
    function drawHeart(ctx, x, y, size, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.scale(size / 30, size / 30);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-10, -10, -15, 0, 0, 10);
        ctx.bezierCurveTo(15, 0, 10, -10, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // Animate confetti
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(piece => {
            ctx.fillStyle = piece.color;

            if (piece.isHeart) {
                // Draw heart-shaped confetti
                drawHeart(ctx, piece.x, piece.y, piece.size, piece.rotation);
            } else {
                // Draw regular square confetti
                ctx.save();
                ctx.translate(piece.x + piece.size/2, piece.y + piece.size/2);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.fillRect(-piece.size/2, -piece.size/2, piece.size, piece.size);
                ctx.restore();
            }

            piece.y += piece.speed;
            piece.rotation += 2;

            if (piece.y > canvas.height) {
                piece.y = -piece.size;
                piece.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Start button event listener
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', initQuiz);
    }

    // Resize confetti canvas on window resize
    window.addEventListener('resize', () => {
        if (confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
    });
});
