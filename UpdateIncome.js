'use strict';

import { description } from './script.js';

// selecting budget income value
const incomeValue = document.querySelector('.budget__income--value');

incomeValue.textContent = '+ 0.00';

// selecting containers
const incomeList = document.querySelector('.income__list');

// declaring main variable
export const incomeValues = [];

const updateIncomeUI = function () {
  const value = incomeValues[incomeValues.length - 1];
  const index = incomeValues.length % 2 === 0 ? 1 : 0;
  const html = `
    <div class="item clearfix" id="income-${index}">
     <div class="item__description">${description.value}</div>
     <div class="right clearfix">
      <div class="item__value">+ ${value.toFixed(2)}</div>
      <div class="item__delete">
        <button class="item__delete--btn">
          <i class="ion-ios-close-outline"></i>
        </button>
      </div>
     </div>
    </div>`;
  incomeList.insertAdjacentHTML('beforeend', html);
};

export const updateIncome = function (addValue) {
  incomeValues.push(Number.parseFloat(addValue));
  incomeValue.textContent = `+ ${incomeValues
    .reduce((acc, val) => (acc += val))
    .toFixed(2)}`;
  updateIncomeUI();
};
