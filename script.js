'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const transToShort = accs => {
  accs.forEach((acc, i) => {
    acc.shortName = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name, i) => name[0])
      .join('');
  });
};
transToShort(accounts);

const displayMovements = function (account) {
  containerMovements.innerHTML = '';

  account.movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = account => {
  const balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${balance}€`;
};

const calcDisplaySummary = account => {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.innerText = `${income}€`;

  const expense = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(expense)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * account.interestRate * 0.01)
    .filter(int => int > 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const displayCalcs = function () {
  // display
  displayMovements(currentUser);
  displayBalance(currentUser);
  calcDisplaySummary(currentUser);
};

let currentUser;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentUser = accounts.find(
    acc => acc.shortName === inputLoginUsername.value
  );

  if (currentUser?.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '1';

    // emptying fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // display movements, balance, summary
    displayCalcs(currentUser);
  }
});

console.log(accounts);

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const balance = Number(labelBalance.textContent.slice(0, -1));
  let receiver = accounts.find(acc => acc.shortName === inputTransferTo.value);

  if (0 < amount < balance) {
    receiver.movements.push(amount);
    currentUser.movements.push(-amount);
    inputTransferAmount.value = inputTransferTo.value = '';
    displayCalcs(currentUser);
  }
});

//######################## 29.01.2021 ########################//
//############################################################//
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
