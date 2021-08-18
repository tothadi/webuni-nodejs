function power(x, n) {
    const subResults = [];
    for (let i = 0; i < n + 1; i++) {
        subResults.push(Math.pow(x, i))
    }
    return {
        result: subResults.pop(),
        subResults
    }
}
console.log(power(2,3))
