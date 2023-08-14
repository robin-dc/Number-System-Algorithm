const prompt = require('prompt-sync')()
const colors = require('colors');

// ============================================ THOUGHT PROCESS =================================================

// STEPS
// 1. Check type of category
//    - If category is Hexa, then convert letters to numbers
// 3. Separate right and left
// 4. Proceed to conversion
//    - Conversion for positive
//    - Conversion for fractions
// 5. Join together

// HELPER FUNCTIONS
// convert letter to number etc.
// ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉


console.log("")
console.log("--------------------------------- BINARY, OCTAL, HEXADECIMAL CALCULATOR ---------------------------------".green)
console.log("")
console.log("")

const dictionary = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
}

const categories = {
    A : ["Binary to Decimal", 2, "₂"],
    B : ["Octal to Decimal", 8, "₈"],
    C : ["HexaDecimal to Decimal", 16, "₁₆", dictionary],
    D : ["Decimal to Binary", 2, "₂"],
    E : ["Decimal to Octal", 8, "₈"],
    F : ["Decimal to HexaDecimal", 16, "₁₆", dictionary],
}

// =========================================== HELPER FUNCTIONS =================================================

function transformExponent(exp, num){ // Transform exponents | e.g. 2₄ --> 32
    let newNum = 1;
    for(let i = 1; i <= exp; i++){
            newNum *= num
    }

    return newNum
}
function convertToNumbers(array){ // Transform letters to numbers if any | e.g. A --> 10
    return array.map(number => {
        if(isNaN(number)) {
            return number = categories["C"][3][number.toUpperCase()]
        }
        return number
    })
}
function separatedDecimal(array){ // Separate numbers if theres a decimal | e.g. 10101.101 --> [ [1,0,1,0,1], [1,0,1] ]
    const indexOfDot = array.indexOf(".")
    if(indexOfDot === -1){
        return [convertToNumbers(array), []]
    }
    const right = convertToNumbers(array.slice(0, indexOfDot))
    const left = convertToNumbers(array.slice(indexOfDot + 1))

    return [right, left]
}
function checkSpaces(array){ // Input validation
    // Returns true only if there's no spaces between digits | e.g. 101.0 01 --> false

    for(let i = 0; i < array.length; i++){
        const num = array[i]

        if(num === " ") return false
    }
    return true
}
function findValue(value) { // Finds the number large number counterpart in the dictionary | e.g. 13 --> D
    for (const key in dictionary) {
      if (dictionary[key] === value) {
        return key;
      }
    }
  }

// =============================================================================================================


// =========================================== NORMAL CONVERSION ===============================================
function somethingToDecimal(type, right, left){
    const typeOfCategory = categories[type][0]

    if(!left.length){
        const positivePolarity = positiveConversion(right, type)
        console.log("")

        console.log(`Conversion from ${typeOfCategory}: `.cyan, `${positivePolarity} ₁₀`.green)
        return
    }
    else{
        const positivePolarity = positiveConversion(right, type)
        const negativePolarity = negativeConversion(left, type)
        console.log("")

        console.log(`Conversion from ${typeOfCategory}: `.cyan, `${positivePolarity + negativePolarity} ₁₀`.green)
    }
}

function positiveConversion(array, category){
    const radix = categories[category][1]

    const reversedArray = array.reverse()
    const allNums = convertToNumbers(reversedArray)

    const exponentForm = allNums.map((num, index) => {
        if(num == 0){
            return num = 0
        }
        if(index === 0){
            return num *= 1
        }
        if(index === 1){
            return num *= radix
        }
        return num = num * transformExponent(index, radix)
    })
    const answer = exponentForm.reduce((accum, initial) => accum + initial, 0)
    console.log("Positive Polarity: ".magenta, `${answer} ₁₀`.grey)
    return answer
}

function negativeConversion(array, category){
    const radix = categories[category][1]
    const allNums = convertToNumbers(array)

    const exponentForm = allNums.map((num, index) => {
        if(num == 0){
            return num = 0
        }
        if(index === 0){
            return num = (1000000 / radix) * num / 1000000
        }

        return num = (1000000 / transformExponent(index + 1, radix)) * num / 1000000
    })

    const answer = exponentForm.reduce((accum, initial) => accum + initial, 0)
    console.log("Negative Polarity: ".magenta, `${answer} ₁₀`.grey)

    return answer
}
// =============================================================================================================


// ======================================== VICE VERSA CONVERSION ==============================================
function decimalToSomething(type, right, left){
    const typeOfCategory = categories[type][0]
    const radixSymbol = categories[type][2]

    if(!left.length){
        const positivePolarity = positiveDecimalConversion(right, type)
        console.log("")

        console.log(`Conversion from ${typeOfCategory}: `.cyan, `${positivePolarity} ${radixSymbol}`.green)
        return
    }
    else{
        const positivePolarity = positiveDecimalConversion(right, type)
        const negativePolarity = negativeDecimalConversion(left, type)
        console.log("")

        console.log(`Conversion from ${typeOfCategory}: `.cyan, `${positivePolarity + negativePolarity} ${radixSymbol}`.green)
    }
}

function positiveDecimalConversion(array, category){
    const radix = categories[category][1]
    const radixSymbol = categories[category][2]

    const allNums = convertToNumbers(array)
    const number = allNums.join("")

    const answerAsArray = []
    function conversion(num){

        const remainder = num % radix

        if(remainder > 9){
            answerAsArray.push(findValue(remainder))
        }
        else{
            answerAsArray.push(remainder)
        }

        if(num < radix){
            return
        }
        conversion(Math.floor(num / radix))
    }
    conversion(number)

    const answer = answerAsArray.reverse().join("")
    console.log("Positive Polarity: ".magenta, `${answer} ${radixSymbol}`.grey)

    return answer
}

function negativeDecimalConversion(array, category){
    const radix = categories[category][1]
    const radixSymbol = categories[category][2]

    const allNums = convertToNumbers(array)
    const number = allNums.join("")

    const answerAsArray = []
    let recursion = 0;

    function conversion(num){
        recursion++

        const carry = Math.floor(num * radix)

        if(carry > 9){
            answerAsArray.push(findValue(carry))
        }
        else{
            answerAsArray.push(carry)
        }

        if(recursion === 6){
            return
        }
        const multipliedByRadix = num * radix
        conversion(multipliedByRadix - Math.floor(multipliedByRadix))
    }
    const numDigits = number.toString().length;
    const decimalValue = number / Math.pow(10, numDigits);
    conversion(decimalValue)

    const answer = "." + answerAsArray.join("")

    console.log("Negative Polarity: ".magenta, `0${answer} ${radixSymbol}`.grey)

    return answer
}
// ============================================================================================================


function getInputNumbers(category){
    const typeOfCategory = categories[category][0]
    const radixSymbol = categories[category][2]

    console.log("")
    while(true){
        const numbers = prompt(`Enter ${typeOfCategory.substring(0, typeOfCategory.indexOf(" "))} Numbers: `.cyan)
        const array = numbers.split("")
        if(checkSpaces(array) === false){
            console.log("Check for digit spaces.".red)
        }
        else {
            console.log("")
            console.log(`${typeOfCategory.substring(0, typeOfCategory.indexOf(" ")).magenta}: ${isNaN(numbers) ?
                numbers.toUpperCase().grey :
                numbers.grey} ${typeOfCategory.substring(0, typeOfCategory.indexOf(" ")) == "Decimal" ? "₁₀".grey : radixSymbol.grey}`)
            console.log("")
            return array
        }
    }
}

function getCategory(){
    for(let key in categories) {
        console.log(`${colors.yellow(key)} : ${colors.blue(categories[key][0])}`)
    }

    console.log("")
    console.log("")
    while(true){
        const category = prompt("Choose a Category: ".cyan).toUpperCase()
        if(!categories.hasOwnProperty(category)){
            console.log("Not in the choices.".red)
        }
        else return category
    }
}





// ======================================== ORGANIZED PROCESS ==============================================
function startProcess(){
    const type = getCategory()
    const input = getInputNumbers(type)
    const [right, left] = separatedDecimal(input)

    if(type == "A" || type == "B" || type == "C"){
        somethingToDecimal(type, right, left)
    }
    else{
        decimalToSomething(type, right, left)
    }

    console.log("")
    console.log("----------------------------------------------------------------------------------------------------")
    console.log("")
}

startProcess()
