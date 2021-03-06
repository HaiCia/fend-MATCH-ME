/*
 *           list of selectors and variable declarations
 */
const cardsList = document.querySelectorAll('.card .fa');
const deck = document.querySelector('.deck');
const counter = document.querySelector('.moves');
const star = document.querySelector('.fa-star');
const stars = document.querySelector('.stars');
const reload = document.querySelector('.restart');
const finalPanel = document.querySelector('.game-end');
const reloadBtn = document.querySelector('.reloadButton');
const showScore = document.querySelector('.show-score');
const sec = document.querySelector('.sec');
const min = document.querySelector('.min');
const showTimeMin = document.querySelector('.show-time-min');
const showTimeSec = document.querySelector('.show-time-sec');
const showStars = document.querySelector('.show-stars');


let cardsArray = Array.from(cardsList);
let click1 = {};
let click2 = {};

let game = {
    moves: 0,
    matchCounter: 0,
    secContent: sec.textContent,
    intervalsSet: window.setInterval(timer, 1000)
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
cardsArray = shuffle(cardsArray);

for (let i = 0; i < cardsArray.length; i++) {
    cardsList[i].outerHTML = cardsArray[i].outerHTML;
};


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)  
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * events listeners*
 */
reload.addEventListener('click', pageReload);
deck.addEventListener('click', checkMatch);

/*
 * functions*
 */

function checkMatch(e) {
    let card = e.target;

    if (card.className != 'card') {
        return;
    }

    if (!click1.className) {
        click1 = card;
        card.classList.add('open', 'show');

    } else if (!click2.className) {
        click2 = card;
        card.classList.add('open', 'show');
    }

    if (click1.firstElementChild.className == click2.firstElementChild.className) {
        matched();
    } else {
        hideCards();
    }

    game.moves += 1;
    counter.innerHTML = game.moves;


    checkStars();
    gameEnd();
}

function matched() {

    click1.classList.add('match');
    click2.classList.add('match');

    click1.removeEventListener('click', checkMatch);
    click2.removeEventListener('click', checkMatch);

    click1 = {};
    click2 = {};

    game.matchCounter += 1;
}

function hideCards() {
    setTimeout(function () {
        click1.classList.remove('open', 'show');
        click2.classList.remove('open', 'show');

        click1 = {};
        click2 = {};
    }, 300);
}

function checkStars() {
    if (game.moves < 15) {
        stars.innerHTML = '<i class="fa fa-star"><i class="fa fa-star"><i class="fa fa-star">';

    } else if (game.moves >= 15) {
        stars.innerHTML = '<i class="fa fa-star"><i class="fa fa-star">';

        if (game.moves > 20) {
            stars.innerHTML = '<i class="fa fa-star">';

        }
    }
}

function timer() {
    sec.textContent = parseFloat(sec.textContent) + 1;

    if (sec.textContent > 59) {
        min.textContent = parseFloat(min.textContent) + 1;
        sec.textContent = 0;
    }
}

function timerStop() {
    window.clearInterval(game.intervalsSet);
}

function gameEnd() {
    if (game.matchCounter === 8) {
        finalPanel.classList.remove('visable');
        showScore.textContent = game.moves;
        showTimeSec.textContent = sec.textContent;
        showTimeMin.textContent = min.textContent;
        showStars.innerHTML = stars.innerHTML;

        reloadBtn.addEventListener('click', pageReload);
        timerStop();
    }
}

function pageReload() {
    window.location.reload();
}