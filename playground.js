function separatedDecimal(array){
    let right;
    let left;

    const indexOfDot = array.indexOf(".")
    right = array.slice(0, indexOfDot)
    left = array.slice(indexOfDot + 1)
    console.log(right,"     ", left)
    return [right, left]
}
separatedDecimal([1,2,3,".",4,5])
