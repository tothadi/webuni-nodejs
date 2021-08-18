const colors = require('colors');
module.exports.ops = {
    add: {
        text: colors.green('add'),
        sym: colors.green.bold('+'),
        func: (n1, n2) => {
            return n1 + n2;
        }
    },
    substract: {
        text: colors.red('substract'),
        sym: colors.red.bold('-'),
        func: (n1, n2) => {
            return n1 - n2;
        }
    },
    multiply: {
        text: colors.blue('multiply'),
        sym: colors.blue.bold('x'),
        func: (n1, n2) => {
            return n1 * n2;
        }
    },
    divide: {
        text: colors.yellow('divide'),
        sym: colors.yellow.bold('/'),
        func: (n1, n2) => {
            return n1 / n2;
        }
    }
}
