import {
  showBudgetValue,
  filterNegativeTotalValues,
  totalValues,
} from './script.js';
import { updatePercentageItems } from './Expenses.js';

const incomeTotalValueEl = document.querySelector('.budget__income--value');
const incomeContainer = document.querySelector('.income__list');

// reset income value
incomeTotalValueEl.textContent = '+ 0.00';

let incomes = [];

const addValueToIncomesList = function () {
  incomeContainer.innerHTML = '';
  for (let i = 0; i < incomes.length; i++) {
    const index = (i + 1) % 2 === 0 ? 1 : 0;
    const html = `
    <div class="item clearfix" id="income-${index}">
     <div class="item__description">${incomes[i].description}</div>
     <div class="right clearfix">
      <div class="item__value">+ ${new Intl.NumberFormat('en-US').format(
        incomes[i].value
      )}</div>
      <div class="item__delete">
      <button class="item__delete--btn" 
      onclick="deleteIncomeItem()">
      <i class="ion-ios-close-outline"></i></button>
      </div>
     </div>
    </div>`;
    incomeContainer.insertAdjacentHTML('beforeend', html);
  }
};

const displayTotalIncomeValues = function () {
  if (incomes.length !== 0) {
    incomeTotalValueEl.textContent = `+ ${new Intl.NumberFormat('en-US').format(
      totalValues.filter(val => val > 0).reduce((acc, val) => (acc += val))
    )}`;
  } else {
    incomeTotalValueEl.textContent = '+ 0.00';
  }
};

export const addIncomeValue = function (description, cost) {
  incomes.push({ description: description.value, value: cost.value });
  totalValues.push(Number.parseInt(cost.value));
  addValueToIncomesList();
  displayTotalIncomeValues();
  updatePercentageItems();
};

const remove = function (index) {
  const newIncomes = [];
  if (incomes.length !== 1) {
    for (let i = 0; i < incomes.length; i++) {
      if (index === i) continue;
      else {
        newIncomes.push(incomes[i]);
      }
    }
    incomes = newIncomes;
  } else {
    incomes = newIncomes;
  }
};

const updateTotalValues = function () {
  filterNegativeTotalValues();
  for (let i = 0; i < incomes.length; i++) {
    totalValues.push(Number.parseInt(incomes[i].value));
  }
  // console.log(totalValues);
};

window.deleteIncomeItem = function (index) {
  remove(index);
  updateTotalValues();
  addValueToIncomesList();
  displayTotalIncomeValues();
  updatePercentageItems();
  showBudgetValue();
};
