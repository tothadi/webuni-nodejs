const readline = require('readline');
const colors = require('colors');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * OP type asdfhjjghas
 */
const OP_TYPE = {
    SUBSTRACT: 'substract',
    ADD: 'add',
};

const OP_SIGN = {
    '-': OP_TYPE.SUBSTRACT,
    'a': OP_TYPE.ADD,
    '+': OP_TYPE.ADD
}

/**
 * Color for operands
 */
const OPS_COLOR = {
    [OP_TYPE.SUBSTRACT]: colors.green.red('-'),
    [OP_TYPE.ADD]: colors.green.bold('+'),
};

/**
 *
 */
const OPS_FUNCTIONS = {
    [OP_TYPE.ADD]: (n1, n2) => n1 + n2,
    [OP_TYPE.SUBSTRACT]: (n1, n2) => n1 - n2
};

function question(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, answer => {
            resolve(answer);
        });
    })
}

async function getNumber(question2){
    const num =  parseInt(await question(question2), 10);
    //....
    return num;
}

async function round(alma) {
    const a = getNumber('First number ');
    const b = getNumber('First number ');
    const op = await question('Operator ');

    if (typeof OP_SIGN[op] === 'undefined') {
        console.log("no such op");
        return;
    }
    const opName = OP_SIGN[op];
    const opFv = OPS_FUNCTIONS[opName];
    const opColor = OPS_COLOR[opName];
    console.log(`${a}${opColor}${b}=${opFv(a, b)}`);
}

round().then(() => console.log("vege")).catch(err => console.error(err))

