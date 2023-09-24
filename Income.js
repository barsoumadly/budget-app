import { totalValues } from './script.js';
import { updatePercentageItems } from './Expenses.js';

const incomeTotalValueEl = document.querySelector('.budget__income--value');
const incomeContainer = document.querySelector('.income__list');

// reset income value
incomeTotalValueEl.textContent = '+ 0.00';

const incomes = [];

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
      <button class="item__delete--btn"><i      class="ion-ios-close-outline"></i></button>
      </div>
     </div>
    </div>`;
    incomeContainer.insertAdjacentHTML('beforeend', html);
  }
};

const displayTotalIncomeValues = function () {
  incomeTotalValueEl.textContent = `+ ${new Intl.NumberFormat('en-US').format(
    totalValues.filter(val => val > 0).reduce((acc, val) => (acc += val))
  )}`;
};

export const addIncomeValue = function (description, cost) {
  incomes.push({ description: description.value, value: cost.value });
  totalValues.push(Number.parseInt(cost.value));
  addValueToIncomesList();
  displayTotalIncomeValues();
  updatePercentageItems();
};
