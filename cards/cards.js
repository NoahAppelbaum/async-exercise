const BASE_URL = "https://deckofcardsapi.com/api/deck"
const DECK_ID = getDeckID();

/** getDeckID: gets a new deck ID from the Deck of Cards API */
async function getDeckID() {
  const response = await fetch(`${BASE_URL}/new/shuffle`);
  const deckData = response.json()

  return deckData.deck_id;
}

// button with a listener on click to draw:

// fn to make api call for card image url
// fn to create a card in html

//    place on page

/** drawCard: draws a card from the Deck of Cards API
 * returns an array with [string imageURL, number cardsRemaining]
*/
async function drawCard() {
  const response = await fetch(`${BASE_URL}/${DECK_ID}/draw`);
  const cardData = response.json()

  return [cardData.cards[0].image, +cardData.remaining];
}
