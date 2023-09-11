"use strict";
const BASE_URL = "http://numbersapi.com";

// 1.
/** showNumberTrivia: console log trivia after making request to Numbers API.
 */
async function showNumberTrivia(num) {
  const response = await fetch(`${BASE_URL}/${num}?json`);

  const numberData = await response.json();

  console.log("showNumberTrivia:", numberData.text);
}

// 2.
/** showNumberRace: Make 4 requests to Numbers API, console log the fastest one.
 */
async function showNumberRace(...numbers) {

  const promises = numbers.map(n => fetch(`${BASE_URL}/${n}?json`));

  const raceWinner = await Promise.race(promises);
  const winnerData = await raceWinner.json();

  console.log("showNumberRace:", winnerData.text);

}

// 3.
/** showNumberAll: Accepts any number of numbers, makes request to Numbers API,
then console logs array of trivia facts and array of errors.
 */
async function showNumberAll(...numbers) {

  const promises = numbers.map(n => fetch(`${BASE_URL}/${n}?json`));

  const processedPromises = await Promise.allSettled(promises);
  debugger;

  const facts = [];
  const errors = [];

  processedPromises.forEach(async function (settledPromise) {
    if (settledPromise.value.ok) {
      const body = await settledPromise.value.json();
      facts.push(body.text);
    } else {
      errors.push(settledPromise.value.statusText);
    }
  });

  // "chicken" still fulfilled in the promise. fulfilled vs. rejected?
  console.log("showNumberAll fulfilled:", facts, "showNumberAll Errors:", errors);
}


// 4.
/** main: Calls previous 3 functions in order, moving on only after each
function completes.
 */
async function main() {
  await showNumberTrivia(29);
  await showNumberRace(1, 2, 3, 4);
  await showNumberAll(10, 11, 12, 13, 14, "with spaces", "pie");
}
