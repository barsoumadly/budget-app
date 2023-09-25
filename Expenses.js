import {
  filterPositiveTotalValues,
  showBudgetValue,
  totalValues,
} from './script.js';

const expensesTotalValueEl = document.querySelector('.budget__expenses--value');
const expensesTotalPercentage = document.querySelector(
  '.budget__expenses--percentage'
);
const expensesList = document.querySelector('.expenses__list');

// reset expenses value
expensesTotalValueEl.textContent = '- 0.00';

// reset expenses percentage
expensesTotalPercentage.textContent = '---';

let expenses = [];
let expensesPercentages = [];

const calcItemPercentage = function (expenseValue) {
  let totalIncomeValues = totalValues.filter(val => val > 0);
  if (totalIncomeValues.length !== 0) {
    totalIncomeValues = totalIncomeValues.reduce((acc, val) => (acc += val));
    const value = Math.round((expenseValue / totalIncomeValues) * 100);
    expensesPercentages.push(value);
    return `${value}%`;
  } else {
    return '---';
  }
};

const addValueToExpensesList = function () {
  expensesList.innerHTML = '';
  expensesPercentages = [];
  for (let i = 0; i < expenses.length; i++) {
    const index = (i + 1) % 2 === 0 ? 1 : 0;
    const html = `
   <div class="item clearfix" id="expense-${index}">
    <div class="item__description">${expenses[i].description}</div>
    <div class="right clearfix">
     <div class="item__value">- ${new Intl.NumberFormat('en-US').format(
       expenses[i].value
     )}</div>
     <div class="item__percentage">${calcItemPercentage(
       expenses[i].value
     )}</div>
     <div class="item__delete">
      <button class="item__delete--btn" onclick= 
      "deleteExpenseItem(${i})">
      <i class="ion-ios-close-outline"></i></button>
     </div>
    </div>
   </div>`;
    expensesList.insertAdjacentHTML('beforeend', html);
  }
};

const displayTotalExpensesValues = function () {
  if (expenses.length !== 0) {
    expensesTotalValueEl.textContent = `- ${new Intl.NumberFormat(
      'en-US'
    ).format(
      totalValues.filter(val => val < 0).reduce((acc, val) => (acc += val)) * -1
    )}`;
  } else {
    expensesTotalValueEl.textContent = '- 0.00';
  }
};

const showTotalPercentage = function () {
  if (expensesPercentages.length !== 0) {
    console.log(expensesPercentages);
    expensesTotalPercentage.textContent = `${expensesPercentages.reduce(
      (acc, val) => (acc += val)
    )}%`;
  } else {
    expensesTotalPercentage.textContent = '---';
  }
};

export const addExpenseValue = function (description, cost) {
  expenses.push({ description: description.value, value: cost.value });
  totalValues.push(-Number.parseInt(cost.value));
  addValueToExpensesList();
  displayTotalExpensesValues();
  showTotalPercentage();
};

export const updatePercentageItems = function () {
  addValueToExpensesList();
  showTotalPercentage();
};

const remove = function (index) {
  const newExpenses = [];
  if (expenses.length !== 1) {
    for (let i = 0; i < expenses.length; i++) {
      if (index === i) continue;
      else {
        newExpenses.push(expenses[i]);
      }
    }
    expenses = newExpenses;
  } else {
    expenses = newExpenses;
  }
};

const updateTotalValues = function () {
  filterPositiveTotalValues();
  for (let i = 0; i < expenses.length; i++) {
    totalValues.push(-Number.parseInt(expenses[i].value));
  }
};

window.deleteExpenseItem = function (index) {
  remove(index);
  updateTotalValues();
  addValueToExpensesList();
  displayTotalExpensesValues();
  showTotalPercentage();
  showBudgetValue();
};
