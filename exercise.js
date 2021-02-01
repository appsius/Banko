//######################## 29.01.2021 ########################//
//############################################################//
// eating normal if current is between (90% of recommended por.) - (110% of recommended por.)

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

/// Exercise 1
dogs.map(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

/// Exercise 2
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
//console.log(
//  `Sarah dog is eating too ${
//    sarahDog.curFood > sarahDog.recFood ? 'much' : 'little'
//  }`
//);

/// Exercise 3.a
const muchersAndLessers = dogs.reduce(
  (acc, curDog) => {
    if (curDog.curFood > curDog.recFood) {
      acc.muches.push(...curDog.owners);
    } else if (curDog.curFood < curDog.recFood) {
      acc.lesses.push(...curDog.owners);
    }
    return acc;
  },
  { muches: [], lesses: [] }
);
//console.log(muchersAndLessers);

/// Exercise 3.b
const eatsTooMuchOwners = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

const eatsTooLessOwners = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
//console.log(eatsTooMuchOwners, eatsTooLessOwners);

/// Exercise 4
const print = x =>
  x === eatsTooMuchOwners
    ? console.log(`${eatsTooMuchOwners.join(' and ')}'s dog eat too much.`)
    : console.log(`${eatsTooLessOwners.join(' and ')}'s dog eat too less.`);
//print(eatsTooMuchOwners);
//print(eatsTooLessOwners);

/// Exercise 5
dogs.some(dog => dog.curFood === dog.recFood);
//? console.log('There ARE SOME dogs which eat exactly the reccommended food')
//: console.log('There ARE NO dogs which eat exacly the recommended amount');

/// Exercise 6
const eatOK = d => {
  return d.curFood > d.recFood * 0.9 && d.curFood < d.recFood * 1.1;
};
const eatingOK = dogs.some(dog => eatOK(dog));
//console.log(eatingOK);

/// Exercise 7
const eatingOKDogs = dogs.filter(dog => {
  return eatOK(dog);
});
//console.log(eatingOKDogs);

/// Exercise 8
const sortedDogs = dogs.slice().sort((a, b) => b.recFood - a.recFood);
//console.log(sortedDogs);

/// Exercise
//make afunction to convert all words first letter to UPPERCASE with some exeptions
//const s = 'tHE Sleep is enough for MotheR to be satisfied!';
//const exception = ['a', 'the', 'to', 'is', 'for'];
//const convertedUpper = (sentence, exc) => {
//  const divSent = sentence.toLowerCase().split(' ');
//  const firstWord = divSent[0];
//  const rest = divSent.splice(1, divSent.length);
//  const upperFirstPart = firstWord.replace(
//    firstWord[0],
//    firstWord[0].toUpperCase()
//  );
//  const upperSecondPart = rest.map(word =>
//    !exc.includes(word) ? word.replace(word[0], word[0].toUpperCase()) : word
//  );
//  const upperedFullWord = [upperFirstPart, ...upperSecondPart].flat().join(' ');
//  return upperedFullWord;
//};
//console.log(convertedUpper(s, exception));

// exercise - 1
//const totalDepos = accounts
//  .flatMap(acc => acc.movements)
//  .filter(mov => mov > 0)
//  .reduce((mov, cur) => mov + cur, 0);
//const above1000 = accounts
//  .flatMap(account => account.movements)
//  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);
//const { deposits, withdrawals } = accounts
//  .flatMap(account => account.movements)
//  .reduce(
//    (acc, cur) => {
//      acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//      return acc;
//    },
//    { deposits: 0, withdrawals: 0 }
//  );

// exercise - 2
//let movements;
//movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//const dice = Array.from({ length: 100 }, (_, i) => i + 1);
//console.log(dice);

//setTimeout(() => {
//  const els = document.querySelectorAll('.movements__value');
//  const movementsFromUI = Array.from(els, el =>
//    Number(el.textContent.replace('€', ''))
//  );
//  console.log(movementsFromUI);
//}, 7000);

//const totalMovement = accounts
//  .flatMap(account => account.movements)
//  .reduce((acc, cur) => acc + cur, 0);

//console.log(totalMovement);

//const depositExist = movements.some(x => x > 0);
//const depositIsNumber = movements.every(x => typeof x === 'number');

//console.log(depositExist);
//console.log(depositIsNumber);

//const movements = account1.movements;
//const lonelyWithdrawal = movements.find(mov => mov < 0);
//console.log(movements);
//console.log(lonelyWithdrawal);

//const ss = accounts.find(s => s.owner === 'Sarah Smith');
//console.log(ss);

//const fromEurToUsd = 1.1;
//const convertEursToDolor = movements =>
//  movements
//    .filter(mov => mov > 0)
//    .map((mov, i, arr) => {
//      console.log(arr);
//      return mov * fromEurToUsd;
//    })
//    .reduce((acc, cur) => acc + cur, 0);
//console.log(convertEursToDolor(account1.movements));

//const dogsAge1 = [5, 2, 4, 1, 15, 8, 3];
//const dogsAge2 = [16, 6, 10, 5, 6, 1, 4];
//const calcHumanAges = dogsAge => {
//  const humansAge = dogsAge.map((dage, i) =>
//    dage <= 2 ? dage * 2 : 16 + dage * 4
//  );
//  console.log(humansAge);

//  const dogsAbove18 = [...humansAge].filter(humanAge => humanAge > 18);
//  console.log(dogsAbove18);

//  const avgHumanAge = dogsAbove18.reduce(
//    (acc, cur, i, arr) => acc + cur / arr.length,
//    0
//  );
//  console.log(avgHumanAge);
//};
//calcHumanAges(dogsAge2);

//const calcHumanAges1 = dogsAge => {
//  const humanAgeAvg = dogsAge
//    .map(dage => (dage <= 2 ? 2 * dage : 16 + dage * 4))
//    .filter(humanAge => humanAge > 18)
//    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//  console.log(humanAgeAvg);
//};
//calcHumanAges1(dogsAge2);

//const findMax = movements => {
//  const max = movements.reduce((acc, curr) => Math.max(acc, curr));
//  console.log(max);
//};
//findMax([23, -2, 222]);

//const transToShort = accs => {
//  accs.forEach((acc, i) => {
//    acc.shortName = acc.owner
//      .toLowerCase()
//      .split(' ')
//      .map((name, i) => name[0])
//      .join('.');
//  });
//  console.log(accs);
//};
//transToShort(accounts);

//const withdrawals = account1.movements.filter(mov => mov < 0);
//const totalDeposits = account1.movements.reduce((acc, curr) => acc + curr, 0);

//console.log(account1.movements);
//console.log(withdrawals);
//console.log(totalDeposits);

//*************************************************************//
//*************************************************************//

//const juliaDogData1 = [3, 5, 2, 12, 7];
//const katesDogData1 = [2, 1, 15, 8, 3];
//const juliaDogData2 = [9, 16, 6, 8, 3];
//const katesDogData2 = [10, 5, 6, 1, 4];

//const checkDogs = function (julias, kates) {
//  const correctedJulia = [...julias];
//  correctedJulia.splice(0, 1);
//  correctedJulia.splice(-2, 2);

//  const totalData = correctedJulia.concat(kates);

//  totalData.forEach(function (dogAge, i) {
//    dogAge >= 3
//      ? console.log(
//          `Dog number ${i + 1} is an adult and is (${dogAge}) years old`
//        )
//      : console.log(
//          `Dog number ${i + 1} is still a puppy (${dogAge}) years old 🐶🐶`
//        );
//  });
//};

//checkDogs([2, 3, 2, 2], []);

//*************************************************************//
//                      MAP
//*************************************************************//

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//const fromEurToUsd = 1.1;
//const movementsMap = movements.map(mov => mov * fromEurToUsd);

//let movementsFor = [];
//for (let mov of movements) movementsFor.push(mov * fromEurToUsd);

//const movsDescription = movements.map(
//  (mov, i) =>
//    `Movement ${i + 1}: You have ${
//      mov > 0 ? 'deposited' : 'withdrew'
//    } $${Math.abs(mov)}`
//);

//console.log(movsDescription);
