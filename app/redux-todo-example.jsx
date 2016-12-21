var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
	showCompleted: false,
	searchText: '',
	todos: []
};
var reducer = (state = stateDefault, action) => {
	
	return state;	
};

var store = redux.createStore(reducer);

console.log('currentState', store.getState());