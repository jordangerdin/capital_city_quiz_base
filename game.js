let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#playagain-button')

var randCountry

function getRandomInteger(max) {
    max = Math.floor(max)
    return Math.floor(Math.random() * (max))
}

function getRandomCountry() {
    randomCountryIndex = getRandomInteger(countriesAndCodes.length)
    randCountry = countriesAndCodes[randomCountryIndex]
    randomCountryElement.innerHTML=randCountry['name']
}

submitButton.addEventListener('click', function() {
    // Check answer using World Bank API, send countrycode get capital, compare and let user know if they're correct or not
    url=`https://api.worldbank.org/v2/country/${randCountry['alpha-2']}?format=json`
    var capcity

    fetch(url)
    .then( res => res.json() )
    .then( countryData => {
        capcity = countryData[1][0]['capitalCity']
        console.log(capcity)

        if (userAnswerElement.value.toUpperCase() === capcity.toUpperCase()){
            resultTextElement.innerHTML = `Correct! The capital city of ${randCountry['name']} is ${capcity}`
        }
        else {
            resultTextElement.innerHTML = `Wrong - the capital of ${randCountry['name']} is not ${userAnswerElement.value}, it is ${capcity}`
        }
    })
    .catch( err => {
        console.log(err)
        alert('An error occured, could not verify answer.')
    })
})
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.

playAgainButton.addEventListener('click', function() {
    // Reset the form with a new country and allow the user to play again.
    getRandomCountry()
    userAnswerElement.innerHTML=''
    resultTextElement.innerHTML=''
})

getRandomCountry()
resultTextElement.innerHTML=''