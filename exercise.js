//######################## 29.01.2021 ########################//
//############################################################//
let movements;
movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
