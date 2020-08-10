const money = prompt('Ваш месячный доход?');
console.log(money);
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses);
const deposit = confirm('Есть ли у Вас депозит в банке?');
console.log(deposit);
const mission = 120000;
const period = 6;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');
console.log(addExpenses.toLowerCase().split(' '));


const expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2;
if (expenses1) {
    expenses2 = prompt('Введите обязательную статью расходов?');
}

const amount1 = prompt('Во сколько это обойдется?');
let amount2;
if (amount1) {
    amount2 = prompt('Во сколько это обойдется?');
}
const budgetMonth = +amount1 + +amount2;
const budgetDay = parseInt(budgetMonth / 30);
console.log('Бюджет на месяц:', budgetMonth);
const missionMonths = Math.round(mission / budgetMonth);
console.log('Цель будет достигнута за:', missionMonths);
console.log('Бюджет за день:', budgetDay);


if (budgetDay >= 1200) {
    console.log('У Вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У Вас средний уровень дохода');
} else if (budgetDay < 600) {
    console.log('К сожалению, у Вас уровень дохода ниже среднего');
}



