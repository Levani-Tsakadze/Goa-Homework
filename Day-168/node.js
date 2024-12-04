const os = require('os');
const process = require('process');

console.log(process.argv);

console.log(process.cwd());

console.log('OS type:', os.type());
console.log('Platform:', os.platform());

console.log('Memory usage:', process.memoryUsage());

console.log('Environment variables:', process.env);

console.log('Total system memory:', os.totalmem());
console.log('Free system memory:', os.freemem());

console.log('Node.js version:', process.version);

console.log('Script execution path:', process.argv[1]);

console.log('CPU architecture:', os.arch());

console.log('System uptime (seconds):', os.uptime());
console.log('Process uptime (seconds):', process.uptime());



//calculator, Command: node node.js <number1> <operator> <number2>
if (process.argv.length >= 5) {
    const num1 = parseFloat(process.argv[2]);
    const operator = process.argv[3];
    const num2 = parseFloat(process.argv[4]);

    if (isNaN(num1) || isNaN(num2)) {
        console.log('Use Numbers');
    } else {
        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '%':
                result = num1 % num2;
                break;
            default:
                console.log('Invalid operator. Use +, -, *, /, or %.');
                return;
        }
        console.log(`Result: ${num1} ${operator} ${num2} = ${result}`);
    }
} else {
    console.log('error');
}