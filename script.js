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

        let sum = 0;
        appData.getExpensesMonth = function () {
            for (let i = 0; i < 2; i++) {
                appData.expenses[i] = prompt('Введите обязательную статью расходов?');
                let amount = prompt('Во сколько это обойдется?');

                while (!isNumber(amount)) {
                    amount = prompt('Во сколько это обойдется?');

                }
                sum += +amount;
            }
            return sum;
        };

    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0
};

appData.asking();

console.log(appData);


let expensesAmount = appData.getExpensesMonth();

console.log('Расходы за месяц:' + expensesAmount);

console.log('Период равен', appData.period, 'месяцев');
console.log('Цель заработать', appData.mission, 'рублей');


appData.getBudget = function () {
    appData.budgetMonth = appData.budget - expensesAmount;
};
const accumulatedMonth = appData.getAccumulatedMonth();

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






