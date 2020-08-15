let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function () {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};

start();


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(' ');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');


            for (let i = 0; i < 2; i++) {
                let expenses = prompt('Введите обязательную статью расходов?', "Коммуналка");
                let amount;

                 do {
                    amount = prompt('Во сколько это обойдется?');
                } while (!isNumber(amount));

                appData.expenses[amount] = +amount;

            }


    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0
};

appData.asking();



appData.getExpensesMonth = function () {
    for (let key in appData){
        appData.expensesMonth += appData.expenses;
    }
};

let expensesAmount = appData.getExpensesMonth();

console.log('Расходы за месяц:' + expensesAmount);

appData.getBudget = function () {
    appData.budgetMonth = appData.budget - expensesAmount;
};
const accumulatedMonth = appData.getBudget();

appData.getTargetMonth = function () {
    appData.expensesMonth = appData.mission / accumulatedMonth;
};

appData.budgetDay = Math.floor(accumulatedMonth / 30);
console.log(appData.mission / accumulatedMonth < 0 ? 'Цель не будет достигнута' : 'Цель будет достигнута за: ' +
    Math.ceil(appData.getTargetMonth()) + 'мес');
console.log('Бюджет за день:', appData.budgetDay);


appData.getStatusIncome = function () {
    if (appData.budgetDay >= 1200) {
        console.log('У Вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
        console.log('У Вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
        console.log('К сожалению, у Вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 0) {
        console.log('Что-то пошло не так');
    }
};

appData.getStatusIncome();






