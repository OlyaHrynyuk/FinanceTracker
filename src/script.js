// Отримання елементів DOM
const balanceDisplay = document.getElementById('balance-display');
const form = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

// 1. Ініціалізація або завантаження транзакцій
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// 2. Функція збереження транзакцій у Local Storage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// 3. Функція додавання нової транзакції
function addTransaction(e) {
    e.preventDefault(); // Запобігає перезавантаженню сторінки

    // *ВИПРАВЛЕНО: Отримуємо значення input'ів тут*
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description.trim() === ''  isNaN(amount)  amount === 0) {
        alert('Будь ласка, введіть коректний опис та суму.');
        return;
    }

    const transaction = {
        id: Date.now(), 
        description,
        amount: amount.toFixed(2) 
    };

    transactions.push(transaction);
    saveTransactions(); 
    updateUI(); // Оновлюємо інтерфейс
    
    // Очищуємо форму
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

// 4. Функція оновлення інтерфейсу (Баланс та Історія)
function updateUI() {
    // A. Оновлення Балансу
    const total = transactions.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    balanceDisplay.textContent = ${total.toFixed(2)};

    // B. Оновлення Історії
    transactionList.innerHTML = ''; // Очищуємо список перед додаванням нових елементів
    
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        
        // Визначаємо клас для стилів (зелений/червоний)
        li.classList.add(parseFloat(transaction.amount) > 0 ? 'plus' : 'minus'); 
        
        // Створення вмісту елемента списку
        li.innerHTML = `
            ${transaction.description} <span>${transaction.amount} UAH</span>
        `;
        // *ВАЖЛИВО: Додаємо елемент до HTML*
        transactionList.appendChild(li); 
    });
}

// 5. Обробник події: При відправці форми викликаємо addTransaction
form.addEventListener('submit', addTransaction);

// 6. Первинне завантаження інтерфейсу при відкритті
updateUI();