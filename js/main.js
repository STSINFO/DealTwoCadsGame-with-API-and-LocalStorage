document.querySelector("button").addEventListener("click", dealTwoCards);
let deck = "";
const url = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;

init();
// function dealTwoCards() {}
function dealTwoCards() {
  //   console.log(deck);
  fetch(`https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      if (data.remaining) {
        console.log(data);
        document.querySelector(".playerOne img").src = data.cards[0].image;
        document.querySelector(".playerTwo img").src = data.cards[1].image;
        if (convert(data.cards[0].value) > convert(data.cards[1].value)) {
          document.querySelector(".score .one span").innerHTML++;
          winner = "Player 1";
        } else if (
          convert(data.cards[0].value) < convert(data.cards[1].value)
        ) {
          document.querySelector(".score .two span").innerHTML++;
          winner = "Player 2";
        } else {
          winner = "Draw!";
        }

        document.querySelector(".header h3 span").innerHTML = winner;
        document.querySelector(".header h4 span").innerHTML = data.remaining;
      } else {
        let win =
          document.querySelector(".score .one span").innerHTML >
          document.querySelector(".score .two span").innerHTML
            ? "Player One! Congrats!!!"
            : "Player Two! Congrats!!";
        document.querySelector(".status .winner").innerHTML = win;
        console.log(win);
        init();
      }
    })
    .catch((err) => console.log(err));
}

// helper function for conversion

function convert(val) {
  if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else if (val === "ACE") {
    return 14;
  } else {
    return val;
  }
}

function init() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      deck = data.deck_id;
      console.log(deck);
    })
    .catch((err) => console.log(err));
}
