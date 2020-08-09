const money = 100;
const income = 'фриланс';
const addExpenses = 'интернет, такси, коммуналка';
const deposit = true;
const mission = 50000;
const period = 6;
const budgetDay = 30000;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');
console.log(budgetDay);

console.log(addExpenses.toLowerCase().split(''));
