let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у Вас депозит в банке?');
const mission = -12;
const period = 6;

let start = function () {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};

start();

let showTypeOf = function (data) {
    console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

const getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        let amount = +prompt('Во сколько это обойдется?');

        while (!isNumber(amount)) {
            amount = prompt('Во сколько это обойдется?');

        }
        sum += +amount;
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц:' + expensesAmount);

console.log(addExpenses.toLowerCase().split(' '));
console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');


const getAccumulatedMonth = function () {
    return money - expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
    if (mission < 0 || accumulatedMonth < 0) {
        return ('Цель не будет достигнута');
    }
        return mission / accumulatedMonth;
};

const budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Цель будет достигнута за:' + Math.round(getTargetMonth()) + 'мес');
console.log('Бюджет за день:', budgetDay);


let getStatusIncome = function () {
    if (budgetDay >= 1200) {
        console.log('У Вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        console.log('У Вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay > 0) {
        console.log('К сожалению, у Вас уровень дохода ниже среднего');
    } else if (budgetDay <= 0) {
        console.log('Что-то пошло не так');
    }
};

getStatusIncome();



