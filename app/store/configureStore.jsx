var redux = require('redux');

// Redux middleware to have action generators that return functions.
// Useful if your action generator is doing something async, and needs to dispatch actions inside of it.
// i.e. fetch location
var thunk = require('redux-thunk').default;

var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require('./../reducers/index');

export var configure = () => {

	var reducer = redux.combineReducers({
		name: nameReducer, //name state is going to be managed by the nameReducer
		hobbies: hobbiesReducer,
		movies: moviesReducer,
		map: mapReducer
	});

	var store = redux.createStore(reducer, redux.compose(
		
		redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
		//shorthand for (f) => return f; 
	));
	
	return store;
}
