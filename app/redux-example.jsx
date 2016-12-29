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

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
	type: 'CHANGE_NAME',
	name: 'Coy'	
});

console.log('currentState', store.getState());