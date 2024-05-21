const axios = require('axios');

const API_KEY = 'YOUR_OPEN_EXCHANGE_RATES_API_KEY';
const API_BASE_URL = 'https://open.er-api.com/v6/latest';

async function getExchangeRates(){
    try{
        const response = await axios.get(`${API_BASE_URL}?apikey=${API_KEY}`);
        return response.data.rates;
    }catch(error){
        console.error('Error fetching exchange rates', error.message);
        throw error;
    }
}

async function convertCurrency(amount, fromCurrency, toCurrency){
    try{
        const rates = await getExchangeRates();

        if(!rates[fromCurrency] || !rates[toCurrency]){
            throw new Error('Invalid currency code');
        }
        const convertedAmount = (amount/rates[fromCurrency]) * rates[toCurrency];
        return convertedAmount.toFixed(2);
    } catch(error){
        throw error;
    }
}

//Example usage
const amountToConvert = 3600;
const fromCurrencyCode = 'CAD';
const toCurrencyCode = 'BDT';

convertCurrency(amountToConvert, fromCurrencyCode, toCurrencyCode)
    .then(result => console.log(`${amountToConvert} ${fromCurrencyCode} is ${result} ${toCurrencyCode}`))
    .catch(error => console.error('Conversion error: ', error.message));