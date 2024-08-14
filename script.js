const balance = document.getElementById('balance');
const expenses = document.getElementById('expenses');
const openExpensesBtn = document.getElementById('openExpenses');
const addExpensesLabel = document.getElementById('expense-label');
const addExpenseCost = document.getElementById('expense-cost');
const addExpenseDate = document.getElementById('expense-date');
const addExpenseBtn = document.getElementById('addExpense-btn');
const container = document.querySelector('.addExpense-container');


openExpensesBtn.addEventListener('click', () => {
    container.style.display = container.style.display === 'none' ? 'flex' : 'none'
})