let api = `https://v6.exchangerate-api.com/v6/bd9145337d266cbcaef2029a/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

//create dropdown from the currencies array
currencies.forEach((currency) =>{
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
});

//repeat same thing for the to other dropdown
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
});

//setting default value
fromDropDown.value ="USD";
toDropDown.value = "HNL";

let convertCurrency = () => {
    //create references
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    //if cantidad input field is not empty
    if (amount.length != 0) {
        fetch(api)
        .then((resp) => resp.json())
        .then((data) => {
            let fromExchangeRate = data.conversion_rates
            [fromCurrency];
            let toExchangeRate = data.conversion_rates
            [toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`; 
        }); 
    } else {
        alert("Por favor llenar la cantidad");
    }
};

document.querySelector("#convertir-boton")
.addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
