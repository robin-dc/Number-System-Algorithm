const prompt = require('prompt-sync')()

console.log("")
console.log("--------------------------------- BINARY, OCTAL, HEXADECIMAL CALCULATOR ---------------------------------")
console.log("")
console.log("")

const categories = {
    A : ["Binary", 2, "₂"],
    B : ["Octal", 8, "₈"],
    C : ["HexaDecimal", 16, "₁₆", {
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
    }],
}

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
            return number = categories["C"][3][number]
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

function getInputNumbers(category){
    console.log("")
    const numbers = prompt(`Enter ${categories[category][0]} Numbers separated by spaces: `)
    console.log("")
    console.log(`${categories[category][0]}: ${numbers} ${categories[category][2]}`)
    console.log("")
    const array = numbers.split(" ")
    return array
}

function getCategory(){
    console.log("A : Binary to Decimal")
    console.log("B : Octal to Decimal")
    console.log("C : Hexadecimal to Decimal")
    console.log("")
    console.log("")

    const category = prompt("Choose a Category: ")
    return category.toUpperCase()
}

// ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉

function process(){
    const type = getCategory()
    const input = getInputNumbers(type)
    const [right, left] = separatedDecimal(input) // returns array that is all numbers


    if(!left.length){
        const positivePolarity = positiveConversion(right, type)
        console.log("")

        console.log(`Conversion from ${categories[type][0]} to Decimal: ${positivePolarity} ₁₀`)
        return
    }
    else{
        const positivePolarity = positiveConversion(right, type)
        const negativePolarity = fractionConversion(left, type)
        console.log("")

        console.log(`Conversion from ${categories[type][0]} to Decimal: ${positivePolarity + negativePolarity} ₁₀`)
    }

    console.log("")
    console.log("----------------------------------------------------------------------------------------------------")
    console.log("")
}

process()
