const
    { ops } = require('./ops'),
    colors = require('colors'),
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    questions = {
        operations: `${colors.bgWhite.black('\n  Which arithmetic operation would you like to use?  \n')}  ${ops.add.text} | ${ops.substract.text} | ${ops.multiply.text} | ${ops.divide.text}  \n`,
        opErr: colors.bgBrightRed.white('\n  Please choose a valid operation!  \n'),
        left: colors.bgWhite.black('\n  Please type the left side number of the operation!  \n'),
        right: colors.bgWhite.black('\n  Please type the right side number of the operation!  \n'),
        notNum: colors.bgBrightRed.white('\n  Only numbers accepted, please try again!  \n'),
        end: colors.bgWhite.black(`\n  To calculate more, type ${colors.green('yes')}, to exit type ${colors.red('no')}! \n`),
        endErr: colors.bgBrightRed.white(`\n  Please answer ${colors.green('yes')} or ${colors.yellow('no')}!  \n`),
    };


/**
 * 
 * @returns 
 */
function notNum () {

    return new Promise((resolve, reject) => {
        rl.question(questions.notNum, answer => {
            if (isNaN(answer)) {
                resolve(notNum())
            } else {
                resolve(answer);
            }
        })
    })

};


/**
 * 
 * @param {*} side 
 * @returns 
 */
function selectNum (side) {

    return new Promise((resolve, reject) => {
        rl.question(questions[side], answer => {
            if (isNaN(answer)) {
                resolve(notNum())
            } else {
                resolve(answer);
            }
        })
    })

}

const selectOp = inputErr => {

        return new Promise((resolve, reject) => {

            const text = !inputErr ? questions.operations : questions.opErr;

            rl.question(text, answer => {
                if (answer === 'add' || answer === 'substract' || answer === 'multiply' || answer === 'divide') {
                    resolve(answer);
                } else {
                    resolve(selectOp(true));
                }
            });

        });
    },

    end = (inputErr) => {

        const text = !inputErr ? questions.end : questions.endErr;

        rl.question(text, answer => {
            if (answer === 'yes') {
                calc();
            } else if (answer === 'no') {
                console.log('Goodbye!')
                rl.close();
            } else {
                end(true);
            }
        })
    },

    calc = async () => {
        const
            op = await selectOp(false),
            left = await selectNum('left'),
            right = await selectNum('right'),
            result = ops[op].func((parseFloat(left)), (parseFloat(right))),
            symbol = ops[op].sym;

        console.log(`\n  ${left.toString()} ${symbol} ${right.toString()} = ${colors.magenta.bold(result)}  \n`);

        end(false);
    }

console.log(colors.bgGreen.black('\n  Welcome to CLI-calculator!  \n'));
console.log(`You can exit anytime by pressing ${colors.yellow('ctrl + c')}.\n`)
calc()
    .catch(err => {
        console.log(err);
    });