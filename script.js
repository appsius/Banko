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
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = account => {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${account.balance}€`;
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

  account.interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * account.interestRate * 0.01)
    .filter(int => int > 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${account.interest.toFixed(2)}€`;
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

  if (currentUser?.pin === Number(inputLoginPin.value)) {
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

  const amount = Number(inputTransferAmount.value);
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
    receiverAcc.movements.push(amount);
    currentUser.movements.push(-amount);

    orderMovs();
    displayCalcs(currentUser);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const loan = Number(inputLoanAmount.value);
  let oneTenOf;
  if (currentUser.movements.some(mov => mov > 0)) {
    oneTenOf = currentUser.movements.reduce((acc, cur) => acc + cur * 0.1, 0);
  }

  inputLoanAmount.value = '';

  if (loan < oneTenOf && loan > 0) {
    currentUser.interest += loan;
    labelSumInterest.textContent = `${currentUser.interest.toFixed(2)}€`;
    return;
  }
});

let order;
const orderMovs = () => {
  order
    ? currentUser.movements.sort((a, b) => b - a)
    : currentUser.movements.sort((a, b) => a - b);
  order = !order;
  displayCalcs(currentUser);
};

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
      acc.pin === Number(inputClosePin.value)
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
