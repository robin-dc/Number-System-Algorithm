const prompt = require('prompt-sync')()

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
// convert letter to number
// ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉


console.log("")
console.log("--------------------------------- BINARY, OCTAL, HEXADECIMAL CALCULATOR ---------------------------------")
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

function exponent(exp, num){
    let newNum = 1;
    for(let i = 1; i <= exp; i++){
            newNum *= num
    }

    return newNum
}
function convertToNumbers(array){
    return array.map(number => {
        if(isNaN(number)) {
            return number = categories["C"][3][number.toUpperCase()]
        }
        return number
    })
}
function separatedDecimal(array){
    const indexOfDot = array.indexOf(".")
    if(indexOfDot === -1){
        return [convertToNumbers(array), []]
    }
    const right = convertToNumbers(array.slice(0, indexOfDot))
    const left = convertToNumbers(array.slice(indexOfDot + 1))

    return [right, left]
}
function checkSpaces(array){

    for(let i = 0; i < array.length; i++){
        const num = array[i]
        const individualArray = num.split("")

        if(individualArray.length > 1) return false
    }
    return true
}
// =============================================================================================================

// =========================================== NORMAL CONVERSION ===============================================
function somethingToDecimal(type, right, left){
    if(!left.length){
        const positivePolarity = positiveConversion(right, type)
        console.log("")

        console.log(`Conversion from ${categories[type][0]}: ${positivePolarity} ₁₀`)
        return
    }
    else{
        const positivePolarity = positiveConversion(right, type)
        const negativePolarity = fractionConversion(left, type)
        console.log("")

        console.log(`Conversion from ${categories[type][0]}: ${positivePolarity + negativePolarity} ₁₀`)
    }
}

function positiveConversion(array, category){
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
            return num *= categories[category][1]
        }
        return num = num * exponent(index, categories[category][1])
    })
    const answer = exponentForm.reduce((accum, initial) => accum + initial, 0)
    console.log(`Positive Polarity: ${answer} ₁₀`)
    return answer
}

function fractionConversion(array, category){
    const allNums = convertToNumbers(array)

    const exponentForm = allNums.map((num, index) => {
        if(num == 0){
            return num = 0
        }
        if(index === 0){
            return num = (1000000 / categories[category][1]) * num / 1000000
        }

        return num = (1000000 / exponent(index + 1, categories[category][1])) * num / 1000000
    })

    const answer = exponentForm.reduce((accum, initial) => accum + initial, 0)
    console.log(`Negative Polarity: ${answer} ₁₀`)
    return answer
}
// =============================================================================================================

// =========================================== VICE VERSA ======================================================
function decimalToSomething(type, right, left){
    if(!left.length){
        const positivePolarity = positiveConversion(right, type)
        console.log("")

        console.log(`Conversion from ${categories[type][0]}: ${positivePolarity} ₁₀`)
        return
    }
    else{
        const positivePolarity = positiveConversion(right, type)
        const negativePolarity = fractionConversion(left, type)
        console.log("")

        console.log(`Conversion from ${categories[type][0]}: ${positivePolarity + negativePolarity} ₁₀`)
    }
}
// ============================================================================================================

function getInputNumbers(category){
    console.log("")
    while(true){
        const numbers = prompt(`Enter ${categories[category][0].substring(0, categories[category][0].indexOf(" "))} Numbers separated by spaces: `)
        const array = numbers.split(" ")
        if(checkSpaces(array) === false){
            console.log("Check for digit spaces.")
        }
        else {
            console.log("")
            console.log(`${categories[category][0]}: ${isNaN(numbers) ? numbers.toUpperCase() : numbers} ${categories[category][2]}`)
            console.log("")
            return array
        }
    }
}

function getCategory(){
    for(let key in categories) {
        console.log(`${key} : ${categories[key][0]}`)
    }

    console.log("")
    console.log("")
    while(true){
        const category = prompt("Choose a Category: ").toUpperCase()
        if(!categories.hasOwnProperty(category)){
            console.log("Not in the choices.")
        }
        else return category
    }
}

function process(){
    const type = getCategory()
    const input = getInputNumbers(type)
    const [right, left] = separatedDecimal(input) // returns array that is all numbers

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

process()
