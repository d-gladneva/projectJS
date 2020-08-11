const money = prompt('Ваш месячный доход?');
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у Вас депозит в банке?');
const mission = 120000;
const period = 6;

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = prompt('Во сколько это обойдется?');

const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = prompt('Во сколько это обойдется?');

const getExpensesMonth = function (exp1, exp2) {
    return +exp1 + +exp2;
};

console.log(addExpenses.toLowerCase().split(' '));
console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');


const getAccumulatedMonth = function (inc) {
    return inc - getExpensesMonth(amount1, amount2);
};

const accumulatedMonth = getAccumulatedMonth(money);

const getTargetMonth = function(){
    return accumulatedMonth/30;
};

const budgetDay = parseInt(getTargetMonth/30);
const missionMonths = Math.round(mission / getTargetMonth);
console.log('Цель будет достигнута за:', missionMonths);
console.log('Бюджет за день:', budgetDay);


let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        console.log('У Вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        console.log('У Вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay > 0 ) {
        console.log('К сожалению, у Вас уровень дохода ниже среднего');
    } else if (budgetDay <= 0){
        console.log('Что-то пошло не так');
    }
};

getStatusIncome();



