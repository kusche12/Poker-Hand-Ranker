var hand = [null, null, null, null, null]
var position;
function updateCards() {
    var handType ='';
    for (let i = 0; i < hand.length; i++) {
        if (hand[i] != null) {
            var value = '' + hand[i].value.charAt(0) + hand[i].value.substring(1, hand[i].value.length).toLowerCase();
            var suit = '' + hand[i].suit.charAt(0) + hand[i].suit.substring(1, hand[i].suit.length).toLowerCase();
            document.getElementById('desc' + i).innerHTML = '' + value + ' of ' + suit;
            document.getElementById('card' + i).src = hand[i].image;


            document.getElementById('strength').innerHTML = 'Current Hand Strength: ' + handType;
        }
    }
}

function openForm(cardPosition) {
    document.getElementById("myForm").style.display = "block";
    position = parseInt(cardPosition);
}

function closeForm(event) {
    document.getElementById("myForm").style.display = "none";
    event.preventDefault();
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
            console.log(allCards);
            var card;
            for (let i = 0; i < allCards.length; i++) {
                if (allCards[i].value == value && allCards[i].suit == suit) {
                    card = allCards[i];
                }
            }
            hand[position] = card;
            this.updateCards();
        })
    document.getElementById("myForm").style.display = "none";
}
