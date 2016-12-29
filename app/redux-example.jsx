var redux = require('redux');

console.log('Starting redux example');

// Pure function in redux: reducer
// Takes existing state and returns a new one based on performing the action.
var reducer = (state = {name: 'Anonymous'}, action) => {

	switch(action.type) {
		case 'CHANGE_NAME':
			return {
				...state,
				name: action.name
			};
		default:
			return state;
	}	
};

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
	//shorthand for (f) => return f; 
));

// Subscribe to changes
// called each time store state changes. 
// returns a function you can unsubscribe to.
var unsubscribe = store.subscribe(() => {
	var state = store.getState();	
	console.log('Name is', state.name);	
	document.getElementById('app').innerHTML = state.name;
});

var currentState = store.getState();

store.dispatch({
	type: 'CHANGE_NAME',
	name: 'Coy'	
});

//unsubscribe();

// subscribe callback won't run if unsubscribe is uncommented
store.dispatch({
	type: 'CHANGE_NAME',
	name: 'Miranda'
});