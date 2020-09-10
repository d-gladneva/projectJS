const start = document.getElementById('start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositCheckmark = document.querySelector('.deposit-checkmark');
const depositCheck = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
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
const income = document.querySelector('.income');
const inputElems = data.querySelectorAll('input[type="text"]');
const inputAllElems = document.querySelectorAll('input[type="text"]');
console.log(inputElems);
const cancel = document.getElementById('cancel');

start.disabled = true;
inputElems.disabled = false;

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
    constructor() {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }

    start() {
        this.budget = +salaryAmount.value;
        console.log('salaryAmount.value', salaryAmount.value);

        this.getExpInc();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();

        this.getTargetMonth();
        this.getStatusIncome();
        this.periodResultTotal();

        for (let i = 0; i < inputElems.length; i++) {
            inputElems[i].disabled = true;
            incomeAdd.disabled = true;
            expensesAdd.disabled = true;
        }
        start.style.display = 'none';
        cancel.style.display = 'block';

    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    }


    // getExpenses() {
    //     let me = this;
    //     expensesItems.forEach(function (item) {
    //         let itemExpenses = item.querySelector('.expenses-title').value;
    //         let cashExpenses = item.querySelector('.expenses-amount').value;
    //         if (itemExpenses !== '' && cashExpenses !== '') {
    //             this.expenses[itemExpenses] = cashExpenses;
    //             console.log(this);
    //         }
    //     }, me);
    // }
    //
    //
    // getIncome() {
    //     let me = this;
    //     incomeItems.forEach(function (item) {
    //         let itemIncome = item.querySelector('.income-title').value;
    //         let cashIncome = item.querySelector('.income-amount').value;
    //         if (itemIncome !== '' && cashIncome !== '') {
    //             this.income[itemIncome] = cashIncome;
    //         }
    //     }, me);
    // }

    getExpInc() {
        const count = item => {
            const starStr = item.className.split('-')[0];
            console.log(starStr);
            const itemTitle = item.querySelector(`.${starStr}-title`).value;
            const itemAmount = item.querySelector(`.${starStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[starStr][itemTitle] = itemAmount;
            }
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddIncome() {
        additionalncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    // getAddIncExp(){
    //
    //     let addExpenses = additionalExpensesItem.value.split(',');
    //
    //     const getAdd = item => {
    //
    //         let itemValue = item.value.trim();
    //         // item = item.trim();
    //         if (item !== ''&&itemValue !== '') {
    //             // this.addExpenses.push(item);
    //             this.addIncome.push(itemValue);
    //         }
    //     };
    //
    //
    //     additionalncomeItem.forEach(getAdd);
    //     addExpenses.forEach(getAdd);
    //
    // }

    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        console.log(incomeItems.length);

        if (incomeItems.length === 3) {
            incomeAdd.style.display = "none";
        }
    }

    addExpensesBlock() {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        console.log(expensesItems.length);

        if (expensesItems.length === 3) {
            expensesAdd.style.display = "none";

        }
    }

    // addExpIncBlock(){
    //     const starStr = income.className.split('-')[0];
    //     console.log(starStr);
    //     let cloneIncomeItem = incomeItems[0].cloneNode(true);
    //     incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    //     let cloneExpensesItem = expensesItems[0].cloneNode(true);
    //     expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    //     const addItems = income.querySelectorAll(`.${starStr}-items`);
    //
    //     if (addItems.length === 3) {
    //         expensesAdd.style.display = "none";
    //         incomeAdd.style.display = "none";
    //     }
    // }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        if (targetAmount.value && this.budgetMonth)
            return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            console.log('У Вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            console.log('У Вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay > 0) {
            console.log('К сожалению, у Вас уровень дохода ниже среднего');
        } else if (this.budgetDay <= 0) {
            console.log('Что-то пошло не так');
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    periodSelect() {
        periodAmount.textContent = periodSelect.value;

    }

    periodResultTotal() {
        let periodResult = periodSelect.value * salaryAmount.value;
        incomePeriodValue.value = periodResult;
    }

    checkSalaryAmount() {

        if (salaryAmount.value && isNumber(salaryAmount.value)) {
            start.disabled = false;
        } else {
            start.disabled = true;
        }
    }

    checkDepositPercent() {

        if (0 < depositPercent.value && depositPercent.value < 100 && isNumber(depositPercent.value)) {
            start.disabled = false;
        } else {
            start.disabled = true;
        }
    }

    reset() {
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
            if (i !== 0) {
                expensesItems[i].remove();
            }
        }

        for (let i = 0; i < inputAllElems.length; i++) {
            inputAllElems[i].value = '';
        }

        const CopyAppData = new AppData();

        Object.assign(this, CopyAppData);


        cancel.style.display = 'none';
        start.style.display = 'block';
        this.checkSalaryAmount();
        this.checkDepositPercent();
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        console.log(valueSelect);
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.disabled = false;
            console.log(depositPercent.value);
            // depositPercent.value = '';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent.bind(this));
        }

    }

    eventListeners() {
        start.addEventListener('click', this.start.bind(this));
        console.log(this);
        expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
        incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.periodSelect.bind(this));
        salaryAmount.addEventListener('input', this.checkSalaryAmount.bind(this));
        depositPercent.addEventListener('input', this.checkDepositPercent.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}

let appData = new AppData();

appData.eventListeners();

console.log(AppData);
console.log(appData);


// console.log('Расходы за месяц: ' + this.expensesMonth);
// console.log('Бюджет за день: ', this.budgetDay);
//
// console.log('Наша программа включает в себя данные: ');
//
//
// for (let key in this) {
//     console.log('Ключ: ', key, ' ', 'Значение: ', this[key]);
//     if (typeof this[key] === 'object') {
//         for (let j in this[key])
//             console.log('Ключ: ', j, ' ', 'Значение: ', this[key][j]);
//     }
// }
//
// console.log(this.percentDeposit, this.moneyDeposit, this.calcSavedMoney());





