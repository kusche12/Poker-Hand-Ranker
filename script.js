function updateCards() {
    for (let i = 0; i < hand.length; i++) {
        if (hand[i] != null) {
            var value = '' + hand[i].value.charAt(0) + hand[i].value.substring(1, hand[i].value.length).toLowerCase();
            var suit = '' + hand[i].suit.charAt(0) + hand[i].suit.substring(1, hand[i].suit.length).toLowerCase();
            document.getElementById('desc' + i).innerHTML = '' + value + ' of ' + suit;
            document.getElementById('card' + i).src = hand[i].image;
        }
    }
}

function updateCardStrength() {
    var isFlushWith = hand[0]['suit'];
    var isFlush = true;
    var count = 0;
    var isStraight = false;
    var isRoyal = false;

    // find card value for all in deck
    for (let k = 0; k < hand.length; k++) {
        if (hand[k].value == 'ACE') {
            cardValue['1']++;
        }
        cardValue[hand[k].value]++;
    }
    var allCards = Object.keys(cardValue)

    // check if flush
    for (let i = 0; i < hand.length; i++) {
        if (hand[i]['suit'] != isFlushWith) {
            isFlush = false;
            break;
        }
    }

    // check if straight
    for (let a = 0; a < allCards.length; a++) {
        if (cardValue[allCards[a]] != 0) {
            count++;
        } else {
            count = 0;
        }
        if (count == 5) {
            isStraight = true;
            break;
        }
    }

    // check if royal
    count = 0;
    for (let b = 9; b < allCards.length; b++) {
        if (cardValue[allCards[b]] != 0) {
            count++;
        } else {
            count = 0;
        }
    }
    if (count == 5) {
        isRoyal = true;
    }

    // check hand type
    if (isRoyal && isStraight && isFlush) {
        updateTitle('Royal Flush');
    } else if (isStraight && isFlush) {
        updateTitle('Straight Flush');
    } else if (Object.values(cardValue).indexOf(4) != -1) {
        updateTitle('Four of a Kind');
    } else if (Object.values(cardValue).indexOf(2) != -1 && Object.values(cardValue).indexOf(3) != -1) {
        updateTitle('Full House');
    } else if (isFlush) {
        updateTitle('Flush');
    } else if (isStraight) {
        updateTitle('Straight');
    } else if (Object.values(cardValue).indexOf(3) != -1) {
        updateTitle('Three of a Kind');
    } else if (Object.values(cardValue).indexOf(2) != -1) {
        count = 0;
        for (let c = 1; c < Object.values(cardValue).length; c++) {
            if (Object.values(cardValue)[c] == 2) {
                count++;
            }
        }
        if (count > 1) {
            updateTitle('Two Pair');
        } else {
            updateTitle('One Pair');
        }
    } else {
        updateTitle('High Card');
    }
    
}

function getCard(event) {
    event.preventDefault();
    var value = document.getElementById('card-val').value;
    var suit = document.getElementById('card-suit').value;

    // Check if this card was already chosen
    for (let i = 0; i < hand.length; i++) {
        if (hand[i] != null && hand[i].value == value && hand[i].suit == suit) {
            document.getElementById('card-val').style.borderColor = 'red';
            document.getElementById('card-suit').style.borderColor = 'red';
            document.getElementById('warning').style.display = 'block';
            return;
        }
    }

    fetch('https://deckofcardsapi.com/api/deck/' + "new" + '/draw/?count=52') // Find card in deck
        .then(response => response.json())
        .then(data => {
            const allCards = data.cards;
            var card;
            for (let i = 0; i < allCards.length; i++) {
                if (allCards[i].value == value && allCards[i].suit == suit) {
                    card = allCards[i];
                }
            }
            hand[position] = card; // add card to hand
            this.updateCards();    // add card to webpage

            if (hand[0] != null && hand[1] != null && hand[2] != null && hand[3] != null && hand[4] != null) { // run the strength handler at 5th card added
                this.updateCardStrength();
            }
        })
    document.getElementById("myForm").style.display = "none";
}

function updateTitle(name) {
    document.getElementById('strength').innerHTML = 'Hand Name: ' + name;
}

function openForm(cardPosition) {
    document.getElementById("myForm").style.display = "block";
    position = cardPosition;
}
function closeForm(event) {
    document.getElementById("myForm").style.display = "none";
    event.preventDefault();
} 

function reset() {
    location.reload();
}
function random() {
    for (let i = 0; i < hand.length; i++) {
        hand[i] = null;
    }
    Object.keys(cardValue).forEach((card) => {
        cardValue[card] = 0;
    })

    fetch('https://deckofcardsapi.com/api/deck/' + "new" + '/draw/?count=5')
        .then(response => response.json())
        .then(data => {
            const allCards = data.cards;
            for (let i = 0; i < allCards.length; i++) {
                hand[i] = allCards[i]; // add card to hand
                this.updateCards();    // add card to webpage
            }
            
            if (hand[0] != null && hand[1] != null && hand[2] != null && hand[3] != null && hand[4] != null) { // run the strength handler at 5th card added
                this.updateCardStrength();
            }
        })
}


// =======================
var hand = [null, null, null, null, null]
var position;
var cardValue = {
  '1': 0,
  '2': 0,  
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
  '7': 0,
  '8': 0,
  '9': 0,
  '10': 0,
  'JACK': 0,
  'QUEEN': 0,
  'KING': 0,
  'ACE': 0,
};