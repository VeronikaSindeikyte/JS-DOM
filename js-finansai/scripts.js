let payments = [
]

function load_data(data_wrapper_selector, data_array, balance_wrapper_selector) {
    let data_wrapper = document.querySelector(data_wrapper_selector)
    let balance_wrapper = document.querySelector(balance_wrapper_selector)

    for(const item of data_array) {
        data_wrapper.innerHTML += `
            <div class="item-wrapper">
                <p class="id">ID: ${item.id}</p>
                <p class="type ${item.type}">
                    ${item.type == 'income' ? 'Pajamos' : 'Išlaidos'}
                </p> 
                <p class="amount ${item.type}">${item.amount} €</p>
                <p class="when">${item.when}</p>
            </div>
        `
    }

    let monthlySalary = document.getElementById("salary").valueAsNumber;
    console.log("Mėnesio atlyginimas:", monthlySalary);
    console.log("Mėnesio atlyginimas:", typeof monthlySalary);
    console.log("Mėnesio atlyginimas:", !monthlySalary);

    if (!monthlySalary) {
        monthlySalary = 0;
    }

    balance_wrapper.innerHTML = `
        <h2> Mėnesio atlyginimas: ${monthlySalary} €</h2>
        </h3>
        <p>Pajamos: <span class="income">${calculateIncome(data_array)} €</span></p>
        <p>Išlaidos: <span class="expense">${calculateExpense(data_array)} €</span></p>
        <h3>Patirtų išlaidų ir pajamų suma:
            <span class="${calculateBalance(data_array) > 0 ? 'income' : 'expense'}">
                ${calculateBalance(data_array)} €
            </span>
        <h2>Atlyginimo likutis: ${monthlySalary + calculateBalance(data_array)} €</h2>
    `
}

load_data('.payments-wrapper', payments, '.balance-wrapper')

function calculateBalance(payment_data) {
    let sum = 0
    for(const item of payment_data) {
        sum += item.amount
    }
    return sum
}

function calculateIncome(payment_data) {
    let sum = 0
    for(const item of payment_data) {
        if(item.type == 'income') {
            sum += item.amount
        }
    }
    return sum
}


function calculateExpense(payment_data) {
    return payment_data.filter(item => item.type == 'expense').reduce((sum, item) => sum + item.amount,0)
}

document.getElementById('payment-form').addEventListener('submit', function(event){
    event.preventDefault()
    const amount = parseFloat(document.getElementById('amount').value)
    const type = amount >= 0 ? 'income' : 'expense'
    let piniguSaltinioPavadinimas = document.getElementById("pavadinimas").value;

    payments.push({
        id: piniguSaltinioPavadinimas,
        type: type,
        amount: amount,
        when: getCurrentDateTime()
    })

    let dataWrapper = document.querySelector('.payments-wrapper')
    let balanceWrapper = document.querySelector('.balance-wrapper')

    dataWrapper.innerHTML = ''
    balanceWrapper.innerHTML = ''

    load_data('.payments-wrapper', payments, '.balance-wrapper')

    document.getElementById('amount').value = ''
})

function getCurrentDateTime() {
    const now = new Date()
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day
    hours = hours < 10 ? `0${hours}` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

document.getElementById("salary").addEventListener('keyup', function(event) {
    let inputValue = event.target.valueAsNumber;
    console.log(inputValue)

    if (inputValue < 0) {
        event.target.classList.add('error');
        event.target.nextElementSibling.classList.add('show');
    } else {
        event.target.classList.remove('error');
        event.target.nextElementSibling.classList.remove('show');
    }
});
 
document.querySelector('.reset').addEventListener('submit', function (event) {
    
});
