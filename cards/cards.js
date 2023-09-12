"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck";
let DECK_ID;

const $drawBtn = $("#draw-btn");
const $cardArea = $("#card-area");

/** getDeckID: gets a new deck ID from the Deck of Cards API and assigns it to
 * global variable DECK_ID. */
async function getDeckID() {
  const response = await fetch(`${BASE_URL}/new/shuffle`);
  const deckData = await response.json();

  DECK_ID = deckData.deck_id;
}

/** drawCard: draws a card from the Deck of Cards API.
 * returns an array with [string imageURL, number cardsRemaining]
 * FIXME: can return object instead // or return response.json
 * consider 1 handle click function
 * don't return array
*/
async function drawCard() {
  const response = await fetch(`${BASE_URL}/${DECK_ID}/draw`);
  const cardData = await response.json();

  return [cardData.cards[0].image, +cardData.remaining];
}

/** renderCard: Takes image URL and renders it to the DOM. */
function renderCard(imgURL) {
  const $img = $("<img>").attr("src", imgURL);
  $cardArea.append($img);
}

/** handleClick: Draws a card, displays card image to DOM, and hides button if
deck is exhausted. */
async function handleClick() {
  const cardInfo = await drawCard();
  renderCard(cardInfo[0]);

  if (cardInfo[1] === 0) {
    $drawBtn.hide();
  }
}

$drawBtn.on("click", handleClick);

getDeckID();