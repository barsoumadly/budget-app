'use strict';

import { addIncomeValue } from './Income.js';
import { addExpenseValue } from './Expenses.js';

const budgetValueEl = document.querySelector('.budget__value');
const budgetTitleMonthEl = document.querySelector('.budget__title--month');

// reset budget value
budgetValueEl.textContent = '- 0.00';

export let totalValues = [];

// display live date
const displayDate = function () {
  const options = {
    day: 'numeric',
    weekday: 'short',
    month: 'short',
    year: 'numeric',
  };

  const liveDate = new Date();
  const date = new Intl.DateTimeFormat('en-UK', options).format(liveDate);
  budgetTitleMonthEl.textContent = date;
};

displayDate();

// select elements of add container
const typeEl = document.querySelector('.add__type');
const descriptionEl = document.querySelector('.add__description');
const valueEl = document.querySelector('.add__value');
const btnAdd = document.querySelector('.add__btn');

// declare used colors
const incomeColor = '#28b9b5';
const expensesColor = '#ff5049';

const changeInputColor = function (color) {
  typeEl.style.setProperty('--color', color);
  descriptionEl.style.setProperty('--color', color);
  valueEl.style.setProperty('--color', color);
  btnAdd.style.setProperty('--color', color);
};

const checkInputType = function () {
  if (typeEl.value === 'inc') {
    changeInputColor(incomeColor);
  } else {
    changeInputColor(expensesColor);
  }
};

// change color of input according to value type
typeEl.addEventListener('click', checkInputType);

export const showBudgetValue = function () {
  let budgetValue = calcBudgetValue();
  if (budgetValue !== 0) {
    if (budgetValue > 0) {
      budgetValueEl.style.setProperty('--budget-color', incomeColor);
      budgetValueEl.textContent = `+ ${new Intl.NumberFormat('en-US').format(
        budgetValue
      )}`;
    } else {
      budgetValue *= -1;
      budgetValueEl.style.setProperty('--budget-color', expensesColor);
      budgetValueEl.textContent = `- ${new Intl.NumberFormat('en-US').format(
        budgetValue
      )}`;
    }
  } else {
    budgetValueEl.style.setProperty('--budget-color', expensesColor);
    budgetValueEl.textContent = '- 0.00';
  }
};

const calcBudgetValue = function () {
  if (totalValues.length !== 0) {
    return totalValues.reduce((acc, el) => (acc += el));
  } else {
    return 0;
  }
};

const addValue = function () {
  if (typeEl.value === 'inc') {
    addIncomeValue(descriptionEl, valueEl);
  } else {
    addExpenseValue(descriptionEl, valueEl);
  }
  showBudgetValue();
  descriptionEl.value = valueEl.value = '';
};

btnAdd.addEventListener('click', addValue);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addValue();
  }
});

export const filterPositiveTotalValues = function () {
  totalValues = totalValues.filter(val => val > 0);
};

export const filterNegativeTotalValues = function () {
  totalValues = totalValues.filter(val => val < 0);
};
