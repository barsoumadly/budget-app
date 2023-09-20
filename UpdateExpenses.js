'use strict';

import { description, values } from './script.js';
import { incomeValues } from './UpdateIncome.js';

// selecting budget expenses value
const expensesValue = document.querySelector('.budget__expenses--value');
const expensesPrecentage = document.querySelector(
  '.budget__expenses--percentage'
);

expensesValue.textContent = '- 0.00';
expensesPrecentage.textContent = '---';

// selecting container
const expensesList = document.querySelector('.expenses__list');

// declaring main variable
const expensesValues = [];
const expenses = [];

const updateExpensesUI = function (
  value = expensesValues[expensesValues.length - 1],
  index = expensesValues.length % 2 === 0 ? 1 : 0,
  desc = description.value
) {
  const html = `                        
  <div class="item clearfix" id="expense-${index}">
   <div class="item__description">${desc}</div>
    <div class="right clearfix">
    <div class="item__value">- ${value.toFixed(2)}</div>
    <div class="item__percentage">${
      values.some(val => val > 0)
        ? (
            (value /
              values.filter(el => el > 0).reduce((acc, val) => (acc += val))) *
            100
          ).toFixed() + '%'
        : '---'
    }</div>
     <div class="item__delete">
      <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
    </div>
   </div>
  </div>`;
  expensesList.insertAdjacentHTML('beforeend', html);
};

const showTotalPrecentage = function () {
  const income = incomeValues.reduce((acc, val) => (acc += val));
  const expense = expensesValues.reduce((acc, val) => (acc += val));
  expensesPrecentage.textContent = `${((expense / income) * 100).toFixed()}%`;
};

export const updateExpenses = function (addValue) {
  expensesValues.push(Number.parseFloat(addValue));
  expenses.push({
    value: Number.parseFloat(addValue),
    description: description.value,
  });
  expensesValue.textContent = `- ${expensesValues
    .reduce((acc, val) => (acc += val))
    .toFixed(2)}`;
  updateExpensesUI();
  showTotalPrecentage();
};

export const updatePrecentages = function () {
  if (expensesValues.length !== 0) {
    expensesList.innerHTML = '';
    for (let i = 0; i < expensesValues.length; i++) {
      updateExpensesUI(expenses[i].value, i + 1, expenses[i].description);
    }
    showTotalPrecentage();
  }
};
