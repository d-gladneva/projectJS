const start = document.getElementById('start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositCheckmark = document.querySelector('.deposit-checkmark');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let additionalncomeItem = document.querySelectorAll('.additional_income-item');

const salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
const incomeTitle = incomeItems[0].querySelector('.income-title');

const incomeAmount = document.querySelector('.income-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const expensesTitle = expensesItems[0].querySelector('.expenses-title');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
const data = document.querySelector('.data');
const inputElems = data.querySelectorAll('input[type="text"]');
const inputAllElems = document.querySelectorAll('input[type="text"]');
console.log(inputElems);
const cancel = document.getElementById('cancel');

start.disabled = true;
inputElems.disabled = false;

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        start: function () {

            appData.budget = +salaryAmount.value;
            console.log('salaryAmount.value', salaryAmount.value);

            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getBudget();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.showResult();

            for (let i = 0; i < inputElems.length; i++) {
                inputElems[i].disabled = true;
                incomeAdd.disabled = true;
                expensesAdd.disabled = true;
            }
            start.style.display = 'none';
            cancel.style.display = 'block';

        },

        showResult: function () {

            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = appData.getTargetMonth();
            incomePeriodValue.value = appData.calcSavedMoney();

        },

        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        addExpensesBlock: function () {

            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
            expensesItems = document.querySelectorAll('.expenses-items');
            console.log(expensesItems.length);

            if (expensesItems.length === 3) {
                expensesAdd.style.display = "none";
            }
        },

        getExpenses: function () {
            expensesItems.forEach(function (item) {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== '') {
                    this.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
        getAddExpenses: function () {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function (item) {
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function () {
            additionalncomeItem.forEach(function (item) {
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    this.addIncome.push(itemValue);
                }
            });
        },
        getIncome: function () {
            incomeItems.forEach(function (item) {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if (itemIncome !== '' && cashIncome !== '') {
                    this.income[itemIncome] = cashIncome;
                }
            });
        },
        addIncomeBlock: function () {
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
            incomeItems = document.querySelectorAll('.income-items');
            console.log(incomeItems.length);

            if (incomeItems.length === 3) {
                incomeAdd.style.display = "none";
            }
        },

        asking: function () {

            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            this.addExpenses = addExpenses.split(/\s+ /).map(word => word[0].toUpperCase() + word.substring(1)).join('');
            this.deposit = confirm('Есть ли у Вас депозит в банке?');

        },
        getExpensesMonth: function () {
            for (let key in appData.expenses) {
                this.expensesMonth += +appData.expenses[key];
            }
        },

        getBudget: function () {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        },

        getTargetMonth: function () {
            return Math.ceil(targetAmount.value / this.budgetMonth);
        },

        getStatusIncome: function () {
            if (this.budgetDay >= 1200) {
                console.log('У Вас высокий уровень дохода');
            } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
                console.log('У Вас средний уровень дохода');
            } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
                console.log('К сожалению, у Вас уровень дохода ниже среднего');
            } else if (appData.budgetDay <= 0) {
                console.log('Что-то пошло не так');
            }
        },
        getInfoDeposit: function () {
            if (this.deposit) {
                do {
                    this.percentDeposit = prompt('Какой годовой процент?', '10');
                } while (!isNumber(this.moneyDeposit));

                do {
                    this.moneyDeposit = prompt('Какой годовой депозит?', 10000);
                } while (!isNumber(this.moneyDeposit));
            }
        },
        calcSavedMoney: function () {
            return this.budgetMonth * periodSelect.value;
        },

        periodSelect: function () {
            periodAmount.textContent = periodSelect.value;

        },
        periodResultTotal: function () {
            let periodResult = periodSelect.value * salaryAmount.value;
            incomePeriodValue.value = periodResult;
        },
        checkSalaryAmount: function () {

            if (salaryAmount.value && isNumber(salaryAmount.value)) {
                start.disabled = false;
            } else {
                start.disabled = true;
            }
        },
        reset: function () {
            for (let i = 0; i < inputElems.length; i++) {
                inputElems[i].disabled = false;
                inputAllElems[i].value = '';
            }

            incomeAdd.disabled = false;
            expensesAdd.disabled = false;
            periodAmount.textContent = '1';
            periodSelect.value = 1;
            for (let i = 0; i < incomeItems.length; i++) {
                if (i !== 0) {
                    incomeItems[i].remove();
                }
            }
            for (let i = 0; i < expensesItems.length; i++) {
                if (i!==0) {
                    expensesItems[i].remove();
                }
            }

            for (let i = 0; i < inputAllElems.length; i++) {
                inputAllElems[i].value = '';
            }

            cancel.style.display = 'none';
            start.style.display = 'block';
        }
    }
;

start.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.periodSelect);
salaryAmount.addEventListener('input', appData.checkSalaryAmount);
periodSelect.addEventListener('input', appData.periodResultTotal);
cancel.addEventListener('click', appData.reset);


appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Бюджет за день: ', appData.budgetDay);

console.log('Наша программа включает в себя данные: ');


for (let key in appData) {
    console.log('Ключ: ', key, ' ', 'Значение: ', appData[key]);
    if (typeof appData[key] === 'object') {
        for (let j in appData[key])
            console.log('Ключ: ', j, ' ', 'Значение: ', appData[key][j]);
    }
}
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());





