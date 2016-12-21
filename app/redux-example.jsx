var redux = require('redux');

console.log('Starting redux example');

// Pure function
// Always returns same result given same input
// No side effects (doesn't require any variables from outside or update anything from outside)
function add (a, b) {
	return a + b;
}
