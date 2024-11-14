// Kelime listesi
const words = ["html", "nazmi", "css", "javascript", "java"];
let selectedWord = "";
let displayedWord = [];
let attempts = 5;
let wrongGuesses = [];

// Oyunu başlat
function StartGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(selectedWord.length).fill("_");
    attempts = 5;
    wrongGuesses = []; // Yanlış tahminleri sıfırla
    updateDisplay();
    document.getElementById("message").textContent = "Bir harf tahmin ediniz";
    document.getElementById("remainingAttempts").textContent = attempts;
    document.getElementById("wrongGuessesDisplay").textContent = "Yok";
}

// Oyuncunun tahmin yapması
function makeGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guess && guess.length === 1 && /^[a-z]$/.test(guess)) {
        let correctGuess = false;
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess && displayedWord[i] === "_") {
                displayedWord[i] = guess;
                correctGuess = true;
            }
        }

        if (!correctGuess) {
            // Harf yanlışsa ve daha önce eklenmediyse yanlış tahminler dizisine ekle
            if (!wrongGuesses.includes(guess)) {
                wrongGuesses.push(guess);
                document.getElementById("wrongGuessesDisplay").textContent = wrongGuesses.join(", ");
            }
            attempts--;
            document.getElementById("remainingAttempts").textContent = attempts;
        }

        // Ekranı güncelle ve oyunun durumunu kontrol et
        updateDisplay();
        checkGameStatus();
    } else {
        document.getElementById("message").textContent = "Lütfen geçerli bir harf giriniz";
    }
}

// Ekranı güncelleme
function updateDisplay() {
    document.getElementById("wordDisplay").textContent = displayedWord.join(" ");
}

// Oyunun durumunu kontrol etme
function checkGameStatus() {
    if (!displayedWord.includes("_")) {
        document.getElementById("message").textContent = "Tebrikler, kelimeyi bildiniz!";
        document.getElementById("guessInput").disabled = true;
    } else if (attempts <= 0) {
        document.getElementById("message").textContent = `Oyun bitti! Kelime: ${selectedWord}`;
        document.getElementById("guessInput").disabled = true;
    } else {
        document.getElementById("message").textContent = "Bir harf giriniz";
    }
}

// Oyunu yeniden başlatma
function resetGame() {
    document.getElementById("guessInput").disabled = false;
    StartGame();
}

StartGame();
