// Retrieve System Information

const os = require('os');

console.log(os.type());
console.log(os.release());
console.log((os.totalmem() / (1024 * 1024)).toFixed(2));
console.log((os.freemem() / (1024 * 1024)).toFixed(2));


// Monitor System Uptime

const uptime = os.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = uptime % 60;

console.log(`${hours} hours, ${minutes} minutes, ${seconds} seconds`);

// Inspect Process Environment Variables

console.log(process.env);
console.log(process.env.PATH);

// Track Process Resource Usage

const usage = process.resourceUsage();

console.log((usage.maxRSS / 1024).toFixed(2));
console.log((usage.userCPUTime / 1e6).toFixed(2));
console.log((usage.systemCPUTime / 1e6).toFixed(2));

// Create and Trigger an Event

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', () => {
    console.log("Hello, This is system");
});

emitter.emit('greet');


// Pass Data with an Event

emitter.on('dataEvent', (data) => {
    console.log("Received Data:", data);
});

emitter.emit('dataEvent', { message: "Satelofono studia, zangi zangi gisment" });

// Listen for Multiple Events

emitter.on('start', () => console.log("Start event triggered."));
emitter.on('stop', () => console.log("Stop event triggered."));

emitter.emit('start');
emitter.emit('stop');

// Count Event Listeners

console.log("Listeners for 'start':", emitter.listenerCount('start'));
console.log("Listeners for 'stop':", emitter.listenerCount('stop'));

// Remove a Specific Listener

const listener1 = () => console.log("Listener 1 triggered.");
const listener2 = () => console.log("Listener 2 triggered.");

emitter.on('exampleEvent', listener1);
emitter.on('exampleEvent', listener2);

console.log("Before Removal:", emitter.listenerCount('exampleEvent'));
emitter.removeListener('exampleEvent', listener1);
console.log("After Removal:", emitter.listenerCount('exampleEvent'));

emitter.emit('exampleEvent');
