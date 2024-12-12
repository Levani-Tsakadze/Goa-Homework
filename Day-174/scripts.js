const EventEmitter = require('events');
const readline = require('readline');
const eventEmitter = new EventEmitter();

// 1
eventEmitter.on('start', () => {
    console.log('The start event has occurred!');
});
eventEmitter.emit('start');

// 2
eventEmitter.on('userJoined', (name) => {
    console.log(`Welcome, ${name}!`);
});
eventEmitter.emit('userJoined', 'Levan');

// 3
eventEmitter.on('newOrder', (order) => console.log(`Order received: ${order}`));
eventEmitter.on('newOrder', (order) => console.log(`Email sent for order: ${order}`));
eventEmitter.on('newOrder', (order) => console.log(`Inventory updated for order: ${order}`));
eventEmitter.emit('newOrder', 'Order #1234');

// 4
eventEmitter.once('shutdown', () => console.log('System is shutting down...'));
eventEmitter.emit('shutdown');
eventEmitter.emit('shutdown');

// 5
eventEmitter.on('fileRead', (error) => {
    if (error) {
        console.error(`Error occurred: ${error.message}`);
    } else {
        console.log('File read successfully!');
    }
});
eventEmitter.emit('fileRead', new Error('File not found'));

// input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 2-1
rl.question('What is your name? ', (name) => {
    console.log(`Hello, ${name}!`);

    // 2-1
    console.log('Type something (type "exit" to quit):');
    const echoProgram = () => {
        rl.question('', (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log('Goodbye!');
                rl.close();
            } else {
                console.log(`You said: ${input}`);
                echoProgram();
            }
        });
    };
    echoProgram();

    // 2-3
    rl.question('How old are you? ', (age) => {
        console.log(`You are ${age} years old.`);

        // 2-4
        const askForNumber = () => {
            rl.question('Please enter a number: ', (num) => {
                if (isNaN(num)) {
                    console.log('That is not a valid number. Try again.');
                    askForNumber();
                } else {
                    console.log(`You entered a valid number: ${num}`);
                }
            });
        };
        askForNumber();

        // 2-5
        rl.question('Enter a starting number for the countdown: ', (num) => {
            if (isNaN(num)) {
                console.log('Please enter a valid number!');
                rl.close();
            } else {
                let countdown = parseInt(num);
                const interval = setInterval(() => {
                    console.log(countdown);
                    countdown -= 1;
                    if (countdown < 0) {
                        clearInterval(interval);
                        console.log('Countdown complete!');
                        rl.close();
                    }
                }, 1000);
            }
        });
    });
});

// 3-1
const divideNumbers = (a, b) => {
    try {
        if (b === 0) throw new Error('Division by zero is not allowed.');
        console.log(`Result: ${a / b}`);
    } catch (error) {
        console.error(error.message);
    }
};
divideNumbers(10, 0);

// 3-2
const checkPositive = (num) => {
    try {
        if (num < 0) throw new Error('Negative number is not allowed.');
        console.log(`The number ${num} is positive.`);
    } catch (error) {
        console.error(error.message);
    }
};
checkPositive(-5);

// 3-3
const throwError = () => {
    throw new Error('Something went wrong!');
};
try {
    throwError();
} catch (error) {
    console.error(error.stack);
}

// 3-4
try {
    throw new Error('An unknown error occurred.');
} catch (error) {
    console.log(`Error Name: ${error.name}`);
    console.log(`Error Message: ${error.message}`);
    console.log(`Error Stack: ${error.stack}`);
}
