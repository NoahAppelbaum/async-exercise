"use strict";
// TODO:
const BASE_URL = "http://numbersapi.com/";

// 1.
/** showNumberTrivia: console log trivia after making request to Numbers API.
 */
async function showNumberTrivia(num) {
  const response = await fetch(`http://numbersapi.com/${num}?json`);

  const numberData = await response.json();

  console.log("showNumberTrivia:", numberData.text);
}

// 2.
/** showNumberRace: Make 4 requests to Numbers API, console log the fastest one.
 */
// TODO: pass in array, then use array.map
async function showNumberRace(num1, num2, num3, num4) {
  const p1 = fetch(`http://numbersapi.com/${num1}?json`);
  const p2 = fetch(`http://numbersapi.com/${num2}?json`);
  const p3 = fetch(`http://numbersapi.com/${num3}?json`);
  const p4 = fetch(`http://numbersapi.com/${num4}?json`);

  const raceWinner = await Promise.race([p1, p2, p3, p4]);
  const winnerData = await raceWinner.json();

  console.log("showNumberRace:", winnerData.text);

}

// 3.
/** showNumberAll: Accepts any number of numbers, makes request to Numbers API,
then console logs array of trivia facts and array of errors.
 */
// TODO: can use array.map
async function showNumberAll(...numbers) {

  const promises = [];
  numbers.forEach(n => {
    promises.push(fetch(`http://numbersapi.com/${n}?json`));
  });

  const processedPromises = await Promise.allSettled(promises);

  debugger;
  const facts = [];
  const errors = [];

  processedPromises.forEach(async function (settledPromise) {
    //TODO: status code eliminates possibility of other status codes. "status.ok"
    //TODO: does status have fulfilled or rejected
    if (settledPromise.value.status === 200) {
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