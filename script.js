// Select DOM elements
const balance = document.getElementById('balance');
const expenses = document.getElementById('expenses');
const openExpensesBtn = document.getElementById('openExpenses');
const openAddMoneyBtn = document.getElementById('addMoney');
const addExpensesLabel = document.getElementById('expense-label');
const addExpenseCost = document.getElementById('expense-cost');
const addExpenseDate = document.getElementById('expense-date');
const addExpenseBtn = document.getElementById('addExpense-btn');
const addExpenseContainer = document.getElementById('addExpense-container');
const addMoneyContainer = document.getElementById('addMoney-container');
const addMoneyLabel = document.getElementById('addMoney-label');
const addMoneyAmount = document.getElementById('addMoney-amount');
const addMoneyDate = document.getElementById('addMoney-date');
const addMoneyBtn = document.getElementById('addMoney-btn');
const overlay = document.getElementById('overlay');

let currentBalance = 0;

// Arrays to store expenses and money added
let expenseList = [];
let moneyList = [];

// Function to add money to the balance
const addMoneyToBalance = (input) => {
    const moneyInput = Number(input);
    return currentBalance += moneyInput;
};

// Function to remove money from the balance
const removeMoneyFromBalance = (input) => {
    const moneyInput = Number(input);
    return currentBalance -= moneyInput;
};

// Function to add new money to the list and update the chart
const addNewMoneyToList = () => {
    const li = document.createElement('li');
    const textValue = addMoneyLabel.value.trim();
    const dateValue = addMoneyDate.value.trim();
    const moneyValue = addMoneyAmount.value.trim();

    if (!textValue || !dateValue || !moneyValue) {
        alert('Please fill out all fields.');
        return;
    }

    const textSpan = document.createElement('span');
    textSpan.textContent = `Label: ${textValue} `;
    textSpan.classList.add('text-label');

    const dateSpan = document.createElement('span');
    dateSpan.textContent = `${dateValue} `;
    dateSpan.classList.add('date-label');

    const moneySpan = document.createElement('span');
    moneySpan.textContent = `+ ${moneyValue}`;
    moneySpan.classList.add('money-label');

    li.append(textSpan, dateSpan, moneySpan);
    expenses.appendChild(li);

    addMoneyLabel.value = '';
    addMoneyDate.value = '';
    addMoneyAmount.value = '';

    moneyList.push({ label: textValue, date: dateValue, amount: moneyValue });
    updateChart();
    return li;
};

// Function to add expenses to the list and update the chart
const addExpensesToList = () => {
    const li = document.createElement('li');
    const textValue = addExpensesLabel.value.trim();
    const dateValue = addExpenseDate.value.trim();
    const moneyValue = addExpenseCost.value.trim();

    if (!textValue || !dateValue || !moneyValue) {
        alert('Please fill out all fields.');
        return;
    }

    const textSpan = document.createElement('span');
    textSpan.textContent = `Label: ${textValue} `;
    textSpan.classList.add('text-label');

    const dateSpan = document.createElement('span');
    dateSpan.textContent = `${dateValue} `;
    dateSpan.classList.add('date-label');

    const moneySpan = document.createElement('span');
    moneySpan.textContent = `- ${moneyValue}`;
    moneySpan.classList.add('money-expense-label');

    li.append(textSpan, dateSpan, moneySpan);
    expenses.appendChild(li);

    addExpensesLabel.value = '';
    addExpenseCost.value = '';
    addExpenseDate.value = '';

    expenseList.push({ label: textValue, date: dateValue, amount: moneyValue });
    updateChart();
    return li;
};

// Function to show popup
const showPopup = (popupElement) => {
    popupElement.classList.remove('hidden');
    overlay.style.display = 'block';
};

// Function to hide popup
const hidePopup = (popupElement) => {
    popupElement.classList.add('hidden');
    overlay.style.display = 'none';
};

// Event listeners for buttons
openExpensesBtn.addEventListener('click', () => {
    showPopup(addExpenseContainer);
});

openAddMoneyBtn.addEventListener('click', () => {
    showPopup(addMoneyContainer);
});

addMoneyBtn.addEventListener('click', () => {
    balance.innerText = addMoneyToBalance(addMoneyAmount.value);
    addNewMoneyToList();
    hidePopup(addMoneyContainer);
});

addExpenseBtn.addEventListener('click', () => {
    balance.innerText = removeMoneyFromBalance(addExpenseCost.value);
    addExpensesToList();
    hidePopup(addExpenseContainer);
});

overlay.addEventListener('click', () => {
    hidePopup(addExpenseContainer);
    hidePopup(addMoneyContainer);
});

// Initialize Chart.js donut chart
const ctx = document.getElementById('balanceChart').getContext('2d');
const balanceChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Expenses', 'Money Added'],
        datasets: [{
            data: [0, 0],
            backgroundColor: [
                'rgb(237, 0, 28)',
                'rgb(0, 237, 40)',
            ],
            borderColor: 'transparent',
            hoverOffset: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '50%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: 'white'
                }
            },
            title: {
                display: true,
                text: 'Balance Overview',
                color: 'white'
            }
        }
    }
});

// Function to update the chart
const updateChart = (startDate = null, endDate = null) => {
    let totalExpenses = 0;
    let totalAddedMoney = 0;

    // Filter data based on date
    expenseList.forEach(item => {
        if ((!startDate && !endDate) || (new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate))) {
            totalExpenses += Number(item.amount);
        }
    });

    moneyList.forEach(item => {
        if ((!startDate && !endDate) || (new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate))) {
            totalAddedMoney += Number(item.amount);
        }
    });

    balanceChart.data.datasets[0].data = [totalExpenses, totalAddedMoney];
    balanceChart.update();
};

// Add date filtering options
const filterSelect = document.createElement('select');
filterSelect.innerHTML = `
    <option value="all">All Time</option>
    <option value="week">Last Week</option>
    <option value="month">Last Month</option>
    <option value="year">Last Year</option>
`;
filterSelect.addEventListener('change', () => {
    const today = new Date();
    let startDate, endDate;

    switch (filterSelect.value) {
        case 'week':
            startDate = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];
            break;
        case 'month':
            startDate = new Date(today.setMonth(today.getMonth() - 1)).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];
            break;
        case 'year':
            startDate = new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];
            break;
        default:
            startDate = null;
            endDate = null;
    }
    updateChart(startDate, endDate);
});

// Append filter to the document
document.body.insertBefore(filterSelect, document.getElementById('balanceChart'));
