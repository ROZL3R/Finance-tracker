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

let currentBalance = 0

const addMoneyToBalance = (input) => {
    const moneyInput = Number(input)
    return currentBalance += moneyInput
}

const removeMoneyFromBalance = (input) => {
    const moneyInput = Number(input)
    return currentBalance -= moneyInput
}

const addNewMoneyToList = () => {
    // Create a new list item
    const li = document.createElement('li');
    
    // Get the values from the input fields
    const textValue = addMoneyLabel.value.trim();
    const dateValue = addMoneyDate.value.trim();
    const moneyValue = addMoneyAmount.value.trim();

    if (!textValue || !dateValue || !moneyValue) {
        alert('Please fill out all fields.')
        return
    }

    // Create span elements with CSS classes
    const textSpan = document.createElement('span');
    textSpan.textContent = `Label: ${textValue} `;
    textSpan.classList.add('text-label');

    const dateSpan = document.createElement('span');
    dateSpan.textContent = `${dateValue} `;
    dateSpan.classList.add('date-label');

    const moneySpan = document.createElement('span');
    moneySpan.textContent = `+ ${moneyValue}`;
    moneySpan.classList.add('money-label');

    // Append the styled spans to the list item
    li.append(textSpan, dateSpan, moneySpan);

    // Append the list item to the expenses list
    expenses.appendChild(li);

    // Reset the input fields
    addMoneyLabel.value = '';
    addMoneyDate.value = '';
    addMoneyAmount.value = '';

    return li; 
}

const addExpensesToList = () => {
    // Create a new list item
    const li = document.createElement('li');
    
    // Get the values from the input fields
    const textValue = addExpensesLabel.value.trim();
    const dateValue = addExpenseDate.value.trim();
    const moneyValue = addExpenseCost.value.trim();

    if (!textValue || !dateValue || !moneyValue) {
        alert('Please fill out all fields.')
        return
    }

    // Create span elements with CSS classes
    const textSpan = document.createElement('span');
    textSpan.textContent = `Label: ${textValue} `;
    textSpan.classList.add('text-label');

    const dateSpan = document.createElement('span');
    dateSpan.textContent = `${dateValue} `;
    dateSpan.classList.add('date-label');

    const moneySpan = document.createElement('span');
    moneySpan.textContent = `- ${moneyValue}`;
    moneySpan.classList.add('money-expense-label');

    // Append the styled spans to the list item
    li.append(textSpan, dateSpan, moneySpan);

    // Append the list item to the expenses list
    expenses.appendChild(li);

    // Reset the input fields
    addExpensesLabel.value = '';
    addExpenseCost.value = '';
    addExpenseDate.value = '';

    return li; 
}

const showPopup = (popupElement) => {
    popupElement.classList.remove('hidden');
    overlay.style.display = 'block';
}

const hidePopup = (popupElement) => {
    popupElement.classList.add('hidden');
    overlay.style.display = 'none';
}

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
