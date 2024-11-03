const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
let cards = [];
let firstCard = null, secondCard = null;
let lockBoard = false;

function initGame() {
    // Clear previous cards
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Duplicate and shuffle the cards
    cards = shuffleArray([...symbols, ...symbols]);

    // Create each card and append it to the game board
    cards.forEach(symbol => {
        const cardElement = createCard(symbol);
        gameBoard.appendChild(cardElement);
    });

    // Reset variables
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Creates a card element with the given symbol
function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol; // Store the symbol in the dataset for easy access
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;

    if (!firstCard) {
        // First card flipped
        firstCard = card;
    } else {
        // Second card flipped
        secondCard = card;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Disables both matched cards
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

// Unflips both cards if they do not match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

// Resets the board state
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Shuffles the array of symbols
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Add event listener for the restart button
document.getElementById('restart-btn').addEventListener('click', initGame);

// Initialize the game on load
initGame();