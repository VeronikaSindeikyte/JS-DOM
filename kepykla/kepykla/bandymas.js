let calculateButton = document.getElementById('calculate');

calculateButton.addEventListener('click', function () {
    // console.log('clicked');
    let employeesCount = parseInt(document.getElementById("employee-count").value);
    let emplyoeeMakesPerDay = parseInt(document.getElementById("loaves-per-employee").value);
    let dayReservations = parseInt(document.getElementById("order-count").value);

    let bakeryTotal = employeesCount * emplyoeeMakesPerDay;
    let isBakeryGonnaMakeIt = bakeryTotal >= dayReservations;

    // let logInfo = {
    //     bakeryTotal,
    //     isBakeryGonnaMakeIt
    // };

    // console.log(logInfo);

    let resultsDiv = document.getElementById('results');
    // console.log(resultsDiv);
    resultsDiv.innerHTML = `<p><strong>Kepykla per dieną spės pagaminti:</strong> ${bakeryTotal} kepalų.</p>`;
    resultsDiv.innerHTML += `<p><strong>Reikia spėti pagaminti:</strong> ${dayReservations} kepalų.</p>`;
    resultsDiv.innerHTML += `<p><strong>Ar spės pagaminti?</strong> ${isBakeryGonnaMakeIt ? 'Taip' : 'Ne'}</p>`;
});

document.getElementById("employee-count").addEventListener("keyup", function(event) {
    // console.log("Reikšmė pasikeitė");
    let inputValue = event.target.valueAsNumber;

    if (inputValue < 0) {
        // console.log(event.target);
        event.target.classList.add('error');
        event.target.nextElementSibling.classList.add('show');
    } else {
        event.target.classList.remove('error');
        event.target.nextElementSibling.classList.remove('show');
    }
});

document.getElementById("loaves-per-employee").addEventListener("keyup", function(event) {
    let inputValue = event.target.valueAsNumber;

    if (inputValue > 100) {
        event.target.classList.add('error');
        event.target.nextElementSibling.classList.add('show');
    } else {
        event.target.classList.remove('error');
        event.target.nextElementSibling.classList.remove('show');
    }
});


document.getElementById("order-count").addEventListener("keyup", function(event) {
    let inputValue = event.target.valueAsNumber;

    if (inputValue > 500) {
        event.target.classList.add('error');
        event.target.nextElementSibling.classList.add('show');
    } else {
        event.target.classList.remove('error');
        event.target.nextElementSibling.classList.remove('show');
    }
});


document.getElementById('reset').addEventListener('click', function(){
    // console.log('Clicked');
    document.getElementById("employee-count").value = 0;
    document.getElementById("loaves-per-employee").value = 0;
    document.getElementById("order-count").value = 0;
    document.getElementById("results").innerHTML = '<p>Kol kas nieko nėra.</p>';
});




