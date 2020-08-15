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
    mission: 500000,
    period: 3,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(' ');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let expenses = prompt('Введите обязательную статью расходов?', 'Парковка');
            let amount;

            do {
                amount = prompt('Во сколько это обойдется?');
            } while (!isNumber(amount));

            appData.expenses[expenses] = +amount;

        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
            console.log(typeof appData.expenses[key]);
        }

    },

    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {
        let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
        if (targetMonth < 0) {
            console.log('Цель не будет достигнута');
        } else  {
            console.log('Цель будет достигнута за: ' + targetMonth + ' мес');
        }
    },

    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            console.log('У Вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            console.log('У Вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
            console.log('К сожалению, у Вас уровень дохода ниже среднего');
        } else if (appData.budgetDay <= 0) {
            console.log('Что-то пошло не так');
        }
    },

};
console.log(appData);

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Бюджет за день: ', appData.budgetDay);

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log('Ключ: ' + key + ' ' + 'Значение: ' + appData[key]);
}







