'use strict';

// Data
//const account1 = {
//  owner: 'Jonas Schmedtmann',
//  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//  interestRate: 1.2, // %
//  pin: 1111,
//};
//const account2 = {
//  owner: 'Jessica Davis',
//  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//  interestRate: 1.5,
//  pin: 2222,
//};
//const account3 = {
//  owner: 'Steven Thomas Williams',
//  movements: [200, -200, 340, -300, -20, 50, 400, -460],
//  interestRate: 0.7,
//  pin: 3333,
//};
//const account4 = {
//  owner: 'Sarah Smith',
//  movements: [430, 1000, 700, 50, 90],
//  interestRate: 1,
//  pin: 4444,
//};
//const accounts = [account1, account2, account3, account4];

// Data 2 - For Numbers - DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2021-01-31T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const calcDaysPassed = (acc, d1, d2) => {
  const days = Math.round(Math.abs((d1 - d2) / (24 * 60 * 60 * 1000)));
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  console.log(new Date());
  console.log(d2);
  const today = new Intl.DateTimeFormat(acc.locale, options).format(d2);

  switch (true) {
    case days < 1:
      return `today`;
    case days < 2:
      return `yesterday`;
    case days <= 5:
      return `${days} days ago`;
    default:
      return today;
  }
};

let order;
const orderMovs = () => {
  order
    ? currentUser.movements.sort((a, b) => a - b)
    : currentUser.movements.sort((a, b) => b - a);
  order
    ? currentUser.movementsDates.sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      )
    : currentUser.movementsDates.sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      );
  order = !order;
  displayCalcs(currentUser);
};

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

  const accountDates = account.movementsDates.flatMap(date => {
    return new Date(date).toLocaleDateString().split('-');
  });
  account.movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${calcDaysPassed(
          account,
          new Date().getTime(),
          new Date(accountDates[i]).getTime()
        )}</div>
        <div class="movements__value">${parseFloat(mov).toFixed(2)}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = account => {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${parseFloat(account.balance).toFixed(2)}€`;
};

const calcDisplaySummary = account => {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.innerText = `${parseFloat(income).toFixed(2)}€`;

  const expense = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(expense).toFixed(2)}€`;

  account.interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * account.interestRate * 0.01)
    .filter(int => int > 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${parseFloat(account.interest).toFixed(2)}€`;
};

const displayCalcs = acc => {
  displayBalance(acc);
  displayMovements(acc);
  calcDisplaySummary(acc);
};

let currentUser;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentUser = accounts.find(
    acc => acc.shortName === inputLoginUsername.value
  );

  if (currentUser?.pin === +inputLoginPin.value) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    let today = new Intl.DateTimeFormat(currentUser.locale, options).format(
      new Date()
    );

    currentUser.movementsDates.map(movD =>
      calcDaysPassed(
        currentUser,
        new Date().getTime(),
        new Date(movD).getTime()
      )
    );

    labelDate.textContent = `${today}`;

    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '1';

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    displayCalcs(currentUser);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = parseFloat(inputTransferAmount.value).toFixed(2);
  let receiverAcc = accounts.find(
    acc => acc.shortName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    0 < amount &&
    amount <= currentUser.balance &&
    receiverAcc &&
    receiverAcc?.shortName !== currentUser.shortName
  ) {
    currentUser.movements.push(-amount);
    receiverAcc.movements.push(+amount);

    currentUser.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date().toISOString());

    currentUser.movementsDates.map(movD =>
      calcDaysPassed(
        currentUser,
        new Date().getTime(),
        new Date(movD).getTime()
      )
    );

    displayCalcs(currentUser);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const loan = parseFloat(inputLoanAmount.value).toFixed(2);
  if (loan > 0 && currentUser.movements.some(mov => loan < mov * 0.1)) {
    currentUser.movements.push(loan);
    currentUser.movementsDates.push(new Date().toISOString());
  }
  inputLoanAmount.value = '';

  displayCalcs(currentUser);
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  orderMovs();
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  const accIdx = accounts.findIndex(acc => {
    if (
      acc === currentUser &&
      acc.shortName === inputCloseUsername.value &&
      acc.pin === +inputClosePin.value
    ) {
      return acc;
    }
  });

  inputClosePin.value = inputCloseUsername.value = '';

  if (accIdx >= 0) {
    accounts.splice(accIdx, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Account deleted!';
    labelWelcome.style.color = 'red';

    setTimeout(() => {
      labelWelcome.textContent = 'Sign up to get started';
      labelWelcome.style.color = '#444';
    }, 3000);
  }
});
