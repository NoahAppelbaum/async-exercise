"use strict";

async function showNumberTrivia(num) {
  const response = await fetch(`http://numbersapi.com/${num}?json`);

    const numberData = await response.json();

    console.log(numberData.text);
}


async function showNumberRace(num1, num2, num3, num4) {
  const p1 = fetch(`http://numbersapi.com/${num1}?json`);
  const p2 = fetch(`http://numbersapi.com/${num2}?json`);
  const p3 = fetch(`http://numbersapi.com/${num3}?json`);
  const p4 = fetch(`http://numbersapi.com/${num4}?json`);

  const raceWinner = await Promise.race([p1,p2,p3,p4]);
  const winnerData = await raceWinner.json();

  console.log(winnerData.text);

}


async function showNumberAll(...numbers) {

  const promises = [];
  numbers.forEach(n => {
    promises.push(fetch(`http://numbersapi.com/${n}?json`))
  })

  const processedPromises = await Promise.allSettled(promises);

  const facts = [];
  const errors = [];

  processedPromises.forEach(settledPromise => {
    if (settledPromise.status === "fulfilled") {
      const body = settledPromise.value.json()
      facts.push(body.text)
    } else {
      errors.push(settledPromise.reason);
    }
  });

  console.log("facts:", facts, "errors:", errors);
}
