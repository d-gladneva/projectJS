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
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.getTargetMonth();
        this.periodResultTotal();
        this.showResult();


        this.getStatusIncome();


        for (let i = 0; i < inputElems.length; i++) {
            inputElems[i].disabled = true;
            incomeAdd.disabled = true;
            expensesAdd.disabled = true;

        }
        start.style.display = 'none';
        cancel.style.display = 'block';
        periodSelect.addEventListener('input', this.periodResultTotal.bind(this));
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
        }.bind(this));
    }

    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }.bind(this));
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

        if (incomeItems.length === 3) {
            incomeAdd.style.display = "none";
        }
    }

    addExpensesBlock() {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');

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
        const monthDeposit = this.moneyDeposit * this.percentDeposit;
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
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
        console.log(5);

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
        incomeAdd.style.display = "block";
        expensesAdd.style.display = "block";
        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        this.checkSalaryAmount();
        this.checkTargetAmount();

        start.removeEventListener('click', this.start.bind(this));
        expensesAdd.removeEventListener('click', this.addExpensesBlock.bind(this));
        incomeAdd.removeEventListener('click', this.addIncomeBlock.bind(this));

        salaryAmount.removeEventListener('input', this.checkSalaryAmount.bind(this));
        targetAmount.removeEventListener('input', this.checkTargetAmount.bind(this));
        depositPercent.removeEventListener('click', this.checkDepositPercentValue.bind(this));
        cancel.removeEventListener('click', this.reset.bind(this));
        depositCheck.removeEventListener('change', this.depositHandler.bind(this));
        periodSelect.removeEventListener('input', this.periodSelect.bind(this));
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    checkDepositPercentValue() {
        if (isNumber(depositPercent.value)) {
            start.disabled = false;
            if (depositPercent.value > 0 && depositPercent.value < 100) {
                start.disabled = false;
            } else {
                depositPercent.value = '';
                start.disabled = true;
            }
        } else {
            depositPercent.value = '';
            start.disabled = true;
        }

    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            depositPercent.disabled = false;
            depositPercent.addEventListener('input', appData.checkValidPersent.bind(appData));
            depositAmount.addEventListener('input', appData.checkValidAmount.bind(appData));


        } else if (valueSelect === '') {
            start.disabled = true;
            depositAmount.value = '';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
            depositPercent.removeEventListener('input', appData.checkValidPersent.bind(appData));
            if (depositAmount.value !== '') {
                start.disabled = false;
            }
        }

        depositPercent.addEventListener('input', this.checkDepositPercent);
        depositAmount.addEventListener('input', this.checkDepositAmount);
        salaryAmount.addEventListener('input', this.checkSalaryAmount);


    }

    checkValidPersent() {
        if (!isNumber(depositPercent.value) || depositPercent.value > 100 || depositPercent.value < 0) {
            alert('Введите число от 0 до 100!');
            depositPercent.value = '';
        }
    }

    checkValidAmount(){
            if (!isNumber(depositAmount.value)) {
                alert('Введите числовое значение!');
                depositAmount.value = '';
            }
    }


    checkDepositPercent() {
        if (depositPercent.value === '' || depositAmount.value === '' || salaryAmount.value === '' || depositBank.value === '') {
            start.disabled = true;
        } else {
            start.disabled = false;
        }
    }

    checkDepositAmount() {
        if (depositAmount.value === '' || depositPercent.value === '' || salaryAmount.value === '' || depositBank.value === '') {
            start.disabled = true;

        } else {
            depositAmount.value = '';
            start.disabled = false;
        }

    }

    checkTargetAmount() {
        if (isNumber(targetAmount.value)) {
            start.disabled = false;

        } else {
            targetAmount.value = '';
            start.disabled = true;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            start.disabled = true;
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            start.disabled = false;
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
            depositPercent.removeEventListener('input', this.checkDepositPercent);
            depositAmount.removeEventListener('input', this.checkDepositAmount);
            salaryAmount.removeEventListener('input', this.checkSalaryAmount);
            depositAmount.removeEventListener('input', appData.checkValidAmount.bind(appData));
        }
    }

    eventListeners() {
        start.addEventListener('click', this.start.bind(this));
        expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
        incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.periodSelect.bind(this));
        salaryAmount.addEventListener('input', this.checkSalaryAmount.bind(this));
        targetAmount.addEventListener('input', this.checkTargetAmount.bind(this));
        depositPercent.addEventListener('click', this.checkDepositPercentValue.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}

let appData = new AppData();

appData.eventListeners();







