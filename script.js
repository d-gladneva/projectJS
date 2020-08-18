const start = document.getElementById('start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositCheckmark = document.querySelector('.deposit-checkmark');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetMonthValue = document.getElementsByTagName('budget_month-value')[0];
const budgetDayValue = document.getElementsByTagName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByTagName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByTagName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByTagName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByTagName('income_period-value')[0];
const targetMonthValue = document.getElementsByTagName('budget_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');
const incomeItems = document.querySelector('.income-items');
const incomeTitle = incomeItems.querySelector('.income-title');

const incomeAmount = document.querySelector('.income-amount');
const expensesItems = document.querySelector('.expenses-items');
const expensesTitle = expensesItems.querySelector('.expenses-title');

const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.periodSelect');


console.log(start);
console.log(incomeAdd);
console.log(expensesAdd);
console.log(depositCheckmark);
console.log(additionalIncomeItem);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(additionalExpensesItem);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(targetAmount);
console.log(periodSelect);







//
//
//
//
//
// let isNumber = function (n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };
//
// let money;
//
// let start = function () {
//     do {
//         money = prompt('Ваш месячный доход?');
//     }
//     while (!isNumber(money));
// };
//
// start();
//
//
// let appData = {
//     income: {},
//     addIncome: [],
//     expenses: {},
//     addExpenses: [],
//     deposit: false,
//     percentDeposit: 0,
//     moneyDeposit: 0,
//     mission: 500000,
//     period: 3,
//     budget: +money,
//     budgetDay: 0,
//     budgetMonth: 0,
//     expensesMonth: 0,
//     asking: function () {
//
//         if (confirm('Есть ли у Вас доп заработок?')) {
//             let itemIncome;
//             do {
//                 itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Преподавание');
//             }
//             while (!isNaN(itemIncome) || typeof itemIncome === 'number' || itemIncome === null);
//
//             let cashIncome;
//             do {
//                 cashIncome = prompt('Сколько в месяц Вы зарабатываете на этом?', 10000);
//             } while (!isNumber(cashIncome));
//             appData.income[itemIncome] = cashIncome;
//         }
//
//         let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//         appData.addExpenses = addExpenses.split(/\s+ /).map(word => word[0].toUpperCase() + word.substring(1)).join('');
//         appData.deposit = confirm('Есть ли у Вас депозит в банке?');
//
//         for (let i = 0; i < 2; i++) {
//             let expenses;
//             do {
//                 expenses = prompt('Введите обязательную статью расходов?', 'Парковка');
//             }
//             while (!isNaN(expenses) || typeof expenses === 'number' || expenses === null);
//
//             let amount;
//
//             do {
//                 amount = prompt('Во сколько это обойдется?');
//             } while (!isNumber(amount));
//
//             appData.expenses[expenses] = +amount;
//
//         }
//     },
//     getExpensesMonth: function () {
//         for (let key in appData.expenses) {
//             appData.expensesMonth += appData.expenses[key];
//             console.log(typeof appData.expenses[key]);
//         }
//
//     },
//
//     getBudget: function () {
//         appData.budgetMonth = appData.budget - appData.expensesMonth;
//         appData.budgetDay = Math.floor(appData.budgetMonth / 30);
//     },
//
//     getTargetMonth: function () {
//         let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
//         if (targetMonth < 0) {
//             console.log('Цель не будет достигнута');
//         } else {
//             console.log('Цель будет достигнута за: ' + targetMonth + ' мес');
//         }
//     },
//
//     getStatusIncome: function () {
//         if (appData.budgetDay >= 1200) {
//             console.log('У Вас высокий уровень дохода');
//         } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
//             console.log('У Вас средний уровень дохода');
//         } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
//             console.log('К сожалению, у Вас уровень дохода ниже среднего');
//         } else if (appData.budgetDay <= 0) {
//             console.log('Что-то пошло не так');
//         }
//     },
//     getInfoDeposit: function () {
//         if (appData.deposit) {
//             do {
//                 appData.percentDeposit = prompt('Какой годовой процент?', '10');
//             } while (!isNumber(appData.moneyDeposit));
//
//             do {
//                 appData.moneyDeposit = prompt('Какой годовой депозит?', 10000);
//             } while (!isNumber(appData.moneyDeposit));
//         }
//     },
//     calcSavedMoney: function () {
//         return appData.budgetMonth * appData.period;
//     }
//
// };
// console.log(appData);
//
// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();
//
// console.log('Расходы за месяц: ' + appData.expensesMonth);
// console.log('Бюджет за день: ', appData.budgetDay);
//
// console.log('Наша программа включает в себя данные: ');
//
//
// for (let key in appData) {
//     console.log('Ключ: ', key, ' ', 'Значение: ', appData[key]);
//     if (typeof appData[key] === 'object') {
//         for (let j in appData[key])
//             console.log('Ключ: ', j, ' ', 'Значение: ', appData[key][j]);
//     }
// }
// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
//
//
//
//
