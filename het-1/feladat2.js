async function add(numA, numB) {
    return numA + numB;
}

function sub(numA, numB) {
    return new Promise(resolve => resolve(numA - numB));
}

function mul(numA, numB) {
    return numA * numB;
}

//átláthatóbb
async function calculate1() {
    const
        first = await add(5, 4),
        second = mul(3, await add(2, 1)),
        fAndS = await sub(first, second);
    console.log(await sub(fAndS, 6))
}

//egysoros
async function calculate2() {
    console.log(await sub(await sub(await add(5, 4), mul(3, await add(2, 1))), 6))
}


calculate1()
    .catch(err => {
        console.log(err);
    });
calculate2()
    .catch(err => {
        console.log(err);
    });
