let payments = [
];

let currentLanguage = 'lt';

const translations = {
    lt: {
        salary: 'Mėnesinis atlyginimas',
        income: 'Pajamos',
        expense: 'Išlaidos',
        balanceSum: 'Išlaidų ir pajamų suma',
        salaryBalance: 'Atlyginimo balansas',
    },
    en: {
        salary: 'Monthly salary',
        income: 'Income',
        expense: 'Expense',
        balanceSum: 'Sum of incurred expenses and income',
        salaryBalance: 'Salary balance',
    },
};

function load_data(data_wrapper_selector, data_array, balance_wrapper_selector) {
    let data_wrapper = document.querySelector(data_wrapper_selector);
    let balance_wrapper = document.querySelector(balance_wrapper_selector);
    let monthlySalary = document.getElementById("salary").valueAsNumber;

    if (!monthlySalary) {
        monthlySalary = 0;
    }

    const t = translations[currentLanguage];

    data_wrapper.innerHTML = '';
    for (const item of data_array) {
        data_wrapper.innerHTML += `
            <div class="item-wrapper">
                <p class="id">ID: ${item.id}</p>
                <p class="type ${item.type}">
                    ${item.type == 'income' ? t.income : t.expense}
                </p> 
                <p class="amount ${item.type}">${item.amount} €</p>
                <p class="when">${item.when}</p>
            </div>
        `;
    }

    balance_wrapper.innerHTML = `
        <h2>${t.salary}: ${monthlySalary} €</h2>
        <p>${t.income}: <span class="income">${calculateIncome(data_array)} €</span></p>
        <p>${t.expense}: <span class="expense">${calculateExpense(data_array)} €</span></p>
        <h3>${t.balanceSum}:
            <span class="${calculateBalance(data_array) > 0 ? 'income' : 'expense'}">
                ${calculateBalance(data_array)} €
            </span>
        </h3>
        <h2>${t.salaryBalance}: ${monthlySalary + calculateBalance(data_array)} €</h2>
    `;
}

load_data('.payments-wrapper', payments, '.balance-wrapper');

function calculateBalance(payment_data) {
    let sum = 0;
    for (const item of payment_data) {
        sum += item.amount;
    }
    return sum;
}

function calculateIncome(payment_data) {
    let sum = 0;
    for (const item of payment_data) {
        if (item.type == 'income') {
            sum += item.amount;
        }
    }
    return sum;
}

function calculateExpense(payment_data) {
    return payment_data.filter(item => item.type == 'expense').reduce((sum, item) => sum + item.amount, 0);
}

document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = amount >= 0 ? 'income' : 'expense';
    let piniguSaltinioPavadinimas = document.getElementById("pavadinimas").value;

    let resetButton = document.querySelector('.reset');
    resetButton.classList.add('show');

    let inputValueName = document.getElementById('pavadinimas');
    inputValueName.value = '';

    payments.push({
        id: piniguSaltinioPavadinimas,
        type: type,
        amount: amount,
        when: getCurrentDateTime()
    });

    let dataWrapper = document.querySelector('.payments-wrapper');
    let balanceWrapper = document.querySelector('.balance-wrapper');

    dataWrapper.innerHTML = '';
    balanceWrapper.innerHTML = '';

    load_data('.payments-wrapper', payments, '.balance-wrapper');

    document.getElementById('amount').value = '';
});

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

document.getElementById("salary").addEventListener('keyup', function (event) {
    let inputValue = event.target.valueAsNumber;

    if (inputValue < 0) {
        event.target.classList.add('error');
        event.target.nextElementSibling.classList.add('show');
    } else {
        event.target.classList.remove('error');
        event.target.nextElementSibling.classList.remove('show');
    }
});

document.querySelector("#payment-form").addEventListener('reset', function () {
    resetToDefaultValues();

    load_data('.payments-wrapper', payments, '.balance-wrapper');

    document.getElementById('amount').value = '';
});

function resetToDefaultValues() {
    const balance_wrapper = document.querySelector('.balance-wrapper');
    const defaultMonthlySalary = 0;
    const defaultIncome = 0;
    const defaultExpense = 0;
    const defaultBalance = 0;

    balance_wrapper.innerHTML = `
        <h2> Mėnesio atlyginimas: ${defaultMonthlySalary} €</h2>
        </h3>
        <p>Pajamos: <span class="income">${defaultIncome} €</span></p>
        <p>Išlaidos: <span class="expense">${defaultExpense} €</span></p>
        <h3>Patirtų išlaidų ir pajamų suma:
             <span class="expense">${defaultBalance} €</span>
            </span>
        <h2>Atlyginimo likutis: ${defaultBalance} €</h2>
    `;

    const payments_wrapper = document.querySelector('.payments-wrapper');
    payments_wrapper.innerHTML = ``;
    payments = [];

    let resetButton = document.querySelector('.reset');
    resetButton.classList.remove('show');
}

document.getElementById("switch-en").addEventListener('click', function (event) {
    currentLanguage = 'en';
    let headerText = document.querySelector('.h1');
    headerText.innerHTML = 'Finance calculator';

    let pavadinimoTekstas = document.querySelector('.pavadinimoTekstas');
    pavadinimoTekstas.innerHTML = 'Enter where you spent the money or source of income:'

    let optionMokesciai = document.getElementById('optionMokesciai');
    optionMokesciai.value = 'taxes';

    let optionNuoma = document.getElementById('optionNuoma');
    optionNuoma.value = 'rent';

    let optionKuras = document.getElementById('optionKuras');
    optionKuras.value = 'gas';

    let optionMaistas = document.getElementById('optionMaistas');
    optionMaistas.value = 'food';

    let optionPramogos = document.getElementById('optionPramogos');
    optionPramogos.value = 'entertainment';

    let piniguTekstas = document.querySelector('.piniguTekstas');
    piniguTekstas.innerHTML = 'Enter the amount of income received or expenses incurred:';

    let atlyginimoTekstas = document.getElementById('atlyginimoTekstas');
    atlyginimoTekstas.innerHTML = 'Enter your monthly salary:';

    let submitButton = document.querySelector('.submit');
    submitButton.innerHTML = 'Submit';

    let resetButton = document.querySelector('.reset');
    resetButton.innerHTML = 'Calculate again';

    load_data('.payments-wrapper', payments, '.balance-wrapper');

})

document.getElementById("switch-lt").addEventListener('click', function (event) {
    currentLanguage = 'lt';
    let headerText = document.querySelector('.h1');
    headerText.innerHTML = 'Pajamų ir išlaidų skaičiuoklė';

    let pavadinimoTekstas = document.querySelector('.pavadinimoTekstas');
    pavadinimoTekstas.innerHTML = 'Įrašykite kur išleidote pinigus arba gautų pajamų šaltinį:'

    let piniguTekstas = document.querySelector('.piniguTekstas');
    piniguTekstas.innerHTML = 'Įrašykite gautų pajamų arba patirtų išlaidų sumą:';

    let atlyginimoTekstas = document.getElementById('atlyginimoTekstas');
    atlyginimoTekstas.innerHTML = 'Įrašykite savo mėnesio atlyginimą:';

    let submitButton = document.querySelector('.submit');
    submitButton.innerHTML = 'Pateikti';

    load_data('.payments-wrapper', payments, '.balance-wrapper');
})

