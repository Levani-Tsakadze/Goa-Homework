const EventEmitter = require('events');
const readline = require('readline');
const eventEmitter = new EventEmitter();

// 1
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});
eventEmitter.emit('greet', 'Levani');

// 2
eventEmitter.on('sum', (a, b) => {
    console.log(`The sum is: ${a + b}`);
});
eventEmitter.emit('sum', 5, 10);

// 3
eventEmitter.on('multiEvent', (message) => console.log(`Listener 1: ${message}`));
eventEmitter.on('multiEvent', (message) => console.log(`Listener 2: ${message}`));
eventEmitter.emit('multiEvent', 'This is a multi-listener event.');

// 4
const listenerToRemove = (message) => console.log(`This will be removed: ${message}`);
eventEmitter.on('removableEvent', listenerToRemove);
eventEmitter.emit('removableEvent', 'Hello before removal!');
eventEmitter.removeListener('removableEvent', listenerToRemove);
eventEmitter.emit('removableEvent', 'Hello after removal!');

// 5
eventEmitter.once('oneTimeEvent', () => console.log('This event will fire only once.'));
eventEmitter.emit('oneTimeEvent');
eventEmitter.emit('oneTimeEvent');

// input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 6
// rl.question('Enter something (Task 6): ', (input) => {
//     console.log(`Prefix: ${input}`);

//     // 7
//     console.log('Enter inputs continuously (type "exit" to quit):');
//     const readUntilExit = () => {
//         rl.question('Input: ', (answer) => {
//             if (answer.toLowerCase() === 'exit') {
//                 console.log('Goodbye!');
//                 rl.close();
//             } else {
//                 console.log(`You entered: ${answer}`);
//                 readUntilExit();
//             }
//         });
//     };
//     readUntilExit();
// });

// 8
rl.question('Enter first number (Task 8): ', (num1) => {
    rl.question('Enter operator (+, -, *, /): ', (operator) => {
        rl.question('Enter second number: ', (num2) => {
            const a = parseFloat(num1);
            const b = parseFloat(num2);
            let result;

            switch (operator) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = b !== 0 ? a / b : 'Error (division by zero)';
                    break;
                default:
                    result = 'Invalid operator';
            }
            console.log(`Result: ${result}`);

            // 9
            rl.question('Enter text to transform to uppercase (Task 9): ', (text) => {
                console.log(`Uppercase: ${text.toUpperCase()}`);

                // 10
                const progressBar = (total) => {
                    let progress = 0;
                    const interval = setInterval(() => {
                        process.stdout.clearLine(0);
                        process.stdout.cursorTo(0);
                        progress += 1;
                        process.stdout.write(`Progress: [${'='.repeat(progress)}${' '.repeat(total - progress)}] ${progress * 10}%`);
                        if (progress === total) {
                            clearInterval(interval);
                            console.log('\nComplete!');
                            rl.close();
                        }
                    }, 200);
                };
                progressBar(10);
            });
        });
    });
});